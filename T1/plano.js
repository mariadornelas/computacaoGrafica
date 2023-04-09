import * as THREE from  'three';
//import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneWired} from "../libs/util/util.js";

let scene, renderer, camera, light//, orbit; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3()); // Init camera in this position
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
//orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.


class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element);
  }
  
  dequeue() {
    return this.items.shift();
  }
  
}


function arvore (posx, posy, plane) {
  const basegeometry = new THREE.CylinderGeometry(0.6, 1.6, 8, 32 );
  const basematerial = new THREE.MeshBasicMaterial( {color: 0x4b3621 } );
  const basecylinder = new THREE.Mesh( basegeometry, basematerial );
  
  // camadas da árvores _ partes de cilindros verdes
  const folhasmaterial = new THREE.MeshBasicMaterial( {color: 0x006400 } );
  
  const folhasgeometry1 = new THREE.CylinderGeometry(0.6, 1.6, 2, 32 );
  
  const folhascylinder1 = new THREE.Mesh( folhasgeometry1, folhasmaterial );
  folhascylinder1.translateY(5);
  
  const folhasgeometry2 = new THREE.CylinderGeometry(0.8, 1.8, 2, 32 );
  
  const folhascylinder2 = new THREE.Mesh( folhasgeometry2, folhasmaterial );
  folhascylinder2.translateY(3.5);
  
  const folhasgeometry3 = new THREE.CylinderGeometry(1, 2, 2, 32 );
  
  const folhascylinder3 = new THREE.Mesh( folhasgeometry3, folhasmaterial );
  folhascylinder3.translateY(2.0);
  
  const folhasgeometry4 = new THREE.CylinderGeometry(1.2, 2.2, 2, 32 );
  
  const folhascylinder4 = new THREE.Mesh( folhasgeometry4, folhasmaterial );
  folhascylinder4.translateY(0.5);
  
  const folhasgeometry5 = new THREE.CylinderGeometry(1.4, 2.4, 2, 32 );
  
  const folhascylinder5 = new THREE.Mesh( folhasgeometry5, folhasmaterial );
  folhascylinder5.translateY(-1);
  
  basecylinder.add(folhascylinder1);
  basecylinder.add(folhascylinder2);
  basecylinder.add(folhascylinder3);
  basecylinder.add(folhascylinder4);
  basecylinder.add(folhascylinder5);
  let angle = THREE.MathUtils.degToRad(90);
  basecylinder.rotateX(angle);
  basecylinder.scale.set(0.5,0.5,0.5);
  basecylinder.position.set(posy, posx , 2.0 )

  plane.add( basecylinder );
}

function plano(){

    console.log("entro no if")

    let plane = createGroundPlaneWired(61.5, 71.5, 10, 10, 3, "blue", "blue")

    for(let i =0; i< aleatorio(4, 8); i++){

      arvore(-aleatorio(35,0),-aleatorio(30,0),plane);
      arvore(-aleatorio(35,0),aleatorio(30,0),plane);
      arvore(aleatorio(35,0),-aleatorio(30,0),plane);
      arvore(aleatorio(35,0),aleatorio(30,0),plane);
    }

    return plane;
    
}



function aleatorio (max,min){
  return Math.random() * (max - min) + min;
}

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane

// Base do avião _ corte de um cilindro 
const baseAviaoGeometry = new THREE.CylinderGeometry( 1.2, 0.60, 15, 32 );
const baseAviaoMaterial = new THREE.MeshBasicMaterial( {color: 0x6a329f} );

const baseAviao = new THREE.Mesh( baseAviaoGeometry, baseAviaoMaterial );
baseAviao.position.set(0,4,0);

baseAviao.rotateX(THREE.MathUtils.degToRad(90));

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
  cameraHolder.position.set(0,-50,-6);
  let axesHelper2 = new THREE.AxesHelper( 12 );
  baseAviao.add( axesHelper2 );
  cameraHolder.add(camera);

baseAviao.add(cameraHolder);

scene.add( baseAviao );

// Mouse variables
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
document.addEventListener('mousemove', onDocumentMouseMove);

baseAviao.translateZ(-5);
baseAviao.translateX(0);
baseAviao.translateY(0);
camera.lookAt(0,0,0);

//const planos = [plano(0), plano(71.5), plano(143), plano(214.5), plano(286)];
const planos = new Queue();
for(let i = 0; i<5; i++){
  let plane = plano();
  plane.translateY(-(i*71.5));
  scene.add(plane);
  planos.enqueue(plane);
}


render();


function render()
{
  mouseRotation();
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
  if( baseAviao.position.z.toFixed(2) % 71.5 == 0){
    let aux = planos.dequeue();
    aux.translateY(-(baseAviao.position.z + 286));
    console.log(-(baseAviao.position.z + 286))
    planos.enqueue(aux);
  }
}


function mouseRotation() {
  targetX = mouseX * .00045;
  targetY = mouseY * .00045;
    if (cameraHolder) {
     //baseAviao.rotation.y += 0.05 * (cameraHolder.rotation.y);
     baseAviao.translateX(-targetX);
     baseAviao.translateY(0.1);
  }
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);
}