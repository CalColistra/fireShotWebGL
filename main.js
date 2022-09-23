import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//-----------------------------------------------------------------------------------------------
const scene = new THREE.Scene();  //create scene
//create camera:
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
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
const moonTexture = new THREE.TextureLoader().load('assets/moon.jpg');
const sunTexture = new THREE.TextureLoader().load('assets/sunTexture.jpg');
const plutoTexture = new THREE.TextureLoader().load('assets/plutoTexture.jpg');
const normalTexture = new THREE.TextureLoader().load('assets/noramlTexture.jpg');
const milkyWayTexture = new THREE.TextureLoader().load('assets/milkyWay.jpg');
const earthTexture = new THREE.TextureLoader().load('assets/earthTexture.jpg');
const starTexture = new THREE.TextureLoader().load('assets/starTexture.jpg');
const jupiterTexture = new THREE.TextureLoader().load('assets/jupiterTexture.jpg');
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
Array(5500).fill().forEach(addStar)  //use addStar() to add 200 random stars
//-----------------------------------------------------------------------------------------------
//set up background
const spaceTexture = new THREE.TextureLoader().load('assets/space.jpg');
scene.background = spaceTexture;

//-------------------PLANETS---------------------------------------------------------
const sunSize = 5;
const earthSize = 3;
const plutoSize = 1;
const jupiterSize = 7;
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
  new THREE.SphereGeometry(earthSize, 32, 35),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture
  })
);
scene.add(earth);  //add earth

//jupiter:
const jupiter = new THREE.Mesh(  //jupiter set up
  new THREE.SphereGeometry(jupiterSize, 32, 35),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
    normalMap: normalTexture
  })
);
scene.add(jupiter);  //add earth

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
  new THREE.SphereGeometry(sunSize, 32, 35),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture
  })
);
scene.add(sun);  //add sun


//pluto:
const pluto = new THREE.Mesh(  //pluto set up
  new THREE.SphereGeometry(plutoSize, 32, 35),
  new THREE.MeshStandardMaterial({
    map: plutoTexture,
    normalMap: normalTexture
  })
);
scene.add(pluto);  //add pluto
//-----------------------------------------------------------------------------------------------
//vars needed for orbit:
var plutoDistance = 80;
var sunDistance = 5;
var earthDistance = 15;
var jupiterDistance = 156.12;
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