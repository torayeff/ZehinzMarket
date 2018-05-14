import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import moment from 'moment';

export const Banners = new Mongo.Collection('banners');

function isSuperAdmin(userId) {
  check(userId, String);
  return Roles.userIsInRole(userId, 'superAdmin', Roles.GLOBAL_GROUP);
}

Meteor.methods({
  'banners.insert'(imgSrc, text1, text2, link) {

    check(imgSrc, String);
    check(text1, String);
    check(text2, String);
    check(link, String);

    if (!isSuperAdmin(this.userId)) {
      throw new Meteor.Error('400 - Not authorized!');
    }

    let banner = {
      imgSrc, 
      text1,
      text2,
      link,
      hidden: false,
      createdAt: moment().valueOf()
    }

    let bannerId = Banners.insert(banner);

    if (bannerId) {
      return 'Banner goşuldy!';
    } else {
      return 'Goşulmady: ' + JSON.parse(bannerId);
    }

  },

  'banners.update'(bannerId) {
    check(bannerId, String);

    if (!isSuperAdmin(this.userId)) {
      throw new Meteor.Error('400 - Not authorized!');
    }

    let res = Banners.update(bannerId, {$set: {createdAt: moment().valueOf()}});

    return res;
  },

  'banners.toggleHidden'(bannerId, hidden) {
    check(bannerId, String);
    check(hidden, Boolean);

    if (!isSuperAdmin(this.userId)) {
      throw new Meteor.Error('400 - Not authorized!');
    }

    let res = Banners.update(bannerId, {$set: {hidden: hidden}});

    return res;
  },

  'banners.delete'(bannerId) {
    check(bannerId, String);

    if (!isSuperAdmin(this.userId)) {
      throw new Meteor.Error('400 - Not authorized!');
    }

    let res = Banners.remove(bannerId);

    return res;
  },
})