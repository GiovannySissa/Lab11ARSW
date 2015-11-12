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
			response=$scope.selectedBlueprint(cnv,ctx);
			
			
			
		}; 
		 
		$scope.selectedBlueprint = function(cnv,ctx){
			alert($scope.nameblueprint);
			var configList = {
				method: "GET",
				url: "http://10.2.67.82:8080/blueprints/" + $scope.nameblueprint
			};
			var response=$http(configList);

			response.success(function(data, status, headers, config) {
				//alert("respose");
				$scope.blueprint = data; 
				ctx.beginPath();
				ctx.moveTo($scope.blueprint.points[0].x, $scope.blueprint.points[0].y);
				for (i=1;i<$scope.blueprint.points.length;i++){
				ctx.lineTo($scope.blueprint.points[i].x,$scope.blueprint.points[i].y);
				ctx.stroke();
			} 
			});

			response.error(function(data, status, headers, config) {
				alert("The petition has failed. HTTP Status:"+status);
			});
		}; 
		 
	});
	
})();





