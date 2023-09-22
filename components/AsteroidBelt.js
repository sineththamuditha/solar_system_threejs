import * as THREE from "../src/Three.js";

class asteroidBelt {
  _ASTEROID_COUNT = null;
  _INNER_RADIUS = null;
  _OUTER_RADIUS = null;
  _MEDIAN_RADIUS = null;

  _body = null;

  constructor(data) {
    this._ASTEROID_COUNT = data.count || 1000;
    this._INNER_RADIUS = data.innerRadius || 1.7;
    this._OUTER_RADIUS = data.outerRadius || 2.5;
    this._MEDIAN_RADIUS = (this._INNER_RADIUS + this._OUTER_RADIUS) / 2;

    const asteroidBelt = this._setAsteroidBelt(data);

    const centroid = new THREE.Object3D();

    centroid.position.set(0, 0, 0);

    centroid.add(asteroidBelt);

    // centroid.rotateX((Math.PI / 180) * 7.25);

    this._body = centroid;
  }

  _setAsteroidBelt(data) {
    const asteroidBeltGeometry = new THREE.BufferGeometry();
    let positions = new Float32Array(this._ASTEROID_COUNT * 3);
    let colors = new Float32Array(this._ASTEROID_COUNT * 3);
    const color = new THREE.Color();

    const material = new THREE.PointsMaterial({
      size: 0.005,
      vertexColors: true,
      map: new THREE.TextureLoader().load(data.texture),
    });

    const radiusSpread = this._OUTER_RADIUS - this._INNER_RADIUS;

    for (let i = 0; i < this._ASTEROID_COUNT; i++) {
      const radius = this._INNER_RADIUS + Math.random() * radiusSpread;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.random() * 0.1 - 0.05;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixedColor = color.setHSL(i / this._ASTEROID_COUNT, 0.5, 0.5);

      colors[i * 3] = 239 / 255;
      colors[i * 3 + 1] = 219 / 255;
      colors[i * 3 + 2] = 167 / 255;
    }

    asteroidBeltGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    asteroidBeltGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );
    asteroidBeltGeometry.computeBoundingSphere();

    const asteroidBelt = new THREE.Points(asteroidBeltGeometry, material);

    return asteroidBelt;
  }

  getAsteroidBelt() {
    return this._body;
  }
}

export default asteroidBelt;
