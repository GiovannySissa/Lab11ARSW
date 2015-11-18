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
		 
		$scope.drawBluePrint = function(){
			var cnv= document.getElementById("canvas");
			var ctx = cnv.getContext("2d");
			response=$scope.selectedBlueprint(cnv,ctx);
			
			
			
		};
                $scope.limpiarAll = function(){
			var cnv= document.getElementById("canvas");
			var ctx = cnv.getContext("2d");
                        var cnvD= document.getElementById("canvasDraw");
			var ctxD = cnvD.getContext("2d");
                        var len = document.getElementsByName("figuras").length;
                        var svg=document.getElementById("svg");
			ctx.clearRect(0, 0, cnv.width, cnv.height);
                        ctxD.clearRect(0, 0, cnvD.width, cnvD.height);
                        
                        for (i=0;i<len;i++){
                            svg.removeChild(document.getElementsByName("figuras")[0]);
                        }
			
			
			
		}; 
		 
		$scope.selectedBlueprint = function(cnv,ctx){
			
			var configList = {
				method: "GET",
				url: "http://localhost:8080/blueprints/" + $scope.nameblueprint
			};
			var response=$http(configList);
		
			response.success(function(data, status, headers, config) {
				//alert("respose");
				var puntos="";
				$scope.blueprint = data; 
				ctx.beginPath();
				ctx.moveTo($scope.blueprint.points[0].x, $scope.blueprint.points[0].y);
				puntos=$scope.blueprint.points[0].x+","+$scope.blueprint.points[0].y;
				for (i=1;i<$scope.blueprint.points.length;i++){
				ctx.lineTo($scope.blueprint.points[i].x,$scope.blueprint.points[i].y);
				ctx.stroke();
				puntos=puntos+" "+$scope.blueprint.points[i].x+","+$scope.blueprint.points[i].y;
				
				}
				
				var elementoSvg= document.getElementById("svg");
				var poligono =document.createElementNS("http://www.w3.org/2000/svg","polyline");
				poligono.setAttribute("points",puntos);
                                poligono.setAttribute("name","figuras");
				poligono.setAttribute("style","stroke:red;stroke-width:1");
				elementoSvg.appendChild(poligono);
				//document.getElementById("svg").setAttribute("points",puntos);	 
			});

			response.error(function(data, status, headers, config) {
				alert("The petition has failed. HTTP Status:"+status);
			});
		}; 
		$scope.loadData();
		 
	});
	
})();





