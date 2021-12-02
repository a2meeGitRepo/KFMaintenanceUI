(function() {
	'use strict';

	angular.module('myApp.main').controller('mainController', mainController);

	mainController.$inject = [ '$scope', 'localStorageService', 'ApiEndpoint',
			'$state','$location'];
	/* @ngInject */
	function mainController($scope, localStorageService, ApiEndpoint, $state,$location) {
		$scope.openLogout = false;
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var currentUrl = ApiEndpoint.url;
		console.log("LOGIN USER DETIALS "+JSON.stringify(userDetail));
		var vm = angular.extend(this, {
//			doLogout : doLogout,
			user : userDetail,
			logout : logout
		});

		(function activate() {
			$scope.userPermissionDetails  = sessionStorage.getItem('permissions');
			$scope.userPermissionsObj = JSON.parse($scope.userPermissionDetails);
			$scope.userPermissions = $scope.userPermissionsObj.permissions;
			
			givePermissions();
			var curUrl=$location.path();
			console.log("Current path ==   "+curUrl)
		})();
		
		function logout(){
			sessionStorage.removeItem(ApiEndpoint.userKey);
			sessionStorage.removeItem('permissions');
			$state.go('login_form');
		}
		
		function givePermissions(){

			for(var i = 0; i < $scope.userPermissions.length; i++){
				if($scope.userPermissions[i].permissionValue == "grn")
					$scope.showIncomingMaterial = true;
				
				if($scope.userPermissions[i].permissionValue == "final_inspection")
					$scope.showFinalInspection = true;
				
				if($scope.userPermissions[i].permissionValue == "quarantine_store")
					$scope.showQuarantine = true;
				
				if($scope.userPermissions[i].permissionValue == "assembly_operator")
					$scope.showAssembly = true;
				
				if($scope.userPermissions[i].permissionValue == "packaging")
					$scope.showPackaging = true;
				
				if($scope.userPermissions[i].permissionValue == "dispatch_operator")
					$scope.showFinalDispatch = true;
				
				if($scope.userPermissions[i].permissionValue == "production")
					$scope.showProduction = true;
				
				if($scope.userPermissions[i].permissionValue == "access_management")
					$scope.showAccessManagement = true;
				
				if($scope.userPermissions[i].permissionValue == "store_operator")
					$scope.showStoreOperator = true;
				
				if($scope.userPermissions[i].permissionValue == "fg_store_operator")
					$scope.showFinishGoods = true;
				
				if($scope.userPermissions[i].permissionValue == "reports")
					$scope.showReports = true;
				
				/*************** SCRAP ****************/
				if($scope.userPermissions[i].permissionValue == "scrap_entry")
					$scope.showScrapEntry = true;
				
				if($scope.userPermissions[i].permissionValue == "scrap_approval")
					$scope.showScrapApproval = true;
				
				if($scope.userPermissions[i].permissionValue == "scrap_yard_head")
					$scope.showScrapYard = true;
				
				if($scope.userPermissions[i].permissionValue == "scrap_report")
					$scope.showScrapReports = true;
				
				
				/*************** MAINTENANCE ****************/
				if($scope.userPermissions[i].permissionValue == "maintenance_operator")
					$scope.showMaintenanceOperator = true;
				
				if($scope.userPermissions[i].permissionValue == "maintenance_of_machine")
					$scope.showMaintenanceMachine = true;

				if($scope.userPermissions[i].permissionValue == "maintenance_of_moulds")
					$scope.showMaintenanceMould = true;
				
				if($scope.userPermissions[i].permissionValue == "maintenance_master")
					$scope.showMaintenanceMaster = true;
				
			}
		}
		
		$scope.openLogout = false;
		$scope.expandLogout = function() {
			$scope.openLogout = !$scope.openLogout;
		}

		$scope.closeDropdown = function() {
			$scope.openLogout = false;
		}	
		
		$scope.expand = function(item){
			console.log("clicked"+item);
			$scope.item.show = true;
		}
		
		$scope.toggle = function() {
	        $scope.myVar = !$scope.myVar;
	    };
	    
	    $scope.IsVisible = false;
        $scope.ShowHide = function () {
            //If DIV is visible it will be hidden and vice versa.
            $scope.IsVisible = $scope.IsVisible ? false : true;
        }
	}
	
	
})();


