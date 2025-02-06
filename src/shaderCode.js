



const vert = `#version 300 es


layout(location=0) in vec4 in_Position;
//layout(location=1) in vec2 in_Tex;
layout(location=1) in vec3 in_Normal;





out vec4 ex_Pos;
out vec3 ex_Normal;






uniform ScreenVariables {
	mat4 CameraView;
	mat4 Projection;

};

uniform ObjectVariables {
	mat4 Transform;
	/*
	vec2 TexOffset;
	vec2 TexScale;
	vec4 Scale;

	vec4 BaseColor;
	vec4 Emission;
	float SpecularMix;
	float DiffuseMix;
	float Metallic;
	float DiffuseRoughness;
	float SpecularPower;
	float IncidentSpecular;

	int ColorReplace;
	int Lit;
	*/

};





void main() {

	vec4 finalNormal = vec4(in_Normal.xyz, 0.0);
  ex_Normal = vec3(finalNormal * Transform);

   gl_Position = Projection*inverse(CameraView)*Transform* in_Position;


ex_Normal=in_Normal;


}`;



const frag = `#version 300 es
precision highp float;

out vec4 outColor;

in vec4 ex_Pos;
//in vec2 ex_Tex;
in vec3 ex_Normal;



struct Light {
	vec4 Position;
	vec4 Color;
	vec4 Direction;
	//float Attenuation0;
  //float Attenuation1;
  //int FalloffEnabled;
  //int Active;
};

uniform Lighting {
	Light Lights;
//vec4 AmbientLighting;
};

void main() {


	vec3 normal = normalize(ex_Normal.xyz);



	vec3 u_color = vec3(0.47,0.6,0.5);
	vec3 u_lightDir =vec3(0.0,-1,0);

	         vec3  lightV   = normalize( -u_lightDir );
	         float NdotL    = max( 0.0, dot( normal, lightV ) );

	         vec3 lightCol  = (0.2 + 0.8 * NdotL) * u_color;
	         outColor   = vec4( lightCol.rgb, 1.0 );






}`;
