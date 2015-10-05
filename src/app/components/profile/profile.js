(function() {
  'use strict';

  angular
    .module('app.profile', [])
    .controller('ProfileController', ProfileController);

  /** @ngInject */
  function ProfileController(User, $rootScope, $state) {
    var profile = this;
    var email = {
      update: function(){
        var data = {
          email: profile.email.model.email
        };

        User.resetEmail(data).then(
          function(){
            toastr.success('Your email has been successfully updated');
        }, function(data){
          toastr.error(data.error);
        });
      },
      model: {},
      fields: [{
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Email address',
          placeholder: 'Enter email'
        }
      }],
      error: {}
    };

    var name = {
      update: function(){
        var data = {
          displayName: profile.name.model.displayName
        };

        User.resetDisplayName(data).then(
          function(){
            toastr.success('Your name has been successfully updated');
            $rootScope.currentUser.name  = data.displayName;
        }, function(data){
          toastr.error(data.error);
        });
      },
      model: {},
      fields: [{
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
      }],
      error: {}
    };

    var password = {
      update: function(){

        var data = {
          email: profile.email.model.email,
          password: profile.password.model.password
        };

        User.resetPassword(data).then(
          function(){
            toastr.success('Your password has been successfully updated, <br><strong>check your email account to confirm changes !!</strong>');
        }, function(){
            toastr.error('Something went wrong, try again later.')
          });
      },
      model: {
        password: ''
      },
      fields: [{
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Password (min 6 char.)',
          placeholder: 'Enter password',
          required: true,
          minlength: 6
        }
      }],
      error: {}
    };


    profile.email = email;
    profile.name = name;
    profile.password = password;
    profile.data = {};

    User.getCurrent().then(
      function(data) {
        if (data.get('_id')) {

          profile.email.model = {
            email: data.get('email')
          };

          profile.name.model = {
            displayName: data.get('displayName')
          };

        } else {
          // clear the current user just to be sure
          //$rootScope.currentUser = {};
          $state.go('home');

        }
      });

  }
})();