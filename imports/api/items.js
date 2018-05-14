import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import moment from 'moment';

import { Categories } from './categories.js';

export const Items = new Mongo.Collection('items');

function isSuperAdmin(userId) {
  check(userId, String);
  return Roles.userIsInRole(userId, 'superAdmin', Roles.GLOBAL_GROUP);
}

Meteor.methods({

  'items.toggleFeatured'(itemId, featured) {
    check(itemId, String);
    check(featured, Boolean);

    if (!isSuperAdmin(this.userId)) {
      throw new Meteor.Error('400 - Not authorized!');
    }

    Items.update(itemId, { $set: { featured: featured } });
  },

  'items.toggleHidden'(itemId, hidden) {
    check(itemId, String);
    check(hidden, Boolean);

    if (!isSuperAdmin(this.userId)) {
      throw new Meteor.Error('400 - Not authorized!');
    }

    Items.update(itemId, { $set: { hidden: hidden } });
  },

  'items.delete'(itemId) {
    check(itemId, String);

    if (!isSuperAdmin(this.userId)) {
      throw new Meteor.Error('400 - Not authorized!');
    }

    //get item category
    let item =  Items.findOne(itemId);
    let category = item.category;
    let appId = item.appId

    Items.remove(itemId);
    Categories.update({categorySlug: category}, {$inc: {count: -1}});

    // if (Meteor.isServer && !item.customApp) {
    //   let resp = HTTP.call('GET', 
    //       Meteor.settings.ZAPPMAN.URL + 
    //       '?token=' + 
    //       Meteor.settings.ZAPPMAN.TOKEN + 
    //       '&appId=' + appId + '&action=delete');
    //   console.log(resp);
    // }
  },

  /*
   For items not in google play
  */

  'customItems.insert'(customItem) {
    check(customItem, Object);

    if (!isSuperAdmin(this.userId)) {
      throw new Meteor.Error('400 - Not authorized!');
    }

    let exists = Items.findOne({appId: customItem.appId});

    if (exists) {
      throw new Meteor.Error('App already exists!');
    } else {
      let categoryName = Categories.findOne({categorySlug: customItem.category}).categoryName;

      customItem.customApp = true;
      customItem.minInstalls = '-';
      customItem.maxInstalls = '-';
      customItem.updated =  moment(moment().valueOf()).format('HH:mm:ss DD/MM/YY');
      customItem.lastUpdateCheck = moment().valueOf();
      customItem.createdAt = moment().valueOf();
      customItem.lang = 'tm';
      customItem.country = 'tm';
      customItem.hidden = false;
      customItem.featured = false;
      customItem.validated = true;
      customItem.zDownloadsCount = 0;
      customItem.score = parseFloat(customItem.score);
      customItem.downloadUrl = Meteor.settings.public.CDN + 'custom/' +
        customItem.appId + '/' + customItem.appId + '.apk'; 
      customItem.icon = Meteor.settings.public.CDN + 'custom/' + 
        customItem.appId + '/icon.png';
      customItem.screenshots = [
        Meteor.settings.public.CDN + 'custom/' + customItem.appId + '/screenshots/screenshot1.jpg',
        Meteor.settings.public.CDN + 'custom/' + customItem.appId + '/screenshots/screenshot2.jpg',
        Meteor.settings.public.CDN + 'custom/' + customItem.appId + '/screenshots/screenshot3.jpg',
        Meteor.settings.public.CDN + 'custom/' + customItem.appId + '/screenshots/screenshot4.jpg',
      ];
      customItem.categoryName = categoryName;

      let id = Items.insert(customItem);
      Categories.update({categorySlug: customItem.category}, {$inc: {count: 1}});

      return id;
    }
  },

  'customItems.update'(itemId) {
    check(itemId, String);

    if (!isSuperAdmin(this.userId)) {
      throw new Meteor.Error('400 - Not authorized!');
    }

    let res = Items.update(itemId, { $set: 
      { lastUpdateCheck: moment().valueOf() } });
    return res;
  },

  'items.incrementDownloads'(itemId) {
    check(itemId, String);
    Items.update(itemId, {$inc: {zDownloadsCount: 1}});
  }
})