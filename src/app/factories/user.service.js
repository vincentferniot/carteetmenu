(function() {
  'use strict';

  angular
    .module('UserService', [])
    .factory('User', UserService);

  /**@ngInject**/
  function UserService($stamplay, $q) {

    // return an object with all our functions
    return {
      getCurrent: getCurrent,
      signup: signup,
      login: login,
      logout: logout,
      resetEmail: resetEmail,
      resetDisplayName: resetDisplayName,
      resetPassword: resetPassword
    };

    /**
     * Get the current logged in user
     */
    function getCurrent() {
      var def = $q.defer();

      // instantiate a new user model from the stamplay js sdk
      var user = $stamplay.User().Model;
      user.currentUser()
        .then(function () {
          // send the entire user model back
          def.resolve(user);
        });

      return def.promise;
    }

    /**
     * Register a user with their name, email, and password
     */
    function signup(data) {
      var def = $q.defer();

      // instantiate a new user model from the stamplay js sdk
      var user = $stamplay.User().Model;
      user.signup(data)
        .then(function () {
          // send the entire user model back
          def.resolve(user);
        });

      return def.promise;
    }

    /**
     * Log a user in with their email and password
     */
    function login(data) {
      var def = $q.defer();
      var user = $stamplay.User().Model;

      user.login(data.email, data.password)
        .then(function () {
          // send the entire user model back
          def.resolve(user);
        }, function () {
          def.reject({'error': 'Unable to login user.'});
        });

      return def.promise;
    }

    /**
     * Log the current user out
     * Will also redirect the browser to the logout url (home)
     */
    function logout() {
      var user = $stamplay.User().Model;
      user.logout();
    }

    /**
     * Log the current user out
     * Will also redirect the browser to the logout url (home)
     */
    function resetEmail(data) {
      var def = $q.defer();
      var user = $stamplay.User().Model;

      user.currentUser().then(
        function(){
          user.set('email', data.email);
          user.save().then(function(){
            def.resolve(user);
          }, function(){
            def.reject({'error': 'Unable to reset your email.'});
          });
        }
      );

      return def.promise;
    }
    /**
     * Log the current user out
     * Will also redirect the browser to the logout url (home)
     */
    function resetDisplayName(data) {
      var def = $q.defer();
      var user = $stamplay.User().Model;

      user.currentUser().then(
        function(){
          user.set('displayName', data.displayName);
          user.save().then(function(){
            def.resolve(user);
          }, function(){
            def.reject({'error': 'Unable to reset your name.'});
          });
        }
      );


      return def.promise;
    }
    /**
     * Log the current user out
     * Will also redirect the browser to the logout url (home)
     */
    function resetPassword(data) {
      var def = $q.defer();
      var user = $stamplay.User().Model;

      user.resetPassword(data.email, data.password).then(function(){
        def.resolve(user);
      }, function(){
        def.reject({'error': 'Unable to reset your password.'});
      });

      return def.promise;
    }
  }
})();