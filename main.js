import './style.css'

import * as THREE from 'three';

import {OrbitControls} from  'three/examples/jsm/controls/OrbitControls';


//camera, perspective, scene setting up
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);
//Donut shape
const geometry = new THREE.TorusGeometry(12, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({color:0xF7, wireframe: true});
const torus = new THREE.Mesh(geometry, material);

//adding the donut to the scene
scene.add(torus)

//Light source
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50);
//Grids for both the webpage and light 
//scene.add(lightHelper, gridHelper)

//OrbitControl to move around the page with the mouse
const controls = new OrbitControls(camera, renderer.domElement);

//Adding random generated stars

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff })
  const star = new THREE.Mesh(geometry,material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

//Adding the space Background
const spaceTexture = new THREE.TextureLoader().load('Spacebg.jpg');
scene.background = spaceTexture;


//Re-render to see the donut
renderer.render (scene, camera);

//Auto render the scene and donut 
function animate(){
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.11;

  controls.update()


  renderer.render(scene, camera);
}

animate()


//My face

const javiTexture = new THREE.TextureLoader().load('Selfie.jpg');

const javi = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial ({map: javiTexture})
  
);

scene.add(javi);

//Adding Jupiter

const jupiterTexture = new THREE.TextureLoader().load('Jupiter.jpg');
const surfaceTexture = new THREE.TextureLoader().load('Surface.jpg');


const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
    normalMap: surfaceTexture 
  })
);

scene.add(jupiter)

jupiter.position.z = 45;
jupiter.position.setX(-10);


//Adding Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');



const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: surfaceTexture 
  })
);

scene.add(moon)

moon.position.y = 20;
moon.position.z = 15;
moon.position.setX(-22);

//Adding earth

const earthTexture = new THREE.TextureLoader().load('earth.jpg');



const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: surfaceTexture 
  })
);

scene.add(earth)

earth.position.y = 2;
earth.position.z = 1;
earth.position.setX(35);

//Move the camera with scroll 
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  jupiter.rotation.y += 0.015;



  moon.rotation.y += 0.015;


  earth.rotation.y += 0.015;


  javi.rotation.y += 0.01;
  javi.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002

}

document.body.onscroll = moveCamera