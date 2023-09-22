import celestialBody from "./CelestialBody.js";
import moon from "./Moon.js";
import * as THREE from "../src/Three.js";

class planet extends celestialBody {
  _SUN_RADIUS = 6.96;

  _MOONS = {};

  _ClOUDS = null;

  _RING = null;

  _PLANET_GROUP = null;

  constructor(data) {
    super();

    this._NAME = data.name;

    this._ROTATION_FACTOR = data.rotationFactor;
    this._REVOLUTION_FACTOR = data.revolutionFactor;
    this._AXIS_TILT_FACTOR = data.axisTiltFactor;

    this._initialisePlanet(data);

    this._tilt();
  }

  _initialisePlanet(data) {
    const planetGeomatry = new THREE.SphereGeometry(data.radius, 64, 64);
    const planetTexture = new THREE.TextureLoader().load(data.texture);
    const planetTextureBump = data.textureBump
      ? new THREE.TextureLoader().load(data.textureBump)
      : null;
    const planetMaterial = new THREE.MeshLambertMaterial({
      map: planetTexture,
      bumpMap: planetTextureBump,
    });

    planetMaterial.bumpScale = 0.1;

    const planet = new THREE.Mesh(planetGeomatry, planetMaterial);

    this._ANGLE = Math.random() * Math.PI * 2;
    this._DISTANCE_FROM_CENTER = data.distanceFromSun + this._SUN_RADIUS;

    planet.position.x = Math.sin(this._ANGLE) * this._DISTANCE_FROM_CENTER;
    planet.position.z = Math.cos(this._ANGLE) * this._DISTANCE_FROM_CENTER;

    if (data.hasClouds) {
      this._CLOUDS = this._getClouds(data);
      planet.add(this._CLOUDS);
    }

    if (data.ring) {
      this._RING = this._getRing(data.ring);
      planet.add(this._RING);
    }

    planet.castShadow = true;
    planet.receiveShadow = true;

    if (data.moons) {
      data.moons.forEach((moonData) => {
        const newMoon = new moon(moonData, data.radius);
        this._MOONS[moonData.name] = newMoon;
        planet.add(newMoon.getCelestialBody());
      });
    }

    this._body = planet;
  }

  setOrbitPath(data) {
    const orbitInnerRadius = this._body.position.distanceTo(
      new THREE.Vector3(0, 0, 0)
    );
    const orbitPath = new THREE.RingGeometry(
      orbitInnerRadius,
      orbitInnerRadius + 0.005,
      64,
      64
    );
    const orbitPathMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const orbitPathMesh = new THREE.Mesh(orbitPath, orbitPathMaterial);
    orbitPathMesh.rotation.x = Math.PI / 2; // to make the ring horizontal

    this._body.parent.add(orbitPathMesh);
  }

  _getClouds(data) {
    const cloudsGeometry = new THREE.SphereGeometry(
      data.radius + 0.001,
      64,
      64
    );
    const cloudsTexture = new THREE.TextureLoader().load(data.cloudsTexture);
    const cloudsMaterial = new THREE.MeshLambertMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.5,
    });

    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);

    return clouds;
  }

  _getRing(data) {
    const ringGeometry = this._getRingGeomatry(data);
    const ringTexture = this._getRingTexture(data);

    const ring = new THREE.Mesh(ringGeometry, ringTexture);

    if (data.horizontalRotation) {
      ring.rotation.x = Math.PI / 2; // to make the ring horizontal
    }

    ring.position.set(0, 0, 0);

    return ring;
  }

  _getRingGeomatry(data) {
    const ringGeometry = new THREE.RingGeometry(
      data.innerRadius,
      data.outerRadius,
      data.thetaSegments,
      data.phiSegments
    );

    const uvMapping = ringGeometry.attributes.uv;
    const position = ringGeometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < uvMapping.count; i++) {
      vertex.fromBufferAttribute(position, i);

      // Calculate the angle (theta) of the vertex
      const theta = Math.atan2(vertex.y, vertex.x);

      // Normalize the angle to the range [0, 1] to create a continuous texture wrap
      const u = (theta + Math.PI) / (2 * Math.PI);

      // Normalize the radius to the range [0, 1] to map the texture along the ring
      const r = vertex.length();
      const v = (r - data.innerRadius) / (data.outerRadius - data.innerRadius);

      uvMapping.setXY(i, v, u);
    }

    uvMapping.needsUpdate = true;

    return ringGeometry;
  }

  _getRingTexture(data) {
    const map = new THREE.TextureLoader().load(data.texture);
    map.minFilter = THREE.NearestFilter;

    const colorMap = new THREE.TextureLoader().load(data.colorMap);

    colorMap.minFilter = THREE.NearestFilter;

    return new THREE.MeshLambertMaterial({
      map: map,
      alphaMap: colorMap,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
    });
  }

  revolve() {
    this._ANGLE += this._EARTH_DAY * this._REVOLUTION_FACTOR;

    this._body.position.x = Math.sin(this._ANGLE) * this._DISTANCE_FROM_CENTER;
    this._body.position.z = Math.cos(this._ANGLE) * this._DISTANCE_FROM_CENTER;

    Object.keys(this._MOONS).forEach((key) => {
      this._MOONS[key].revolve();
    });
  }

  getMoons() {
    return this._MOONS;
  }
}

export default planet;
