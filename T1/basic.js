import * as THREE from  'three';
import GUI from '../libs/util/dat.gui.module.js'
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../build/jsm/loaders/GLTFLoader.js';
import {OBJLoader} from '../build/jsm/loaders/OBJLoader.js';
import {PLYLoader} from '../build/jsm/loaders/PLYLoader.js';
import {MTLLoader} from '../build/jsm/loaders/MTLLoader.js';
import {initRenderer, 
        initDefaultBasicLight,
        createGroundPlane,
        SecondaryBox,
        onWindowResize, 
        getMaxSize,
        createGroundPlaneWired} from "../libs/util/util.js";

let scene, renderer, camera, orbit, light;

scene = new THREE.Scene();    // Create main scene

renderer = initRenderer();    // View function in util/utils
   renderer.setClearColor("rgb(30, 30, 42)");

camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(-4,0.7,0);

orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.
   orbit.target.set(0, .5, 0);
   orbit.update();
   

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

    function plano(op){

      let w = window.innerWidth;
      let plane = createGroundPlaneWired(w, 71.5, 10, 10, 3, "lightgreen", "lightgreen")

      return plane;
      
    }

var plane = null;

light = initDefaultBasicLight(scene, true); // Use default light

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

const planos = new Queue();
for(let i = 0; i<5; i++){
    let plane = plano(1);
    plane.translateY(-(i*71.5));
    scene.add(plane);
    planos.enqueue(plane);
}

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 3 );
  axesHelper.visible = true;
scene.add( axesHelper );


let assetManager = {
   // Properties ---------------------------------
   plane: null,

   allLoaded: false, 
   // Functions ----------------------------------
   checkLoaded : function() {
         if(this.plane ){
             this.allLoaded = true;
      }
   }
}

loadOBJFile('../assets/objects/', 'plane', true , 1.2);

render();

function loadOBJFile(modelPath, modelName, visibility, desiredScale)
{
  var mtlLoader = new MTLLoader( );
  mtlLoader.setPath( modelPath );
  mtlLoader.load( modelName + '.mtl', function ( materials ) {
      materials.preload();

      var objLoader = new OBJLoader( );
      objLoader.setMaterials(materials);
      objLoader.setPath(modelPath);
      objLoader.load( modelName + ".obj", function ( obj ) {
         obj.name = modelName;
         obj.visible = visibility;
         obj.traverse( function (child)
         {
            child.castShadow = true;
         });

         obj.traverse( function( node )
         {
            if( node.material ) node.material.side = THREE.DoubleSide;
         });

         var obj = normalizeAndRescale(obj, desiredScale);
         var obj = fixPosition(obj);

         plane = obj;

         scene.add ( obj );
         assetManager[modelName] = obj;
      });
  });

}


// Normalize scale and multiple by the newScale
function normalizeAndRescale(obj, newScale)
{
  var scale = getMaxSize(obj); 
  obj.scale.set(newScale * (1.0/scale),
                newScale * (1.0/scale),
                newScale * (1.0/scale));
  return obj;
}

function fixPosition(obj)
{
  // Fix position of the object over the ground plane
  var box = new THREE.Box3().setFromObject( obj );
  if(box.min.y > 0)
    obj.translateY(-box.min.y);
  else
    obj.translateY(-1*box.min.y);
  return obj;
}


function render()
{
   assetManager.checkLoaded();
   requestAnimationFrame(render);
   renderer.render(scene, camera);

   //plane.translateX(0.02);

   if(plane.toFixed(2) % 71.5 == 0){
      let aux = planos.dequeue();
      aux.translateY(-(357.5));
      planos.enqueue(aux);
    }
}
