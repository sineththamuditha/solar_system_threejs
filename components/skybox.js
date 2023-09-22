import * as THREE from "../src/Three.js";

class skybox {
  getSkybox() {
    const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
    const skyboxMaterials = [
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(
          "./components/textures/skybox/1.png"
        ),
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(
          "./components/textures/skybox/2.png"
        ),
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(
          "./components/textures/skybox/3.png"
        ),
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(
          "./components/textures/skybox/4.png"
        ),
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(
          "./components/textures/skybox/5.png"
        ),
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(
          "./components/textures/skybox/6.png"
        ),
        side: THREE.BackSide,
      }),
    ];

    return new THREE.Mesh(skyboxGeometry, skyboxMaterials);
  }
}

export default skybox;
