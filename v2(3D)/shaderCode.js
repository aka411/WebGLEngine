



const vert = `#version 300 es

in vec4 a_position;
uniform mat4 modelMatrix;
uniform mat4 cameraMatrix;




void main() {

   gl_Position = cameraMatrix*modelMatrix*a_position;



}`;



const frag = `#version 300 es
precision highp float;

out vec4 outColor;

void main() {
   outColor = vec4(0.9921568627450981,0.2196078431372549,0.4,0.0);
}`;
