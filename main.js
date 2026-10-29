import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';

// Crear la escena, cámara y renderizador (fondo negro por defecto)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometría compartida para los tres cubos
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Cubo verde (izquierda)
const cubeGreen = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
cubeGreen.position.x = -2;
scene.add(cubeGreen);

// Cubo azul (centro)
const cubeBlue = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
cubeBlue.position.x = 0;
scene.add(cubeBlue);

// Cubo rojo (derecha)
const cubeRed = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
cubeRed.position.x = 2;
scene.add(cubeRed);

// Luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Posicionar la cámara
camera.position.z = 5;

// Velocidades de rotación: verde lento, azul medio, rojo rápido
const velVerde = 0.005; // lento
const velAzul = 0.02;   // medio
const velRojo = 0.05;   // rápido

// Función de animación
function animate() {
    // Verde (lento): gira en X e Y
    cubeGreen.rotation.x += velVerde;
    cubeGreen.rotation.y += velVerde;

    // Azul (medio): gira en Z e Y
    cubeBlue.rotation.z += velAzul;
    cubeBlue.rotation.y += velAzul;

    // Rojo (rápido): gira en X e Y
    cubeRed.rotation.x += velRojo;
    cubeRed.rotation.y += velRojo;

    renderer.render(scene, camera);
}

// Iniciar la animación
renderer.setAnimationLoop(animate);

// Ajustar al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});