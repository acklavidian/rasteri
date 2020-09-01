import { Geometry, Face3, Vector3, MeshBasicMaterial, Mesh } from 'three'

const geometry = new Geometry();
const material = new MeshBasicMaterial({ color: 0xff0000 })

geometry.vertices.push(
	new Vector3( -3,  3, 0 ),
	new Vector3( -3, -3, 0 ),
	new Vector3(  3, -3, 0 )
);

geometry.faces.push( new Face3( 0, 1, 2 ) );

geometry.computeBoundingSphere();



export const shape = new Mesh(geometry, material)