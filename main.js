import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);  //draw

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('noramlTexture.jpg');

const geometry = new THREE.TorusGeometry(10, 3,16, 100);
const material = new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
const torus = new THREE.Mesh( geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20) //focus light
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff);  //ambient/flood light
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {  //function to add a star at a random position to the scene
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
  const star = new THREE.Mesh(geometry,material);
  
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );
  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)  //use addStar() to add 200 random stars

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon);

function rotateMoon() {
  moon.rotation.x += 0.01;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.01;
}



function animate() {  //loop function for frames to repeat
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  rotateMoon();

  controls.update();

  renderer.render(scene, camera);
}

animate();