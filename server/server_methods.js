import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http'
import moment from 'moment';

import * as gplay from "google-play-scraper";

import '../imports/api/items.js';
import { Items } from '../imports/api/items.js';
import { Categories } from '../imports/api/categories.js';

function isSuperAdmin(userId) {
  check(userId, String);
  return Roles.userIsInRole(userId, 'superAdmin', Roles.GLOBAL_GROUP);
}

Meteor.methods({

  'items.search'(query) {
    check(query, String);
    return Items.find(
      { 
        $and: [
          {
            $text: {
              $search: query
            },
          },

          {
            hidden: false
          }
        ]
      },
      {
        fields: {
          searchScore: {
            $meta: 'textScore'
          }
        },
        sort: {
          searchScore: {
            $meta: 'textScore'
          }
        }
      }
    ).fetch();
  },

  'items.insertInServerFromGooglePlay'(appId, category, lang, country) {
    check(appId, String);
    check(category, String);
    check(lang, String);
    check(country, String);

    if (!isSuperAdmin(this.userId)) {
      throw new Meteor.Error('400 - Not authorized!');
    }

    let exists = Items.findOne({appId: appId});

    if (exists) {
      throw new Meteor.Error('App already exists!');
    } else {
      
      return Promise.await(
       gplay
        .app({appId: appId, lang: lang, country: country})
        .then(function(app){

          let categoryName = Categories.findOne({categorySlug: category}).categoryName;
          app.categoryName = categoryName;
          
          app.customApp = false;
          app.category = category;
          app.lang = lang;
          app.country = country;
          app.featured = false;
          app.hidden = false;
          app.validated = true;
          app.zDownloadsCount = 0;
          app.lastUpdateCheck = moment().valueOf();
          app.createdAt = moment().valueOf();
          app.downloadUrl = Meteor.settings.public.CDN + 'googleplay/'  + appId + '.apk';

          let resp = HTTP.call('GET', 
            Meteor.settings.ZAPPMAN.URL +
            '?token=' + 
            Meteor.settings.ZAPPMAN.TOKEN + 
            '&appId=' + appId + '&action=download');

          Items.insert(app);
          //update category count
          Categories.update({categorySlug: category}, {$inc: {count: 1}});
          return 'Inserted app: ' + appId + ' status code ' +  resp.statusCode +
          ' content: ' + resp.content;
        })
        .catch(function(e){
          throw new Meteor.Error('App scraping error!' + e);
        })

      );
    }
  },

  'items.updateInServerFromGooglePlay'(itemId, server_token="token") {
    check(itemId, String);

    if (server_token !== "SERVERTOKEN") {
      if (!isSuperAdmin(this.userId)) {
        throw new Meteor.Error('400 - Not authorized!');
      }
    }
    
    Items.update(itemId, { $set: { lastUpdateCheck: moment().valueOf() } });
    const oldApp = Items.findOne(itemId);

    //check for update from Google Update
    return Promise.await(
      
      gplay
        .app({appId: oldApp.appId, lang: oldApp.lang, country: oldApp.country})
        .then(function(app){
          // console.log(app);
            
          let resp = HTTP.call('GET', 
              Meteor.settings.ZAPPMAN.URL + 
              '?token=' + 
              Meteor.settings.ZAPPMAN.TOKEN + 
              '&appId=' + app.appId + '&action=update');

          Items.update(itemId, {$set: app});
          console.log(resp);
          return 'Update app app: ' + app.appId + ' status code ' +  resp.statusCode +
          ' content: ' + resp.content;
        })
        .catch(function(e){
          throw new Meteor.Error('App scraping error!' + e);
        })

    );
  },

  'startUpdater'(schedule, token) {
    //start cron
    SyncedCron.stop();

    //cron job
    SyncedCron.add({
      name: "App updater",
      schedule: function(parser) {
        return parser.text(schedule);
      },

      job: function() {
        //get oldest not custom item
        
        let item = Items.findOne({customApp: false}, {sort: {lastUpdateCheck: 1}});
        console.log("Updating app: " + item.appId + new Date());
        let result = Meteor.call('items.updateInServerFromGooglePlay', item._id, token);
        
        return "Updated app: " + item.appId + " " + result;
      }
    });

    SyncedCron.start();
  },

  'stopUpdater'() {
    if (!isSuperAdmin(this.userId)) {
      throw new Meteor.Error('400 - Not authorized!');
    }

    SyncedCron.stop();
  }
})