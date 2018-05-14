import { check } from 'meteor/check';
import { Items } from '../imports/api/items.js';
import { Categories } from '../imports/api/categories.js'
import { Banners } from '../imports/api/banners.js'

Meteor.publish('banners', function() {
  return Banners.find({hidden: false});
});

Meteor.publish('categories', function() {
  return Categories.find({});
});

Meteor.publish('categoryInfo', function(categorySlug) {
  check(categorySlug, String);
  return Categories.find({categorySlug: categorySlug});
});

Meteor.publish('itemsByCategory', function(categorySlug, limit) {
  check(categorySlug, String);
  check(limit, Number);

  limit = limit || 20;
  return Items.find(
  {$and: [{category: categorySlug}, {hidden: false}]}, 
  {
    sort: {
      country: -1,
      lastUpdateCheck: -1
    },
    fields: {
      price: 0,
      free: 0,
      reviews: 0,
      developerEmail: 0,
      developerWebsite: 0,
      genre: 0,
      genreId: 0,
      familyGenre: 0,
      familyGenreId: 0,
      description: 0,
      descriptionHTML: 0,
      histogram: 0,
      offersIAP: 0,
      adSupported: 0,
      androidVersionText: 0,
      contentRating: 0,
      video: 0,
      comment: 0,
      recentChanges: 0,
    },
    limit: limit
  });
});

Meteor.publish('featuredItems', function() {
  return Items.find({$and: [{featured: true}, {hidden: false}]}, {
    fields: {
      price: 0,
      free: 0,
      reviews: 0,
      developerEmail: 0,
      developerWebsite: 0,
      genre: 0,
      genreId: 0,
      familyGenre: 0,
      familyGenreId: 0,
      description: 0,
      descriptionHTML: 0,
      histogram: 0,
      offersIAP: 0,
      adSupported: 0,
      androidVersionText: 0,
      contentRating: 0,
      video: 0,
      comment: 0,
      recentChanges: 0,
    }
  });
});

Meteor.publish('top10', function() {
  return Items.find({hidden: false}, {
    sort: {
      zDownloadsCount: -1
    },
    fields: {
      price: 0,
      free: 0,
      reviews: 0,
      developerEmail: 0,
      developerWebsite: 0,
      genre: 0,
      genreId: 0,
      familyGenre: 0,
      familyGenreId: 0,
      description: 0,
      descriptionHTML: 0,
      histogram: 0,
      offersIAP: 0,
      adSupported: 0,
      androidVersionText: 0,
      contentRating: 0,
      video: 0,
      comment: 0,
      recentChanges: 0,
    },
    limit: 10,
  });
});

Meteor.publish('topNew', function() {
  return Items.find({hidden: false}, {
    sort: {
      createdAt: -1
    },
    fields: {
      price: 0,
      free: 0,
      reviews: 0,
      developerEmail: 0,
      developerWebsite: 0,
      genre: 0,
      genreId: 0,
      familyGenre: 0,
      familyGenreId: 0,
      description: 0,
      descriptionHTML: 0,
      histogram: 0,
      offersIAP: 0,
      adSupported: 0,
      androidVersionText: 0,
      contentRating: 0,
      video: 0,
      comment: 0,
      recentChanges: 0,
    },
    limit: 10,
  });
});

Meteor.publish('itemInfo', function(appId) {
  // Meteor._sleepForMs(2000);
  check(appId, String);
  return Items.find({appId: appId}, {
    fields: {
      price: 0,
      free: 0,
      reviews: 0,
      developerEmail: 0,
      developerWebsite: 0,
      genre: 0,
      genreId: 0,
      familyGenre: 0,
      familyGenreId: 0,
      descriptionHTML: 0,
      histogram: 0,
      offersIAP: 0,
      adSupported: 0,
      androidVersionText: 0,
      contentRating: 0,
      video: 0,
      comment: 0,
      recentChanges: 0,
    }
  });
});

//Admin publications
Meteor.publish('bannersForAdmin', function() {
  let isSuperAdmin = Roles.userIsInRole(this.userId, 'superAdmin', Roles.GLOBAL_GROUP);

  if (isSuperAdmin) {
    return Banners.find();
  } else {
    return this.ready();
  }
});


Meteor.publish('itemsForAdmin', function(limit) {
  let isSuperAdmin = Roles.userIsInRole(this.userId, 'superAdmin', Roles.GLOBAL_GROUP);
  check(limit, Number);

  limit = limit || 20;
  
  if (isSuperAdmin) {
    return Items.find({}, {sort: {lastUpdateCheck: -1}, limit: limit});
  } else {
    return this.ready();
  }
})