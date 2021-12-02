(function() {
	'use strict';

	angular.module('myApp.login_form').controller('loginController',
			loginController);

	loginController.$inject = ['userService', '$rootScope', '$scope', '$stateParams',
			'$state', 'localStorageService', 'toastr', 'ApiEndpoint',
			'loginService' ];

	/* @ngInject */
	function loginController(userService, $rootScope, $stateParams, $scope, $state, 
			localStorageService, toastr, ApiEndpoint, loginService) {

		var vm = angular.extend(this, {
			doLogin : doLogin,
		});

		(function activate() {
			if(sessionStorage.getItem('renataLoggedInUser') != null && sessionStorage.getItem('permissions') != null){
				$state.go('main.home');
			}
		})();

		// ******************************************************
		
		function doLogin(login) {
			
//			$state.go('main.user');
//			$state.go('main.home');
			console.log(JSON.stringify(login));
			loginService.doLogin(login).then(function(data) {
//				console.log(JSON.stringify(data[0]));
				
				if (data) {
					userService.getPermissionsOf1User(data.id).then(function(data){
						sessionStorage.setItem('permissions', JSON.stringify(data));
						$state.go('main.home');
						toastr.success('Login....', 'Succesfully !!');
					});
					localStorageService.set(ApiEndpoint.userKey, data);
//					localStorageService.set(ApiEndpoint.userKey, data);
					sessionStorage.setItem(ApiEndpoint.userKey, JSON.stringify(data));
				} else {
					toastr.error('User Id and Password Doesnt match...!!');
				}
			});
		}
	}
})();
