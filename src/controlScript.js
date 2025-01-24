'use strict'


let canvas = document.createElement('canvas');

let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
let height = (window.innerHeight > 0) ? window.innerHeight : screen.height;



canvas.id = "CursorLayer";
canvas.width = width;
canvas.height = height;
canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";


let body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

/*
var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
ctx.fillRect(100, 100, 200, 200);
ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
ctx.fillRect(150, 150, 200, 200);
ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
ctx.fillRect(200, 50, 200, 200);
*/
const gl = canvas.getContext("webgl2");

//const scale = window.devicePixelRatio;
//gl.canvas.width=gl.canvas.clientWidth *scale;
//gl.canvas.height=gl.canvas.clientHeight*scale;

//gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
main(gl);
