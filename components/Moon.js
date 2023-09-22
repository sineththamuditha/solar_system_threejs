import celestialBody from "./CelestialBody.js";
import * as THREE from "three";

class moon extends celestialBody {
  _MOTHER_PLANET_RADIUS = null;

  _VERTICLE_POSITION_ANGLE = null;

  constructor(data, motherPlanetRadius) {
    super();

    this._NAME = data.name;

    this._MOTHER_PLANET_RADIUS = motherPlanetRadius;

    this._ROTATION_FACTOR = data.rotationFactor;
    this._REVOLUTION_FACTOR = data.revolutionFactor;
    this._AXIS_TILT_FACTOR = data.axisTiltFactor;

    this._initialiseMoon(data);

    this._tilt();
  }

  _initialiseMoon(data, motherPlanetRadius) {
    const moonGeomatry = new THREE.SphereGeometry(data.radius, 64, 64);
    const moonTexture = new THREE.TextureLoader().load(data.texture);
    const moonTextureBump = data.textureBump
      ? new THREE.TextureLoader().load(data.textureBump)
      : null;
    const moonMaterial = new THREE.MeshLambertMaterial({
      map: moonTexture,
      bumpMap: moonTextureBump,
    });

    moonMaterial.bumpScale = 0.1;

    const moon = new THREE.Mesh(moonGeomatry, moonMaterial);

    this._ANGLE = Math.random() * Math.PI * 2;
    this._DISTANCE_FROM_CENTER =
      data.distanceFromMotherPlanet + this._MOTHER_PLANET_RADIUS;

    this._VERTICLE_POSITION_ANGLE = Math.random() * Math.PI * 2;

    moon.position.x = Math.sin(this._ANGLE) * this._DISTANCE_FROM_CENTER;
    moon.position.z = Math.cos(this._ANGLE) * this._DISTANCE_FROM_CENTER;
    moon.position.y =
      Math.sin(this._VERTICLE_POSITION_ANGLE) * this._DISTANCE_FROM_CENTER;

    moon.castShadow = true;
    moon.receiveShadow = true;

    this._body = moon;
  }

  rotate() {
    this._body.rotation.y += this._EARTH_DAY * this._ROTATION_FACTOR;
  }

  revolve() {
    this._ANGLE += this._EARTH_DAY * this._REVOLUTION_FACTOR;

    this._VERTICLE_POSITION_ANGLE += 0.005;

    this._body.position.x = Math.sin(this._ANGLE) * this._DISTANCE_FROM_CENTER;
    this._body.position.z = Math.cos(this._ANGLE) * this._DISTANCE_FROM_CENTER;
    this._body.position.y =
      Math.sin(this._VERTICLE_POSITION_ANGLE) * this._DISTANCE_FROM_CENTER;

    this._body.rotation.y += this._EARTH_DAY * this._ROTATION_FACTOR;
  }
}

export default moon;
