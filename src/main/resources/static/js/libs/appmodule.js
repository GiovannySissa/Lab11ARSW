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



		//Create a mouse events

		function viewMsj(canvas, msj){
			
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillText(msj, 10, 25);
		};
		function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }


		var canvasDraw 	= document.getElementById('canvasDraw');
		var context		= canvasDraw.getContext('2d'); 

		canvasDraw.addEventListener('mousedown', function (e) {
    		var pos = getMousePos(canvasDraw, e); //position mouse
    		var msj = "Duvan Gay "+pos.x +" "+ pos.y; 
    		viewMsj(canvasDraw, msj);
    		
		},true);


		$scope.loadData();
		 
	});
	
})();



/*
<script>
      function writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
      }
      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');

      canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas, message);
      }, false);
    </script>

*/



