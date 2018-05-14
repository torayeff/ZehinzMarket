import { Meteor } from 'meteor/meteor';
import { Items } from '../imports/api/items.js';
import { Categories } from '../imports/api/categories.js';
import { Banners } from '../imports/api/banners.js';

Meteor.startup(() => {

  Meteor.call("startUpdater", "every 5 minutes",
    "SERVERTOKEN");
  
  //Ensure Indexes
  Items._ensureIndex({appId: 1}, {unique: true});
  Items._ensureIndex({category: 1});
  Items._ensureIndex({hidden: 1});
  Items._ensureIndex({country: 1, lastUpdateCheck: -1});
  Items._ensureIndex({featured: 1});
  Items._ensureIndex({title: "text"}, {default_language: "none"});
  
  Categories._ensureIndex({categorySlug: 1});
  Categories._ensureIndex({count: 1});

  //create admin user
  let noOne = !Meteor.users.findOne();
  if (noOne) {
    //create admin user
    let adminId = Accounts.createUser({
      email: 'yourmail@gmail.com',
      password: "yourpassword",
    });
    Roles.addUsersToRoles(adminId, 'superAdmin', Roles.GLOBAL_GROUP);
  }

  //add categories
  let categories = [
    {
      categoryName: "Oýunlar",
      categorySlug: "oyunlar",
      count: 0
    },

    {
      categoryName: "Sungat we dizaýn",
      categorySlug: "sungat-we-dizayn",
      count: 0
    },

    {
      categoryName: "Awto we ulaglar",
      categorySlug: "awto-we-ulaglar",
      count: 0
    },

    {
      categoryName: "Gözellik",
      categorySlug: "gozellik",
      count: 0
    },

    {
      categoryName: "Kitaplar we gollanmalar",
      categorySlug: "kitaplar-we-gollanmalar",
      count: 0
    },

    {
      categoryName: "Söwda we biznes",
      categorySlug: "sowda-we-biznes",
      count: 0
    },

    {
      categoryName: "Degişme",
      categorySlug: "degishme",
      count: 0
    },

    {
      categoryName: "Aragatnaşyk",
      categorySlug: "aragatnashyk",
      count: 0
    },

    {
      categoryName: "Bilim",
      categorySlug: "bilim",
      count: 0
    },

    {
      categoryName: "Güýmenje",
      categorySlug: "guymenje",
      count: 0
    },

    {
      categoryName: "Finans",
      categorySlug: "finans",
      count: 0
    },

    {
      categoryName: "Naharlanma",
      categorySlug: "naharlanma",
      count: 0
    },

    {
      categoryName: "Sport we saglyk",
      categorySlug: "sport-we-saglyk",
      count: 0
    },

    {
      categoryName: "Syýahat we kartalar",
      categorySlug: "syyahat-we-kartalar",
      count: 0
    },

    {
      categoryName: "Aýdym we saz",
      categorySlug: "aydym-we-saz",
      count: 0
    },

    {
      categoryName: "Surat we wideo",
      categorySlug: "surat-we-wideo",
      count: 0
    },

    {
      categoryName: "Umumy programmalar",
      categorySlug: "umumy-programmalar",
      count: 0
    },
    
    {
      categoryName: "Çagalar üçin",
      categorySlug: "chagalar-uchin",
      count: 0
    },

    {
      categoryName: "Erkekler üçin",
      categorySlug: "erkekler-uchin",
      count: 0
    },

    {
      categoryName: "Zenanlar üçin",
      categorySlug: "zenanlar-uchin",
      count: 0
    }
  ]

  categories.forEach(function(category){
    let exists = Categories.findOne({categorySlug: category.categorySlug});
    if (!exists) {
      Categories.insert(category);
    }
  });
})