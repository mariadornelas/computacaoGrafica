import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";

let scene, renderer, camera, light, orbit; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3()); // Init camera in this position
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

// Base do avião _ corte de um cilindro 
const baseAviaoGeometry = new THREE.CylinderGeometry( 1.2, 0.60, 15, 32 );
const baseAviaoMaterial = new THREE.MeshBasicMaterial( {color: 0x6a329f} );

const baseAviao = new THREE.Mesh( baseAviaoGeometry, baseAviaoMaterial );
baseAviao.position.set(0,10,0);

baseAviao.rotateX(THREE.MathUtils.degToRad(90));

scene.add( baseAviao );

// Parte da frente do avião 
const frenteAviaoGeometry = new THREE.SphereGeometry( 1.2, 32, 16 );
const frenteAviaoMaterial = new THREE.MeshBasicMaterial( { color: 0xffd700 } );

const frenteAviao = new THREE.Mesh( frenteAviaoGeometry, frenteAviaoMaterial );
frenteAviao.position.set(0, 7.5 ,0);

baseAviao.add( frenteAviao );

// Parte de trás do avião 
const finalAviaoGeometry = new THREE.SphereGeometry( 0.60, 32, 16 );
const finalAviaoMaterial = new THREE.MeshBasicMaterial( { color: 0xffd700 } );

const finalAviao = new THREE.Mesh( finalAviaoGeometry, finalAviaoMaterial );
finalAviao.position.set(0, - 7.5 ,0);

baseAviao.add( finalAviao );

// Hélices do avião _ Semi-esfera 
const frenteAviaoGeometry2 = new THREE.SphereGeometry( 0.2, 32, 16 );
const frenteAviaoMaterial2 = new THREE.MeshBasicMaterial( { color: 0xff5700 } );

const frenteAviao2 = new THREE.Mesh( frenteAviaoGeometry2, frenteAviaoMaterial2 );
frenteAviao2.position.set(0, 8.70 ,0);

baseAviao.add( frenteAviao2 );

// Hélice do avião _ Pás
const pasGeometry = new THREE.SphereGeometry( 0.08, 32, 16 );
const pasMaterial = new THREE.MeshBasicMaterial( { color: 0xf91f00 } );

const pas1 = new THREE.Mesh( pasGeometry, pasMaterial );
pas1.rotateX(THREE.MathUtils.degToRad(90));
pas1.scale.set(1.5,10,1);
frenteAviao2.add( pas1 );

const pas2 = new THREE.Mesh( pasGeometry, pasMaterial );
pas2.rotateX(THREE.MathUtils.degToRad(90));
pas1.rotateZ(2);
pas2.scale.set(1.5,10,1);
frenteAviao2.add( pas2 );

const pas3 = new THREE.Mesh( pasGeometry, pasMaterial );
pas3.rotateX(THREE.MathUtils.degToRad(90));
pas3.rotateZ(4);
pas3.scale.set(1.5,10,1);
frenteAviao2.add( pas3 );

// Asa do avião 
const asaGeometry = new THREE.SphereGeometry( 0.6, 32, 16 );
const asaMaterial = new THREE.MeshBasicMaterial( { color: 0xf91f00 } );

const asa = new THREE.Mesh( asaGeometry, asaMaterial );

asa.scale.set(1.5, 12 , 1);
asa.rotateZ(THREE.MathUtils.degToRad(90));
asa.translateX(3);

baseAviao.add( asa );

// Cabine 
const cabineGeometry = new THREE.SphereGeometry( 0.5 , 32 , 16 );
const cabineMaterial = new THREE.MeshBasicMaterial( { color: 0x632f00 } );

const cabine = new THREE.Mesh( cabineGeometry, cabineMaterial );

cabine.scale.set(1,3,1);
cabine.translateY(4);
cabine.translateZ(-0.9);
baseAviao.add(cabine);

// Pás traseiras
const paTraseiraGeometry = new THREE.SphereGeometry( 0.2, 32, 16 );
const paTraseiraMaterial = new THREE.MeshBasicMaterial( { color: 0xf91f00 } );

const paTraseira = new THREE.Mesh( paTraseiraGeometry, paTraseiraMaterial );

paTraseira.scale.set(1.5, 12 , 1);
paTraseira.rotateZ(THREE.MathUtils.degToRad(90));
paTraseira.translateX(-7.2);

baseAviao.add( paTraseira );

const paTraseira2 = new THREE.Mesh( paTraseiraGeometry, paTraseiraMaterial );

paTraseira2.scale.set(1.5, 6 , 1);
paTraseira2.rotateZ(THREE.MathUtils.degToRad(90));
paTraseira2.translateX(-7.2);
paTraseira2.rotateX(THREE.MathUtils.degToRad(90));
paTraseira2.translateY(-0.8);

baseAviao.add( paTraseira2 );

// Camera holder
const cameraHolderGeometry = new THREE.CylinderGeometry( 1, 1, 1, 32 );
const cameraHolderMaterial = new THREE.MeshBasicMaterial( {color: 0x6a329f} );

const cameraHolder = new THREE.Mesh( cameraHolderGeometry, cameraHolderMaterial );
  cameraHolder.position.set(0,-30,-6);
  let axesHelper2 = new THREE.AxesHelper( 12 );
  baseAviao.add( axesHelper2 );
  cameraHolder.add(camera);

baseAviao.add(cameraHolder);


// Mouse variables
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
document.addEventListener('mousemove', onDocumentMouseMove);

// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

render();
function render() {
   mouseRotation();
   requestAnimationFrame(render);
   renderer.render(scene, camera) // Render scene
}

function mouseRotation() {
   targetX = mouseX * .00045;
   if (cameraHolder) {
      cameraHolder.rotation.y += 0.05 * (targetX - cameraHolder.rotation.y);
      baseAviao.translateX(-targetX);

   }
}

function onDocumentMouseMove(event) {
   mouseX = (event.clientX - windowHalfX);
   mouseY = (event.clientY - windowHalfY);
}
