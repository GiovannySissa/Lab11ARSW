(function () {
    var app = angular.module('modone', []);
    app.controller('plan_control', 
    function($scope,$http){
		 $scope.listnames=[];
		 $scope.blueprint="";
		 
		 $scope.loadData = function() {
			 alert("entro");
			var configList = {
				method: "GET",
				url: "http://localhost:8080/blueprints"
			};

			var response=$http(configList);

			response.success(function(data, status, headers, config) {
				$scope.listnames = data;
			});

			response.error(function(data, status, headers, config) {
				alert("The petition has failed. HTTP Status:"+status);
			});
		};
		 
		 
		 
		});
	
})();





