import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ElementCreator from './ElementCreator';

type vector = number[];
type triangle = vector[];
type coords = triangle[];

class Field {
  parent: HTMLDivElement;
  coords: coords;
  constructor(canvas: HTMLDivElement, coords: coords) {
    this.parent = canvas;
    this.coords = coords;
  }

  public init() {
    const sizes = {
      width: this.parent.clientWidth,
      height: this.parent.clientHeight,
    };

    const scene = new THREE.Scene();

    const canvas = document.createElement('canvas');
    canvas.classList.add('canvas');

    this.parent.firstElementChild && Array.from(this.parent.children).forEach((child) => child.remove());
    this.parent.append(canvas);

    const axesHelper = new THREE.AxesHelper(300);
    scene.add(axesHelper);

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.set(25, 25, 100);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const material = new THREE.MeshBasicMaterial({ color: 'aqua', wireframe: true });

    const cone = this.createCone(material);

    scene.add(cone);

    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(sizes.width, sizes.height);

    renderer.render(scene, camera);

    this.createMaterialSettings(material);

    const animate = () => {
      controls.update();
      renderer.setSize(this.parent.clientWidth, this.parent.clientHeight);
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();
  }

  private createCone(material: THREE.MeshBasicMaterial) {
    const geometry = new THREE.BufferGeometry();
    const bufer: number[] = this.coords.flat().flat();
    const vertices = new Float32Array(bufer);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  private createMaterialSettings(material: THREE.MeshBasicMaterial) {
    const settingBlock = new ElementCreator({ tag: 'div', nameClass: 'main_settings' }).getElement;
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'wireframe';

    const label = document.createElement('label');
    label.htmlFor = 'wireframe';
    label.innerText = 'wireframe';

    input.addEventListener('change', () => {
      material.wireframe = !material.wireframe;
    });

    settingBlock.append(input, label);

    this.parent.append(settingBlock);
  }
}

export default Field;
