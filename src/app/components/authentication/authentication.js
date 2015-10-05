(function() {
  'use strict';

  angular
    .module('app.authentication', [])
    .controller('AuthenticationController', AuthenticationController);

  /** @ngInject */
  function AuthenticationController(User, $rootScope, $state) {
    var authentication = this;


    authentication.signup = {
      func: signup,
      model: {},
      error: {},
      fields: [
        {
          key: 'email',
          type: 'input',
          templateOptions: {
            type: 'email',
            label: 'Email address',
            placeholder: 'Enter email',
            required: true
          }
        },
        {
          key: 'displayName',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Nickname',
            placeholder: 'Enter a nickname',
            required: true,
            minlength: 4,
            maxlength: 55
          }
        },
        {
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Password (min 6 char.)',
            placeholder: 'Enter password',
            required: true,
            minlength: 6
          }
        }
      ]
    };

    authentication.login = {
      func: login,
      model: {},
      error: {},
      fields: [
        {
          key: 'email',
          type: 'input',
          templateOptions: {
            type: 'email',
            label: 'Email address',
            placeholder: 'Enter email',
            required: true
          }
        },
        {
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Password',
            placeholder: 'Enter password',
            required: true
          }
        }
      ]
    };

    /**
     * Sign a user up and bind their info to $rootScope
     */
    function signup() {
      var signupData = {
        email: authentication.signup.model.email,
        displayName: authentication.signup.model.displayName,
        password: authentication.signup.model.password
      };

      User.signup(signupData)
        .then(function(data) {
          if (data.get('_id')) {
            $rootScope.currentUser.id    = data.get('_id');
            $rootScope.currentUser.name  = data.get('displayName');
            $rootScope.currentUser.image = data.get('profileImg');

            // redirect the user
            $state.go('home');
          }
        });
    }

    /**
     * Use the User factory to log a user in
     * Bind the user's information to $rootScope
     */
    function login() {
      var loginData = {
        email: authentication.login.model.email,
        password: authentication.login.model.password
      };


      User.login(loginData)
        .then(function(data) {
          if (data.get('_id')) {
            $rootScope.currentUser.id    = data.get('_id');
            $rootScope.currentUser.name  = data.get('displayName');
            $rootScope.currentUser.image = data.get('profileImg');

            // redirect the user
            $state.go('home');
          }
        }, function(data){
          toastr.error(data.error + '<br> Check your email and/or your password');
        }
      );
    }
  }
})();