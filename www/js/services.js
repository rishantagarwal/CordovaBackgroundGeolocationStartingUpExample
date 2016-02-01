angular.module('starter.services', [])
.factory('bgGeoService',function($rootScope){
  return {
  
  initialize : function(){

  var bgGeo = window.BackgroundGeolocation;

    /**
    * This callback will be executed every time a geolocation is recorded in the background.
    */
    var callbackFn = function(location, taskId) {
        var coords = location.coords;
        var lat    = coords.latitude;
        var lng    = coords.longitude;

        // Simulate doing some extra work with a bogus setTimeout.  This could perhaps be an Ajax request to your server.
        // The point here is that you must execute bgGeo.finish after all asynchronous operations within the callback are complete.
        setTimeout(function() {
          bgGeo.finish(taskId); // <-- execute #finish when your work in callbackFn is complete
        }, 1000);
    };

    var failureFn = function(error) {
        console.log('BackgroundGeoLocation error');
    }

    // BackgroundGeoLocation is highly configurable.
    bgGeo.configure(callbackFn, failureFn, {
        // Geolocation config
        desiredAccuracy: 0,
        stationaryRadius: 3,
        distanceFilter: 10,
        disableElasticity: true, // <-- [iOS] Default is 'false'.  Set true to disable speed-based distanceFilter elasticity
        locationUpdateInterval: 10,
        minimumActivityRecognitionConfidence: 10,   // 0-100%.  Minimum activity-confidence for a state-change 
        fastestLocationUpdateInterval: 5000,
        activityRecognitionInterval: 1,
        stopDetectionDelay: 1,  // Wait x minutes to engage stop-detection system
        stopTimeout: 1,  // Wait x miutes to turn off location system after stop-detection
        activityType: 'AutomotiveNavigation',

        // Application config
        debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
        forceReloadOnLocationChange: false,  // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a new location is recorded (WARNING: possibly distruptive to user) 
        forceReloadOnMotionChange: false,    // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when device changes stationary-state (stationary->moving or vice-versa) --WARNING: possibly distruptive to user) 
        forceReloadOnGeofence: false,        // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a geofence crossing occurs --WARNING: possibly distruptive to user) 
        stopOnTerminate: false,              // <-- [Android] Allow the background-service to run headless when user closes the app.
        startOnBoot: true,                   // <-- [Android] Auto start background-service in headless mode when device is powered-up.

        // HTTP / SQLite config
        url: 'https://www.somerandomurl.com1234',
        method: 'POST',
        batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
        autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
        maxDaysToPersist: 1  ,  // <-- Maximum days to persist a location in plugin's SQLite database when HTTP fails
        // headers: {
        //     "X-FOO": "bar"
        // },
         //params: {
             // Add your parameters here 
         //}
       });

  bgGeo.changePace(true); // Setting pace to fast to enable aggresive tracking as soon as the plugin is started
                          // Comment it to enable default behaviour
   
  
  $rootScope.bgGeo = bgGeo;
    // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
    // bgGeo.start();

    // If you wish to turn OFF background-tracking, call the #stop method.
    // bgGeo.stop()

    },
  start : function(){
      $rootScope.bgGeo.start();
    },
  stop : function(){
      $rootScope.bgGeo.stop();  
    }
  
    }
})


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
