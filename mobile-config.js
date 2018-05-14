App.accessRule("blob:*");
App.accessRule('*');
App.accessRule('http://market.zehinz.com/');
App.accessRule('http://*.zehinz.com/*');

App.info({
  id: 'com.zehinz.market',
  name: 'Zehinz Market',
  description: 'Android programmalar merkezi',
  author: 'zehinz',
  email: 'zehinz@gmail.com',
  website: 'http://market.zehinz.com'
});

// Set PhoneGap/Cordova preferences
// App.setPreference('BackgroundColor', '#01acc6');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

App.icons({
  'android_mdpi' : 'resources/android/res/drawable-mdpi/icon.png', //(48x48)
  'android_hdpi' : 'resources/android/res/drawable-hdpi/icon.png', //(72x72)
  'android_xhdpi' : 'resources/android/res/drawable-xhdpi/icon.png', //(96x96)
  'android_xxhdpi' : 'resources/android/res/drawable-xxhdpi/icon.png', //(144x144)
  'android_xxxhdpi' : 'resources/android/res/drawable-xxxhdpi/icon.png', //(192x192)
});

App.launchScreens({
  'android_mdpi_portrait' : 'resources/android/res/drawable-mdpi/screen.png', //(320x470)
  'android_mdpi_landscape' : 'resources/android/res/drawable-land-mdpi/screen.png', //(470x320)
  'android_hdpi_portrait' : 'resources/android/res/drawable-hdpi/screen.png', //(480x640)
  'android_hdpi_landscape' : 'resources/android/res/drawable-land-hdpi/screen.png', //(640x480)
  'android_xhdpi_portrait' : 'resources/android/res/drawable-xhdpi/screen.png', //(720x960)
  'android_xhdpi_landscape' : 'resources/android/res/drawable-land-xhdpi/screen.png', //(960x720)
  'android_xxhdpi_portrait' : 'resources/android/res/drawable-xxhdpi/screen.png', //(1080x1440)
  'android_xxhdpi_landscape' : 'resources/android/res/drawable-land-xxhdpi/screen.png', //(1440x1080)
});
