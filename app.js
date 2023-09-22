import * as THREE from "three";

import skybox from "./components/skybox.js";
import sun from "./components/sun.js";
import planet from "./components/Planet.js";
import asteroidBelt from "./components/AsteroidBelt.js";
import AsteroidFactory from "./components/AsteroidFactory.js";

import {
  getCelestialBodyData,
  getControllerConfig,
  getAsteroidBeltData,
  getAsteroidFactoryData,
} from "./components/config.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

class App {
  _renderer = null;
  _scene = null;
  _camera = null;
  _controls = null;
  _pointLight = null;

  _bloomComposer = null;

  _celestialBodies = {};

  _activeCelestialBody = null;

  _controllerConfig = getControllerConfig();

  _asteroidFactory = null;

  _asteroidCountDown = 0;

  _comet = null;

  constructor() {
    this._setScene();
    this._setCamera();
    this._setRenderer();
    this._setControls();
    this._setAmbientLight();
    this._setPointLight();

    this._asteroidFactory = new AsteroidFactory(getAsteroidFactoryData());

    this._init();
  }

  _init() {
    this._scene.add(new skybox().getSkybox());

    // add sun
    this._celestialBodies.sun = new sun();
    this._scene.add(this._celestialBodies.sun.getCelestialBody());

    this._setCelestialBodies();

    this._activeCelestialBody = this._celestialBodies.sun;
    this._controls.minDistance = 10;
    this._controls.maxDistance = 250;

    const asteroidBeltData = getAsteroidBeltData();
    const asteroidBeltObject = new asteroidBelt(asteroidBeltData);
    this._celestialBodies.sun
      .getCelestialBody()
      .add(asteroidBeltObject.getAsteroidBelt());

    this._activeCelestialBody = this._celestialBodies.sun;

    this._getSateillite();

    // this._setComet();

    this._setBtns();

    window.addEventListener("resize", () => {
      this._camera.aspect = window.innerWidth / window.innerHeight;
      this._camera.updateProjectionMatrix();
      this._renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  run() {
    this._animate();
  }

  _setBtns() {
    const btnContainer = document.createElement("div");
    btnContainer.id = "btn-container";

    Object.keys(this._celestialBodies).forEach((key) => {
      const btn = document.createElement("button");
      btn.innerHTML = key.toUpperCase();
      btn.addEventListener("click", () => {
        const moonBtnContainer = document.getElementById(
          "btn-container-bottom"
        );
        if (moonBtnContainer) {
          moonBtnContainer.remove();
        }

        this._activeCelestialBody = this._celestialBodies[key];
        const position = this._activeCelestialBody.getCelestialBody().position;
        this._controls.target.copy(position);
        this._controls.norotate = true;
        this._controls.minDistance = this._controllerConfig[key].minDistance;
        this._controls.maxDistance = this._controllerConfig[key].maxDistance;

        if (key !== "sun") {
          const moonBtnContainer = document.createElement("div");
          moonBtnContainer.id = "btn-container-bottom";
          const moons = this._activeCelestialBody.getMoons();
          Object.keys(moons).forEach((moonKey) => {
            const moonBtn = document.createElement("button");
            moonBtn.innerHTML = moonKey.toUpperCase();
            moonBtnContainer.appendChild(moonBtn);
          });
          document.body.appendChild(moonBtnContainer);
        }
      });
      btnContainer.appendChild(btn);
    });

    if (this._comet) {
      const btn = document.createElement("button");
      btn.innerHTML = "COMET";
      btn.addEventListener("click", () => {
        this._activeCelestialBody = this._comet;
        const position = this._activeCelestialBody.position;
        this._controls.target.copy(position);
        this._controls.norotate = true;
        this._controls.minDistance = 1;
        this._controls.maxDistance = 10;
      });
      btnContainer.appendChild(btn);
    }

    document.body.appendChild(btnContainer);
  }

  _animate() {
    requestAnimationFrame(this._animate.bind(this));

    this._controls.target.copy(
      this._activeCelestialBody.getCelestialBody().position
    );

    this._controls.update();

    this._rotateAndRevolveCelestialBodies();

    this._asteroidFactory.animateAsteroids();

    if (this._asteroidCountDown == 0) {
      this._celestialBodies.sun
        .getCelestialBody()
        .add(this._asteroidFactory.getAsteroid());
      console.log("asteroid added");
    }

    this._asteroidCountDown = (this._asteroidCountDown + 1) % 100;

    this._renderer.render(this._scene, this._camera);
  }

  _rotateAndRevolveCelestialBodies() {
    Object.keys(this._celestialBodies).forEach((key) => {
      this._celestialBodies[key].rotate();
      this._celestialBodies[key].revolve();
    });
  }

  _setScene() {
    this._scene = new THREE.Scene();
  }

  _setCamera() {
    const camera = new THREE.PerspectiveCamera(
      75, // field of view
      window.innerWidth / window.innerHeight, // aspect ratio
      0.1, // near clipping plane
      1000 // far clipping plane
    );

    camera.position.z = 30;
    camera.lookAt(0, 0, 0);

    this._camera = camera;
  }

  _setRenderer() {
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // to avoid pixelation on high resolution screens
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this._renderer.domElement);
  }

  _setControls() {
    const controls = new OrbitControls(this._camera, this._renderer.domElement);
    controls.enableDamping = true; // smooth camera movement
    controls.dampingFactor = 0.05; // smooth camera movement
    controls.maxDistance = 250; // max distance from the center of the scene
    controls.minDistance = 2; // min distance from the center of the scene
    controls.panSpeed = 0.01; // speed of camera movement with keyboard
    this._controls = controls;
  }

  _setAmbientLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    ambientLight.position.set(0, 0, 0);
    this._scene.add(ambientLight);
  }

  _setPointLight() {
    const pointLight = new THREE.PointLight(0xffffff, 0.8, 1000);
    pointLight.position.set(0, 0, 0);
    this._pointLight = pointLight;
    this._scene.add(pointLight);
  }

  _getControls() {
    return this._controls;
  }

  _getRenderer() {
    return this._renderer;
  }

  _getScene() {
    return this._scene;
  }

  _getCamera() {
    return this._camera;
  }

  _setCelestialBodies() {
    const celestialBodyData = getCelestialBodyData();

    celestialBodyData.forEach((data) => {
      this._celestialBodies[data.name] = new planet(data);

      this._scene.add(this._celestialBodies[data.name].getCelestialBody());

      // this._celestialBodies[data.name].setOrbitPath(data);
    });
  }

  _getSateillite() {
    const objLoader = new OBJLoader();

    // load first satellite
    objLoader.load("./components/models/satellite/satellite.obj", (obj) => {
      obj.scale.set(0.00005, 0.00005, 0.00005);
      obj.position.set(0.08, 0.001, 0);
      obj.rotation.set(0, Math.PI / 2, 0);
      obj.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shininess: 100,
          });
        }
      });
      this._celestialBodies.earth.getCelestialBody().add(obj);
    });

    // load second satellite
    objLoader.load("./components/models/satellite/satellite.obj", (obj) => {
      obj.scale.set(0.00005, 0.00005, 0.00005);
      obj.position.set(-0.1, 0.005, 0);
      obj.rotation.set(0, Math.PI / 2, 0);
      obj.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shininess: 100,
          });
        }
      });
      this._celestialBodies.earth.getCelestialBody().add(obj);
    });
  }
}

export default App;
