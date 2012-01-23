var picbutton = document.querySelector('#picbutton');
var resetbutton = document.querySelector('#resetbutton');
var video_element = document.querySelector('video');

picbutton.addEventListener('click', snapshot, false);
video_element.addEventListener('click', snapshot, false);
resetbutton.addEventListener('click', clearImages, false);
window.addEventListener('devicemotion', shakeReset, false);

var prev= 0;
var options = {audio: false, video:true};
var webmvideo = "http:\/\/media.shinydemos.com\/warholiser\/wsh.webm";
var mp4video = "http:\/\/media.shinydemos.com\/warholiser\/wsh.mp4";


if (navigator.getUserMedia){
  	navigator.getUserMedia(options, v_success, v_error);
}  
  
else if (navigator.webkitGetUserMedia) {
	navigator.webkitGetUserMedia("video", webkit_v_success, v_error)
}

else {
	not_supported();
}

function not_supported(){
	var message = document.querySelector('#message');
	message.innerHTML = "<h2>Webcam access through the WebRTC spec is not supported by this browser. Moving to a &lt;video&gt; fallback instead.</h2>";
	
	video_element.innerHTML = "<source src=\""+webmvideo+"\" type=\"video\/webm\" ><\/source> <source src=\""+mp4video+"\" type=\"video\/mp4\" ><\/source>";
			video_element.muted= true;
	
}

function v_success(stream){
	video_element.src = stream;
}

function webkit_v_success(stream) {
	video_element.src = window.webkitURL.createObjectURL(stream)
}

function v_error(error){
	console.log("Error! Error code is:"+error.code);
}


function snapshot(){
	var canvas = document.createElement('canvas');
	canvas.width = video_element.clientWidth/2;
	canvas.height = video_element.clientHeight/2;
	canvas.className = "pic";
	var deg = getDeg();
	
	canvas.style.OTransform = "rotate("+deg+"deg)";
	canvas.style.MozTransform = "rotate("+deg+"deg)";
	canvas.style.WebkitTransform = "rotate("+deg+"deg)";
	canvas.style.msTransform = "rotate("+deg+"deg)";
	canvas.style.zIndex = "999";

	var picture_stage = document.querySelector("#pictures");
	picture_stage.appendChild(canvas);
	
	var ctx = canvas.getContext('2d');
	var cw = canvas.width;
	var ch = canvas.height;
	ctx.drawImage(video_element, 0, 0, cw, ch );
	
	applyEvents();
}


function applyEvents(){
	var elems = document.querySelectorAll('canvas');
	for (var i=0; i<elems.length;i++){
		elems[i].addEventListener('click', newimg, true);
	}
}


function newimg(){
	var datauri = this.toDataURL("image/png");
	window.open(datauri);	
}

function shakeReset(event){

	if (event.acceleration){
	var acc_x = Math.abs(event.acceleration.x);
	var acc_y = Math.abs(event.acceleration.y);
	var acc_z = Math.abs(event.acceleration.z);
	}
	
	if ( (acc_x || acc_y || acc_z) > 15.5){
		clearImages();		
	}
}

function clearImages(){
	var canvases = document.querySelectorAll('canvas');
	var polaroid = document.querySelector('#pictures');	
	for (var i=0; i<canvases.length; i++){
		polaroid.removeChild(canvases[i]);
	}
}


function getDeg(){
	if (prev == 0){
		var number = Math.floor(Math.random()*45);
		prev += 1;
		return number;
	} else {
		var number = Math.floor(Math.random()*45);
		number *= -1;
		prev -= 1;
		return number;
	}
}
