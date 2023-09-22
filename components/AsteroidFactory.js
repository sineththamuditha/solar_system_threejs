import * as THREE from "../src/Three.js";

class _asteroidFactory {
  _TEXTURE = null;

  _PARENT_RADIUS = null;

  _INNER_RADIUS = null;
  _OUTER_RADIUS = null;

  _ACTIVE_ASTEROIDS = [];

  constructor(data) {
    this._TEXTURE = new THREE.TextureLoader().load(data.texture);

    this._PARENT_RADIUS = data.parentRadius || 6.96;

    this._INNER_RADIUS = data.innerRadius || 1.7;
    this._OUTER_RADIUS = data.outerRadius || 2.5;
  }

  getAsteroid() {
    const asteroidGeomatry = this._getAsteroidGeomatry();
    const asteroidMaterial = new THREE.MeshLambertMaterial({
      map: this._TEXTURE,
    });

    const asteroid = new THREE.Mesh(asteroidGeomatry, asteroidMaterial);

    const angle = Math.random() * Math.PI * 2;
    const distanceFromCenter =
      Math.random() * (this._OUTER_RADIUS - this._INNER_RADIUS) +
      this._INNER_RADIUS;

    asteroid.position.x = Math.sin(angle) * distanceFromCenter;
    asteroid.position.z = Math.cos(angle) * distanceFromCenter;

    this._ACTIVE_ASTEROIDS.push(asteroid);

    return asteroid;
  }

  _getAsteroidGeomatry() {
    const radius = Math.random() % 0.05;
    const geomatry = new THREE.SphereGeometry(radius, 64, 64);
    return geomatry;
  }

  animateAsteroids() {
    for (const asteroid of this._ACTIVE_ASTEROIDS) {
      if (
        asteroid.position.distanceTo(asteroid.parent.position) <
        this._PARENT_RADIUS
      ) {
        asteroid.parent.remove(asteroid);
        asteroid.parent = null;
        asteroid.geometry.dispose();
        asteroid.material.dispose();
        this._ACTIVE_ASTEROIDS.splice(
          this._ACTIVE_ASTEROIDS.indexOf(asteroid),
          1
        );
        return;
      }

      asteroid.position.x =
        asteroid.position.x > 0
          ? asteroid.position.x - 0.05
          : asteroid.position.x + 0.05;
      asteroid.position.z =
        asteroid.position.z > 0
          ? asteroid.position.z - 0.05
          : asteroid.position.z + 0.05;
    }
  }
}

export default _asteroidFactory;
