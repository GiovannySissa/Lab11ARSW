(function () {
    var app = angular.module('modone', []);
    var paint = undefined; 

    app.controller('plan_control', 
    function($scope,$http, $log){
		 $scope.listnames=[];
		 $scope.nameblueprint="";
		 $scope.blueprint = { "points" : [], "name" : "na"
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

        $scope.agregarFigura=function(){
            var nameN=document.getElementById("nameN").value;
            if(nameN!=""){
              $scope.blueprint.name=nameN;
              $scope.blueprint.points=clX;
              
              $log.debug($scope.blueprint);
              $http.post('blueprints', $scope.blueprint)
            .success(function (data, status, headers, config) {alert('success!');})
            .error(function (data, status, headers, config) {alert('error!');});
              
            };
            /*for (i=0;i<clX.length;i++){
                $log.debug(clX[i]);
            }*/
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
                clX=[];   
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
                                $log.debug($scope.blueprint.points[0]);
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


                /*

		//Create a mouse events
		var canvasDraw 	= document.getElementById('canvasDraw');
		var context		= canvasDraw.getContext('2d'); 
		var  pos = canvasDraw.getBoundingClientRect();
                alert ("marica1   "+pos);
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
                        alert(e.pageX+"       "+e.pageY);
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
  		}*/
        
        
        
                var canvasD, ctxD, flag = false,
                    prevX = 0,
                    currX = 0,
                    prevY = 0,
                    currY = 0,
                    dot_flag = false;
                var clX = new Array();	// click x	
		//var clY = new Array();	// click y
                var x = "black",
                    y = 2;

                function init() {
                   
                    canvasD = document.getElementById('canvasDraw');
                    ctxD = canvasD.getContext("2d");
                    w = canvasD.width;
                    h = canvasD.height;

                   /* canvasD.addEventListener("mousemove", function (e) {
                        findxy('move', e);
                    }, false);
                    */canvasD.addEventListener("click", function (e) {
                        findxy('click', e);
                    }, false);
                    /*canvasD.addEventListener("mouseup", function (e) {
                        findxy('up', e);
                    }, false);
                    canvasD.addEventListener("mouseout", function (e) {
                        findxy('out', e);
                    }, false);
                */}

                function color(obj) {
                    switch (obj.id) {
                        case "green":
                            x = "green";
                            break;
                        case "blue":
                            x = "blue";
                            break;
                        case "red":
                            x = "red";
                            break;
                        case "yellow":
                            x = "yellow";
                            break;
                        case "orange":
                            x = "orange";
                            break;
                        case "black":
                            x = "black";
                            break;
                        case "white":
                            x = "white";
                            break;
                    }
                    if (x == "white") y = 14;
                    else y = 2;

                }

                function draw() {
                    
                    ctxD.beginPath();
                    ctxD.moveTo(100,100);
                    $log.debug("("+prevX+" "+prevY+")( "+currX+" "+currY+")");
                    
                    ctxD.moveTo(prevX, prevY);
                    ctxD.lineTo(currX, currY);
                  //  alert(prevX+" "+prevY+" "+currX+" "+currY);
                    ctxD.strokeStyle = x;
                    ctxD.lineWidth = y;
                    ctxD.stroke();
                    ctxD.closePath();
                }

                function erase() {
                    var m = confirm("Want to clear");
                    if (m) {
                        ctxD.clearRect(0, 0, w, h);
                       // document.getElementById("canvasimg").style.display = "none";
                    }
                }

                /*function save() {
                    document.getElementById("canvasimg").style.border = "2px solid";
                    var dataURL = canvas.toDataURL();
                    document.getElementById("canvasimg").src = dataURL;
                    document.getElementById("canvasimg").style.display = "inline";
                }
*/              function getMousePos(canvas, evt) {
                    var rect = canvas.getBoundingClientRect();
                    return {
                      x: evt.clientX - rect.left,
                      y: evt.clientY - rect.top
                    };
                  }
                function findxy(res, e) {
                     //alert("entro marionf tato fiebre "+res);
                     if (dot_flag){
                         flag=!flag;
                     }else{
                         dot_flag=true;
                     }
                     var point={"x":0,"y":0};
                     var mousePos = getMousePos(canvasD, e);
                     //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
                   point.x=mousePos.x;
                   point.y=mousePos.y;
                   var temp=point;
                   clX.push(temp);
                   
                    // alert(message+"    "+flag);
                     if (flag){
                        currX=mousePos.x;
                        currY=mousePos.y;
                        draw();
                     }else{
                         prevX=mousePos.x;
                         prevY=mousePos.y;
                     }
                    /* if (res == 'down') {
                        prevX = currX;
                        prevY = currY;
                        currX = e.clientX - canvasD.offsetLeft;
                        currY = e.clientY - canvasD.offsetTop;

                        flag = true;
                        dot_flag = true;
                        if (dot_flag) {
                            ctxD.beginPath();
                            ctxD.fillStyle = x;
                            ctxD.fillRect(currX, currY, 2, 2);
                            ctxD.closePath();
                            dot_flag = false;
                        }
                    }
                    if (res == 'up' || res == "out") {
                        flag = false;
                    }
                    if (res == 'move') {
                        if (flag) {
                            prevX = currX;
                            prevY = currY;
                            currX = e.clientX - canvas.offsetLeft;
                            currY = e.clientY - canvas.offsetTop;
                            draw();
                        }
                    }*/
                }
                init();

		$scope.loadData();
		 
	});
	
})();




