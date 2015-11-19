(function () {
    var app = angular.module('modone', []);
    var paint = undefined; 

    app.controller('plan_control', 
    function($scope,$http, $log){
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
		var canvasDraw 	= document.getElementById('canvasDraw');
		var context		= canvasDraw.getContext('2d'); 
		var  pos = canvas.getBoundingClientRect();

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


		
		
		canvasDraw.addEventListener('mousedown', function (e) {
    		pos = getMousePos(canvasDraw, e); //position mouse
    		paint = true;
  			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);

  			redraw();
    		var msj = "Duvan Gay "+pos.x +" "+ pos.y; 
    		viewMsj(canvasDraw, msj);
    		//$log.debug(paint);
		});
  			

		canvasDraw.addEventListener('mousemove', function(e){
			//$log.debug(paint);
			if(paint){
				//viewMsj(canvasDraw, "SDDFFH "+ paint);
				viewMsj(canvasDraw, "msj" + pos.x + " "+ pos.y);
   				addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    			redraw();
  			}
		});

		canvasDraw.addEventListener('mouseup', function (e2) {			
			paint = false;
			    
			    redraw();
		});

		
		canvasDraw.addEventListener('mouseleave', function (e3) {
			paint = false;
		});		


		// ------------------------------------------------------------
		//save click position 

		
		
		

		var clX = new Array();	// click x	
		var clY = new Array();	// click y
		var clDr = new Array(); // click drag

		//var paint ; 
		function addClick(x, y , dragging){
			clX.push(x);
			clY.push(y);
			clDr.push(dragging);			
			$log.debug(clX, clY);
		}

		function redraw(){
  			context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas		  
		  	context.strokeStyle = "#659b41";
		  	context.lineJoin = "round";
		  	context.lineWidth = 51;
			
		  	for(var i=0; i < clX.length; i++) {		
		    	context.beginPath();
		    	if(clDr[i] && i){
		      		context.moveTo(clX[i-1], clY[i-1]);
		     	}else{
		       		context.moveTo(clX[i]-1, clY[i]);
		     	}
		     	context.lineTo(clX[i], clY[i]);
		     	context.closePath();
		     	context.stroke();
  			}
  		}

		$scope.loadData();
		 
	});
	
})();




