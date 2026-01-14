import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- A. CONFIGURACIÓN BÁSICA ---
//Escene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ff88); // Color de fondo gris oscuro

//1. Camara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5); // Movemos la cámara un poco atrás y arriba

//2. Rende
const renderer = new THREE.WebGLRenderer({ antialias: true }); // Antialias para que se vea suave
renderer.setSize(window.innerWidth, window.innerHeight);
//añadimos este nuevo elemento al DOM
document.body.appendChild(renderer.domElement);

// --- B. LUCES  ---
// Luz ambiental (ilumina todo suavemente)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Luz direccional (como el sol)
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight); 

// --- C. OBJETOS ---

const soldier = new THREE.Group();
const material = new THREE.MeshStandardMaterial({ color: 0xff2522 });
const skinMaterial = new THREE.MeshStandardMaterial({
  color: 0xffd1b3   // لون بشرة
});


// الرأس
const head = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 32, 32),
  skinMaterial
);
head.position.y = 2.3;
soldier.add(head);

// الجسم
const body = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1.5, 0.6),
  material
);
body.position.y = 1.2;
soldier.add(body);

// الرجلين
const legGeo = new THREE.CylinderGeometry(0.2, 0.2, 1);
const leftLeg = new THREE.Mesh(legGeo, material);
leftLeg.position.set(-0.3, 0.3, 0);
soldier.add(leftLeg);

const rightLeg = leftLeg.clone();
rightLeg.position.x = 0.3;
soldier.add(rightLeg);
 
leftLeg.geometry.translate(0, 0.55, 0);
rightLeg.geometry.translate(0, -0.5, 0);

//اليدين

const armGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.1, 16);

// اليد اليسرى
const leftArm = new THREE.Mesh(armGeo, material);
leftArm.geometry.translate(0, 0.55, 0); 
leftArm.position.set(-0.63, 1.8, 0);
leftArm.rotation.z = Math.PI / 1;
soldier.add(leftArm);


// اليد اليمنى (نسخة من اليسرى)
const rightArm = leftArm.clone();
rightArm.position.x = 0.63;
soldier.add(rightArm);

// 🎩 القبعة
const hatGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.8, 32);
const hatMat = new THREE.MeshStandardMaterial({ color: 0x3333ff });
const hat = new THREE.Mesh(hatGeo, hatMat);

// نضع القبعة فوق الرأس
hat.position.y = 2.8;

soldier.add(hat);



// السلاح 
const gunMaterial = new THREE.MeshStandardMaterial({
  color: 0x000000,   // أسود
  roughness: 0.8,
  metalness: 0.2
});

const gunGeometry = new THREE.CylinderGeometry(0.08, 0.08, 2.2, 16);
const gun = new THREE.Mesh(gunGeometry, gunMaterial);

// 🔧 تموضع السلاح
gun.position.set(-0.2, 1.5, -0.4); // يسار + خلف + وسط الظهر
gun.rotation.z = Math.PI / -1.1;    // ميلان ليبدو كبندقية
gun.rotation.y = Math.PI / 8;      // ميل خفيف للخارج

soldier.add(gun); 


// إضافة الجندي للمشهد
scene.add(soldier);

//  الأقدام
const footMaterial = hatMat; //

// القدم اليسرى
const leftFoot = new THREE.Mesh(
  new THREE.BoxGeometry(0.4, 0.3, 0.9), 
  footMaterial
);
leftFoot.position.set(0 , -0.6, 0.2); 
leftLeg.add(leftFoot);
// القدم اليمنى
const rightFoot = leftFoot.clone();
rightFoot.position.x = 0;
rightLeg.add(rightFoot);

// --- D. CONTROLES (La navegación) ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Añade inercia al movimiento (más suave)


// --- E. ANIMACIÓN (Game Loop) ---
let walkTime = 0;

function animate() {
  requestAnimationFrame(animate);

  walkTime += 0.05; // سرعة المشي

  // 🦵 الأرجل (عكس بعض)
  leftLeg.rotation.x = Math.sin(walkTime) * 0.6;
  rightLeg.rotation.x = -Math.sin(walkTime) * 0.6;

  // 💪 اليدين (عكس الأرجل)
  leftArm.rotation.x = -Math.sin(walkTime) * 0.6;
  rightArm.rotation.x = Math.sin(walkTime) * 0.6;

  controls.update();
  renderer.render(scene, camera);
}

animate();

// Ajustar si cambian el tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
