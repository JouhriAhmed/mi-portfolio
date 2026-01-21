import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- A. CONFIGURACIÓN BÁSICA ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // أزرق سماوي

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// --- LUCES ---
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(5, 8, 5);
scene.add(dirLight);

// --- DESK (مكتب بسيط) ---
const desk = new THREE.Group();

// خامة خشبية بسيطة
const woodMat = new THREE.MeshStandardMaterial({
  color: 0x8b5a2b,  // بني خشبي
  roughness: 0.7,
  metalness: 0.0
});

// سطح المكتب
const topGeo = new THREE.BoxGeometry(4, 0.2, 2);
const top = new THREE.Mesh(topGeo, woodMat);
top.position.set(0, 1.0, 0); // ارتفاع سطح المكتب
desk.add(top);

// أرجل المكتب
const legGeo = new THREE.BoxGeometry(0.2, 1.0, 0.2);

const leg1 = new THREE.Mesh(legGeo, woodMat);
leg1.position.set(-1.8, 0.5, -0.8);
desk.add(leg1);

const leg2 = leg1.clone();
leg2.position.set(1.8, 0.5, -0.8);
desk.add(leg2);

const leg3 = leg1.clone();
leg3.position.set(-1.8, 0.5, 0.8);
desk.add(leg3);

const leg4 = leg1.clone();
leg4.position.set(1.8, 0.5, 0.8);
desk.add(leg4);

scene.add(desk);

// --- CARGAR MODELO GLB (Camera فوق المكتب) ---
const loader = new GLTFLoader();
loader.load(
  './models/Camera.glb',
  (gltf) => {
    const model = gltf.scene;
    // تحميل موديل العطر perfum
   loader.load(
  './models/perfum.glb',
  (gltf) => {
    const perfum = gltf.scene;

    // 📏 الحجم
    perfum.scale.set(0.2, 0.2, 0.2);

    // 📍 المكان (فوق المكتب مثلاً)
    perfum.position.set(-1.6, 1.22, 0);

    scene.add(perfum);
  },

  undefined,
  (error) => {
    console.error('Error loading perfum:', error);
  }
);


    // مكان الكاميرا فوق سطح المكتب
    model.position.set(1, 1.36, 0); // y أعلى من سطح المكتب (السطح y=1.0 وسمكه 0.2)
    model.scale.set(0.2, 0.2, 0.2);

    scene.add(model);
  },
  undefined,
  (error) => {
    console.error('Error loading model:', error);
  }
);

// --- ANIMATION LOOP ---
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
