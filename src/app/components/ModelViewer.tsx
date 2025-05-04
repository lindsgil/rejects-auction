'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

interface ModelViewerProps {
  modelType: string;
  modelUrl?: string; // Optional URL to a custom 3D model
  modelInfo?: {
    artist: string;
    medium: string;
  };
}

export default function ModelViewer({ modelType, modelUrl, modelInfo }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x1a1a1a);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Function to load custom model
    const loadCustomModel = async () => {
      if (!modelUrl) return;

      try {
        const loader = modelUrl.endsWith('.gltf') || modelUrl.endsWith('.glb') 
          ? new GLTFLoader() 
          : new OBJLoader();

        if (modelUrl.endsWith('.gltf') || modelUrl.endsWith('.glb')) {
          const gltf = await (loader as GLTFLoader).loadAsync(modelUrl);
          scene.add(gltf.scene);
          // Center and scale the model
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2 / maxDim;
          gltf.scene.scale.setScalar(scale);
          gltf.scene.position.sub(center.multiplyScalar(scale));
        } else {
          const obj = await (loader as OBJLoader).loadAsync(modelUrl);
          scene.add(obj);
          // Center and scale the model
          const box = new THREE.Box3().setFromObject(obj);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2 / maxDim;
          obj.scale.setScalar(scale);
          obj.position.sub(center.multiplyScalar(scale));
        }
      } catch (error) {
        console.error('Error loading model:', error);
        // Fall back to default shape
        createDefaultShape();
      }
    };

    // Function to create default shape
    const createDefaultShape = () => {
      let geometry: THREE.BufferGeometry;
      switch (modelType) {
        case '1': // Cube
          geometry = new THREE.BoxGeometry(2, 2, 2);
          break;
        case '2': // Sphere
          geometry = new THREE.SphereGeometry(1, 32, 32);
          break;
        case '3': // Pyramid
          geometry = new THREE.ConeGeometry(1, 2, 4);
          break;
        case '4': // Cylinder
          geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
          break;
        default:
          geometry = new THREE.BoxGeometry(2, 2, 2);
      }

      const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        specular: 0x111111,
        shininess: 30,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      meshRef.current = mesh;
    };

    // Load custom model if URL provided, otherwise create default shape
    if (modelUrl) {
      loadCustomModel();
    } else {
      createDefaultShape();
    }

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
      } else if (sceneRef.current) {
        // If we have a custom model, rotate the entire scene
        sceneRef.current.rotation.y += 0.01;
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current?.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (meshRef.current) {
        sceneRef.current?.remove(meshRef.current);
        meshRef.current.geometry.dispose();
        (meshRef.current.material as THREE.Material).dispose();
      }
      rendererRef.current?.dispose();
    };
  }, [modelType, modelUrl]);

  return (
    <div className="w-full h-full flex">
      <div 
        ref={containerRef} 
        className="w-2/3 h-full"
        style={{ 
          width: '66%', 
          height: '100%',
          minHeight: '300px'
        }}
      />
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-review text-white mb-4 text-center">Info</h2>
        <table className="w-full text-white font-prestige">
          <tbody>
            <tr className="border-b border-gray-700">
              <td className="py-2 pr-4"><strong>Artist: </strong></td>
              <td className="py-2">{modelInfo?.artist || 'Unknown'}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-2 pr-4"><strong>Medium: </strong></td>
              <td className="py-2">{modelInfo?.medium || 'Unknown'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 