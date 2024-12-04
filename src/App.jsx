import { useEffect } from 'react'
import './App.css'
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

function App() {

  useEffect(() => {
    const scene = new THREE.Scene();

    //creating mesh
    const cubeGeometry = new THREE.BoxGeometry(1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({color: "green"});
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cubeMesh);

    //adding light to the scene
    const ambientLight = new THREE.AmbientLight("white", 1);
    scene.add(ambientLight)

    //adding axeshelper to the scene
    const axisHelper = new THREE.AxesHelper(2);
    scene.add(axisHelper);

    //adding camera to the scene
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 2, 5);
    camera.aspect = window.innerWidth / window.innerHeight;
    scene.add(camera);

    cubeMaterial.fog = true;

    scene.background = new THREE.Color("white");

    const fog = new THREE.Fog(0xffffff, 0, 500); 
    scene.fog = fog;

    const grideHelper = new THREE.GridHelper(100, 100)
    scene.add(grideHelper);

    //renderer setup
    const canvas = document.querySelector("#threejs");
    const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    renderer.render(scene, camera);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //setting up controls
    // const controls = new OrbitControls(camera, canvas);
    // controls.enableDamping = true;
    // controls.autoRotate = true;

    const controls = new PointerLockControls(camera, canvas);

    const button = document.getElementById("btn");
    button.onclick = () => {
      controls.lock();
    }



    let xdir = 0, zdir = 0;


    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 87:
          console.log("w clicked")
          zdir = 1;
          break;
        case 83:
          zdir = -1;
          break;
        case 65:
          xdir = -1;
          break;
        case 68:
          xdir = 1;
          break;
      }
    })
    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case 87:
          zdir = 0;
          break;
        case 83:
          zdir = 0;
          break;
        case 65:
          xdir = 0;
          break;
        case 68:
          xdir = 0;
          break;
      }
    })


    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    })


    const clock = new THREE.Clock();
    const renderloop = () => {
      renderer.render(scene, camera);
      const delta = clock.getDelta();
      if (controls.isLocked = true) {
        const xdis = delta * xdir * 10;
        const zdis = delta * zdir * 10;
        controls.moveRight(xdis);
        controls.moveForward(zdis);
      };
      controls.update();
      window.requestAnimationFrame(renderloop);
    }
    renderloop();

  }, [])
  return (
      <div>
        <button className='border-2 border-blue-800' id='btn'>Play</button>
        <canvas id='threejs'></canvas>
      </div>
  )
}

export default App
