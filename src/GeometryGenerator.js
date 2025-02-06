'use strict'


class GeometryGenerator
{
  cosntructor()
  {

  }

  generateCircle(r,minAngle)
  {

    let vertices = new Array ();
    vertices.push(0,0,0);
    for (let i = 0 ; i < 6.28 ; i+=minAngle)
    {
      vertices.push(r*Math.sin(i),r*Math.cos(i),0);


    }

    const numTris = Math.floor(6.28/minAngle); // will this always return number less than the actual;


    let index = new Array();

let i = 0;
    for ( i = 1; i< numTris; i++ )
    {
      index.push(0);
      index.push(i);
      index.push(i+1);
    }

    index.push(0);
    index.push(i);
    index.push(1);

    return [vertices,index];
  }














  generateSphere(radius,recursionLevel){




	let vertex = new Array();
	let indices = new Array();

	const t = (1.0 + Math.sqrt(5.0)) / 2.0;


	vertex.push(-1, t, 0);
  vertex.push(0, 0, 0);//space for normals

	vertex.push(1, t, 0);
  vertex.push(0, 0, 0);

	vertex.push(-1, -t, 0);
  vertex.push(0, 0, 0);

	vertex.push(1, -t, 0);
  vertex.push(0, 0, 0);

	vertex.push(0, -1, t);
  vertex.push(0, 0, 0);

	vertex.push(0, 1, t);
  vertex.push(0, 0, 0);

	vertex.push(0, -1, -t);
  vertex.push(0, 0 ,0);

	vertex.push(0, 1, -t);
  vertex.push(0, 0, 0);

	vertex.push(t, 0, -1);
  vertex.push(0, 0 ,0);

	vertex.push(t, 0, 1);
  vertex.push(0, 0, 0);

	vertex.push(-t, 0, -1);
  vertex.push(0, 0 ,0);

	vertex.push(-t, 0, 1);
  vertex.push(0, 0, 0);




	indices.push(0, 11, 5);
	indices.push(0, 5, 1);
	indices.push(0, 1, 7);
	indices.push(0, 7, 10);
	indices.push(0, 10, 11);

	// 5 adjacent faces
	indices.push(1, 5, 9);
	indices.push(5, 11, 4);
	indices.push(11, 10, 2);
	indices.push(10, 7, 6);
	indices.push(7, 1, 8);

	// 5 faces around point 3
	indices.push(3, 9, 4);
	indices.push(3, 4, 2);
	indices.push(3, 2, 6);
	indices.push(3, 6, 8);
	indices.push(3, 8, 9);

	// 5 adjacent faces
	indices.push(4, 9, 5);
	indices.push(2, 4, 11);
	indices.push(6, 2, 10);
	indices.push(8, 6, 7);
	indices.push(9, 8, 1);
























	for (let i = 0; i < recursionLevel;i++){

	let dict = new Map();

	//1)Take a triangle (indice vector) T
	//2)Find midpoints of 3 edges of triangle T,let it be a ,b ,c
	//3)create new triangle using 1 vertex of triangle T and two midpoints from a,b,c
	//4)Repeat step 3 for all vertices of triangle T


	const  total_tri_count= indices.length;

	for (let tri_count = 0; tri_count < total_tri_count; tri_count+=3) {

		const  I1 = indices[tri_count];
		const  I2 = indices[tri_count+1];
		const  I3 = indices[tri_count+2];


		function midPoint ( iAIn, iBIn) {




      const iA = iAIn *3*2;
      const iB = iBIn *3*2;
			let P1 = new Vec3(vertex[iA],vertex[iA+1],vertex[iA+2])
			let P2 = new Vec3(vertex[iB],vertex[iB+1],vertex[iB+2])

			if (i == 0) {


				const lenP1=P1.mag();
				const lenP2=P2.mag();

				P1 = P1.scale(1.0 / lenP1);
			  P2 = P2.scale(1.0 / lenP2);

				vertex[iA] = P1.scale(radius).x;
        vertex[iA+1] = P1.scale(radius).y;
        vertex[iA+2] = P1.scale(radius).z;

        vertex[iA+3] = P1.x;
        vertex[iA+4] = P1.y;
        vertex[iA+5] = P1.z;


				vertex[iB] = P2.scale(radius).x;
        vertex[iB+1] = P2.scale(radius).y;
        vertex[iB+2] = P2.scale(radius).z;

        vertex[iB+3] = P2.x;
        vertex[iB+4] = P2.y;
        vertex[iB+5] = P2.z;


			}

			const verticePrevSize = vertex.length/(3*2);

			let bignum = (iA < iB) ? iB : iA;
			let smallnum = (iA < iB) ? iA : iB;

			let key = (smallnum << 32 )+ bignum;

//to avoid calculating midpoint again for the same edge since two triangles may share the same edge
			if (dict.get(key)==undefined) {

				const mid_point_vector = P2.sub( P1).scale(0.5).add(P1);
				const length = mid_point_vector.mag();

				const  unit_mid_point_vector = mid_point_vector.scale(1/length);
        const final_mid_point_vector = unit_mid_point_vector.scale(radius);



				dict[key] = verticePrevSize;
				vertex.push(final_mid_point_vector.x,final_mid_point_vector.y,final_mid_point_vector.z);
        vertex.push(unit_mid_point_vector.x,unit_mid_point_vector.y,unit_mid_point_vector.z);

				return verticePrevSize;
			}
			else {


				return dict[key];

			}

		}



		const Ia = midPoint(I1,I2);

		const Ib = midPoint(I2,I3);

		const Ic = midPoint(I3,I1);





		const  T1 = { I1,Ia,Ic };
		const  T2 = { Ia,I2,Ib };
		const  T3 = { Ib,I3,Ic };
		const  T4= { Ia,Ib,Ic };






		indices[tri_count] = I1;
    indices[tri_count+1] = Ia;
    indices[tri_count+2] = Ic ;


		indices.push(Ia,I2,Ib);
		indices.push(Ib,I3,Ic);
		indices.push(Ia,Ib,Ic);





	}





}

/*
let normals = new Array();
for(let i = 0 ; i<;i+=3){

const p1 = new Vec3(vertex[i],vertex[i+1],vertex[i+2]);

const unitNormal = p1.unit();

normals.push(unitNormal.x);
normals.push(unitNormal.y);
normals.push(unitNormal.z);
}

/*
n = Normalize(sphere_surface_point - sphere_center);
u = atan2(n.x, n.z) / (2*pi) + 0.5;
v = n.y * 0.5 + 0.5;
*/

return [vertex,indices];




  }


  generatePlane(div,width){
let vertex = new Array();
let indices = new Array();
    const triangleSide = width/div;
    for(let row = 0;row < div+1; row++){

      for(let col = 0; col < div+1;col++){

        const point = new Vec3(col*triangleSide ,0.0,-row*triangleSide);

        vertex.push(point.x-width/2,point.y,point.z+width/2);
        vertex.push(0,1,0);//placeholder for normal



      }

    }

    for(let row = 0;row < div; row++){

      for(let col = 0; col < div;col++){
        const index = row*(div+1)+col;

        indices.push(index,index+(div+1)+1,index+(div+1));
        indices.push(index,index+1,index+(div+1)+1);





      }

    }


return [vertex,indices];




  }






}
