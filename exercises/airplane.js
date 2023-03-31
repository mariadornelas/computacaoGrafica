import * as THREE from  'three';
import {TeapotGeometry} from '../build/jsm/geometries/TeapotGeometry.js';
import { PerspectiveCamera } from '../build/three.module.js';
import { PointLight } from '../build/three.module.js';
import { Object3D } from '../build/three.module.js';
import { BoxGeometry } from '../build/three.module.js';
import { MeshPhongMaterial } from '../build/three.module.js';
import { WebGLRenderer } from '../build/three.module.js';

// Crie a cena
var scene = new THREE.Scene();

// Crie a câmera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Crie uma luz
var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10);
scene.add(light);

// Crie o objeto 3D
var airplane = new THREE.Object3D();

// Adicione o objeto à cena
scene.add(airplane);

// Crie a geometria da asa
var wingGeometry = new THREE.BoxGeometry(5, 0.1, 1);

// Crie o mesh da asa
var wingMaterial = new THREE.MeshPhongMaterial({color: 0xCCCCCC});
var wingMesh = new THREE.Mesh(wingGeometry, wingMaterial);

// Posicione a asa
wingMesh.position.y = 0.5;

// Adicione a asa ao objeto do avião
airplane.add(wingMesh);

// Crie a geometria do corpo
var bodyGeometry = new THREE.BoxGeometry(2, 1, 1);

// Crie o mesh do corpo
var bodyMaterial = new THREE.MeshPhongMaterial({color: 0xCCCCCC});
var bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);

// Adicione o corpo ao objeto do avião
airplane.add(bodyMesh);

// Crie a geometria da hélice
var propellerGeometry = new THREE.BoxGeometry(0.2, 0.2, 3);

// Crie o mesh da hélice
var propellerMaterial = new THREE.MeshPhongMaterial({color: 0x333333});
var propellerMesh = new THREE.Mesh(propellerGeometry, propellerMaterial);

// Posicione a hélice
propellerMesh.position.z = -0.5;

// Adicione a hélice ao objeto do avião
airplane.add(propellerMesh);

// Crie o renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Renderize a cena
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
