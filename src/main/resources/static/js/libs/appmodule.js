(function () {
    var app = angular.module('modone', []);
    app.controller('plan_control', 
    function($scope,$http){
		 $scope.listnames=[];
		 $scope.nameblueprint="";
		 $scope.blueprint = { points : "points", name : "name"
		 };
		 
		 $scope.loadData = function() {
			 
			var configList = {
				method: "GET",
				url: "http://10.2.67.82:8080/blueprints"
			};

			var response=$http(configList);

			response.success(function(data, status, headers, config) {
				$scope.listnames = data;
			});

			response.error(function(data, status, headers, config) {
				alert("The petition has failed. HTTP Status:"+status);
			});
		};
		 
		$scope.drawBluePrint = function(){
			var cnv= document.getElementById("canvas");
			var ctx = cnv.getContext("2d");
			$scope.selectedBlueprint();
		}; 
		 
		$scope.selectedBlueprint = function(){
			alert($scope.nameblueprint);
			var configList = {
				method: "GET",
				url: "http://10.2.67.82:8080/blueprints/" + $scope.nameblueprint
			};
			var response=$http(configList);

			response.success(function(data, status, headers, config) {
				alert("respose");
				$scope.blueprint = data; 
				alert($scope.blueprint.name);
			});

			response.error(function(data, status, headers, config) {
				alert("The petition has failed. HTTP Status:"+status);
			});
		}; 
		 
	});
	
})();





