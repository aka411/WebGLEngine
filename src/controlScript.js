'use strict'


let canvas = document.createElement('canvas');

let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
let height = (window.innerHeight > 0) ? window.innerHeight : screen.height;



canvas.id = "CursorLayer";
canvas.width = width-20;
canvas.height =height-20;
canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";


let body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);


const gl = canvas.getContext("webgl2");

main(gl);
