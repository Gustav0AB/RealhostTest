import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

let front,back,left, right;
const renderer = new THREE.WebGLRenderer();

export const Selection = (selected) => {
    switch (selected) {
        case 'Front':
            front.material = new THREE.MeshBasicMaterial({ color: 0x81a1d3 })
            back.material = new THREE.MeshBasicMaterial({ color: 0x515151 })
            left.material = new THREE.MeshBasicMaterial({ color: 0x515151 })
            right.material = new THREE.MeshBasicMaterial({ color: 0x515151 })
            break;
        case 'Back':
            back.material = new THREE.MeshBasicMaterial({ color: 0x81a1d3 })
            front.material = new THREE.MeshBasicMaterial({ color: 0x515151 })
            left.material = new THREE.MeshBasicMaterial({ color: 0x515151 })
            right.material = new THREE.MeshBasicMaterial({ color: 0x515151 })
            break;
        case 'Left':
            left.material = new THREE.MeshBasicMaterial({ color: 0x81a1d3 })
            front.material = new THREE.MeshBasicMaterial({ color: 0x515151 })
            back.material = new THREE.MeshBasicMaterial({ color: 0x515151 })
            right.material = new THREE.MeshBasicMaterial({ color: 0x515151 })
            break;
        case 'Right':
            right.material = new THREE.MeshBasicMaterial({ color: 0x81a1d3 })
            front.material = new THREE.MeshBasicMaterial({ color: 0x515151 })
            back.material = new THREE.MeshBasicMaterial({ color: 0x515151 })
            left.material = new THREE.MeshBasicMaterial({ color: 0x515151 })
            break;
        default:
          console.log(`Nothing was selected`);
    }
}

export const CleanUp = (mountRef) =>{
    const currentMount = mountRef.current;
    currentMount.removeChild(renderer.domElement)
}

export const MountScene = (mountRef) => {
    const   currentMount = mountRef.current, 
            scene = new THREE.Scene(),
            camera = new THREE.PerspectiveCamera( 15, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000),
            controls = new OrbitControls(camera, renderer.domElement);
        
    controls.update();
    camera.position.z = 15;
    camera.position.y = 0;
    camera.position.x = -15;

    scene.add(camera);

    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);

    currentMount.appendChild(renderer.domElement)

    const resize = () => {
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix()
    }

    window.addEventListener('resize',resize);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/Barn_Testing.glb',
        (gltf)=>{

            gltf.scene.position.x = -2
            gltf.scene.position.y = -2    
            back = gltf.scene.getObjectByName('LoftedBarn_6Wall_10x12_None_Wall1');
            right = gltf.scene.getObjectByName('LoftedBarn_6Wall_10x12_None_Wall2');
            front = gltf.scene.getObjectByName('LoftedBarn_6Wall_10x12_None_Wall3');
            left = gltf.scene.getObjectByName('LoftedBarn_6Wall_10x12_None_Wall4');
            scene.add(gltf.scene);
            
        },
        ()=>{},
        ()=>{}
    )
    
    const   lightFront = new THREE.DirectionalLight(0xffffff,1),
            lightBack = new THREE.DirectionalLight(0xffffff,1);

    lightFront.position.set(1,1,1);
    lightBack.position.set(-1,-1,-1);
    scene.add(lightFront);
    scene.add(lightBack);

    const animate = () => {
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
        controls.update();
    }

    animate()
    renderer.render(scene,camera)
}