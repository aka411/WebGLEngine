



const vert = `#version 300 es

//precision highp float;

layout(location=0) in vec4 in_Position;
//layout(location=1) in vec2 in_Tex;
layout(location=1) in vec3 in_Normal;





out vec4 ex_Pos;
out vec3 ex_Normal;






uniform ScreenVariables {
	mat4 CameraView;
	mat4 Projection;
	vec4 CameraEye;

};

uniform ObjectVariables {
	mat4 Transform;
	vec4 BaseColor;

};





void main() {



   gl_Position = Projection*inverse(CameraView)*Transform* in_Position;



   ex_Pos = in_Position;
   ex_Normal = in_Normal;


}`;



const frag = `#version 300 es
precision highp float;

out vec4 outColor;

in vec4 ex_Pos;
//in vec2 ex_Tex;
in vec3 ex_Normal;





uniform ScreenVariables {
	mat4 CameraView;
	mat4 Projection;
	vec4 CameraEye;

};

uniform ObjectVariables {
	mat4 Transform;

	vec4 BaseColor;


};





struct Light {
	vec4 Position;
	vec4 Color;


};

uniform Lighting {
	Light Lights;
//  vec4 AmbientLighting;
};









void main(void) {


Light light = Lights;

vec3 lightPos	=  vec3(light.Position.xyz);
vec3 lightColor	= vec3(light.Color.xyz);


vec3 objectColor = vec3(BaseColor.xyz);



vec3 Position = vec3((Transform * ex_Pos).xyz);
vec3 Normal = vec3(( transpose (inverse(Transform) ) *vec4(ex_Normal,1.0)).xyz);

vec3 viewPos = vec3(CameraEye.xyz);



	// gouraud shading
// ------------------------


// ambient
float ambientStrength = 0.1;
vec3 ambient = ambientStrength * lightColor;

// diffuse
vec3 norm = normalize(Normal);
vec3 lightDir = normalize(lightPos - Position);
float diff = max(dot(norm, lightDir), 0.0);
vec3 diffuse = diff * lightColor;

// specular
float specularStrength = 1.0; // this is set higher to better show the effect of Gouraud shading
vec3 viewDir = normalize(viewPos - Position);
vec3 reflectDir = reflect(-lightDir, norm);
float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
vec3 specular = specularStrength * spec * lightColor;

vec3 LightingColor = ambient + diffuse + specular;



	outColor =  vec4(LightingColor * objectColor, 1.0);


}
`;
