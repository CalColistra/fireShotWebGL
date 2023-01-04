import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//-----------------------------------------------------------------------------------------------

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1Akb7mNP_ius9EPgdCAyDCfyv9JV1fa8",
  authDomain: "space-solar-system.firebaseapp.com",
  projectId: "space-solar-system",
  storageBucket: "space-solar-system.appspot.com",
  messagingSenderId: "389909316268",
  appId: "1:389909316268:web:22c9b7eca5cc0e2729d509",
  measurementId: "G-TE6V9JC5CQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//-----------------------------------------------------------------------------------------------
const scene = new THREE.Scene();  //create scene
//create camera:
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
//-----------------------------------------------------------------------------------------------
//create renderer for <canvas> in index.html
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
//set up canvas size:
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(150);  //set camera Z position
renderer.render(scene, camera);  //draw
//-----------------------------------------------------------------------------------------------
//set up textures:
const moonTexture = new THREE.TextureLoader().load('/moon.jpg');
const sunTexture = new THREE.TextureLoader().load('/sunTexture.jpg');
const plutoTexture = new THREE.TextureLoader().load('/plutoTexture.jpg');
const normalTexture = new THREE.TextureLoader().load('/noramlTexture.jpg');
const milkyWayTexture = new THREE.TextureLoader().load('/milkyWay.jpg');
const earthTexture = new THREE.TextureLoader().load('/earthTexture.jpg');
const starTexture = new THREE.TextureLoader().load('/starTexture.jpg');
const jupiterTexture = new THREE.TextureLoader().load('/jupiterTexture.jpg');
const marsTexture = new THREE.TextureLoader().load('/marsTexture.jpg');
const saturnTexture = new THREE.TextureLoader().load('/saturnTexture.jpg');
//-----------------------------------------------------------------------------------------------
/*
//make ring (torus):
var geometry = new THREE.TorusGeometry(10, 3,16, 100);
var material = new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
const torus = new THREE.Mesh( geometry, material);
*/
//scene.add(torus)  //add rin to scene

//-----------------------------------------------------------------------------------------------
//set up lights:
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20) //focus light
scene.add(pointLight)  //add to scene

const ambientLight = new THREE.AmbientLight(0xffffff);  //ambient/flood light
scene.add(pointLight, ambientLight)  //add another light to scene

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);  //grid
//scene.add(gridHelper)  //add to scene
//-----------------------------------------------------------------------------------------------
const controls = new OrbitControls(camera, renderer.domElement);  //set up mouse controls
//-----------------------------------------------------------------------------------------------
function addStar() {  //function to add a star at a random position to the scene
  var geometry = new THREE.SphereGeometry(THREE.MathUtils.randFloatSpread(1/3), 24, 24);
  var material = new THREE.MeshStandardMaterial({
    map: starTexture,
    normalMap: normalTexture
  });
  var star = new THREE.Mesh(geometry,material);
  
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300) );
  star.position.set(x,y,z);
  scene.add(star)
}
Array(250).fill().forEach(addStar)  //use addStar() to add 5500 random stars
//-----------------------------------------------------------------------------------------------
//set up background
const spaceTexture = new THREE.TextureLoader().load('/space.jpg');
scene.background = spaceTexture;

//-------------------PLANETS---------------------------------------------------------
const sunSize = 5;
const earthSize = 5;
const plutoSize = 7;
const jupiterSize = 7;
const marsSize = 5;
const saturnSize = 5;
const heightSegments = 27;
const widthSegments = 23;
//--------------------
const milkyWay = new THREE.Mesh(  //milkyWay set up
  new THREE.SphereGeometry(.1, 32  ),
  new THREE.MeshStandardMaterial({
    Map: milkyWayTexture,
    side: THREE.DoubleSide
  })
);
scene.add(milkyWay)

//earth:
const earth = new THREE.Mesh(  //earth set up
  new THREE.SphereGeometry(earthSize, widthSegments, heightSegments),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture
  })
);
scene.add(earth);  //add earth

//saturn:
const saturn = new THREE.Mesh(  //saturn set up
  new THREE.SphereGeometry(saturnSize, widthSegments, heightSegments),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
    normalMap: normalTexture
  })
);
scene.add(saturn);  //add saturn

//jupiter:
const jupiter = new THREE.Mesh(  //jupiter set up
  new THREE.SphereGeometry(jupiterSize, widthSegments, heightSegments),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
    normalMap: normalTexture
  })
);
scene.add(jupiter);  //add jupiter

//mars:
const mars = new THREE.Mesh(  //mars set up
  new THREE.SphereGeometry(marsSize, widthSegments, heightSegments),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture
  })
);
scene.add(mars);  //add mars

/*
const moon = new THREE.Mesh(  //moon set up
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);
scene.add(moon);  //add moon
*/

//sun:
const sun = new THREE.Mesh(  //sun set up
  new THREE.SphereGeometry(sunSize, widthSegments, heightSegments),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture
  })
);
scene.add(sun);  //add sun


//pluto:
const pluto = new THREE.Mesh(  //pluto set up
  new THREE.SphereGeometry(plutoSize, widthSegments, heightSegments),
  new THREE.MeshStandardMaterial({
    map: plutoTexture,
    normalMap: normalTexture
  })
);
scene.add(pluto);  //add pluto
//-----------------------------------------------------------------------------------------------
//vars needed for orbit: 
//scale distance formula => (actual distance from sun) / .31
var plutoDistance = 1183.87;
var sunDistance = 5;
var earthDistance = 15;
var jupiterDistance = 156.12;
var marsDistance = 45.806;
var saturnDistance = 286.774;
//-----------------------------
var theta = 0;
var dTheta = 2 * Math.PI / 1000;
const earthYear = 2 * Math.PI * (1/60) * (1/60);

function movePlanets() {
  theta += dTheta;
  //sun:
  sun.rotation.y += earthYear*2;
  sun.position.x = sunDistance * Math.cos(theta);
  sun.position.z = sunDistance * Math.sin(theta);
  sun.position.y = sunDistance * Math.sin(theta);
  //pluto:
  pluto.rotation.y += earthYear*4;
  pluto.position.x = plutoDistance * Math.cos(theta);
  pluto.position.z = plutoDistance * Math.sin(theta);
  pluto.position.y = (plutoDistance * Math.sin(theta)) / 2;
  //earth:
  earth.rotation.y += earthYear*4;
  earth.position.x = earthDistance * Math.cos(theta);
  earth.position.z = earthDistance * Math.sin(theta);
  earth.position.y = (earthDistance * Math.sin(theta)) / 2;
  //jupiter:
  jupiter.rotation.y += earthYear*4;
  jupiter.position.x = jupiterDistance * Math.cos(theta);
  jupiter.position.z = jupiterDistance * Math.sin(theta);
  jupiter.position.y = (jupiterDistance * Math.sin(theta)) / 2;
  //mars:
  mars.rotation.y += earthYear*4;
  mars.position.x = marsDistance * Math.cos(theta);
  mars.position.z = marsDistance * Math.sin(theta);
  mars.position.y = (marsDistance * Math.sin(theta)) / 2;
  //saturn:
  saturn.rotation.y += earthYear*4;
  saturn.position.x = saturnDistance * Math.cos(theta);
  saturn.position.z = saturnDistance * Math.sin(theta);
  saturn.position.y = (saturnDistance * Math.sin(theta)) / 2;
}
//-----------------------------------------------------------------------------------------------
function animate() {  //infinite looping function to refresh 60fps
  requestAnimationFrame(animate);  
  movePlanets();
  controls.update();
  renderer.render(scene, camera);
}
//-----------------------------------------------------------------------------------------------
animate();