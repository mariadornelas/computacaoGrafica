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
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// base da árvore _ cilindro marrom
const basegeometry = new THREE.CylinderGeometry(0.6, 1.6, 8, 32 );
const basematerial = new THREE.MeshBasicMaterial( {color: 0x4b3621 } );
const basecylinder = new THREE.Mesh( basegeometry, basematerial );
basecylinder.position.set(0,4,0);
scene.add( basecylinder );

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

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene) // Render scene
}

export default  render();
