import * as THREE from "../src/Three.js";
import {
  Lensflare,
  LensflareElement,
} from "../examples/jsm/objects/Lensflare.js";
import celestialBody from "./CelestialBody.js";

class sun extends celestialBody {
  constructor() {
    super();

    this._ROTATION_FACTOR = 1 / 27;

    this._AXIS_TILT_FACTOR = 7.25;

    this.initialiseSun();

    this._tilt();
  }

  initialiseSun() {
    const innerGeometry = new THREE.SphereGeometry(6.96, 64, 64);

    const innerMaterial = this._getSunGlowingMaterial();
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
    innerSphere.position.set(0, 0, 0);

    const texture = new THREE.TextureLoader().load(
      "./components/textures/Sun/8k_sun.jpg"
    );
    const outerMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9,
    });
    const outerGeometry = new THREE.SphereGeometry(7, 64, 64);
    const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial);
    outerSphere.position.set(0, 0, 0);

    const sunGroup = new THREE.Group();
    sunGroup.add(innerSphere);
    sunGroup.add(outerSphere);

    this._body = sunGroup;
  }

  _getSunGlowingMaterial() {
    return new THREE.ShaderMaterial({
      vertexShader: this._getVertexShader(),
      fragmentShader: this._getFragmentShader(),
      uniforms: {
        c: { type: "f", value: 0.2 },
        p: { type: "f", value: 1.9 },
        glowColor: { type: "c", value: new THREE.Color(0xffbb00) },
        glowIntensity: { value: 0.3 },
        glowSize: { value: 0.2 },
      },
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
    });
  }

  _getVertexShader() {
    return `
        uniform vec3 viewVector;
        uniform float c;    
        uniform float p;
        varying float intensity;
        void main() 
        {
            vec3 vNormal = normalize( normalMatrix * normal );
            vec3 vNormel = normalize( normalMatrix * viewVector );
            intensity = pow( c - dot(vNormal, vNormel), p );

            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `;
  }

  _getFragmentShader() {
    return `
        uniform vec3 glowColor;
        varying float intensity;
        void main() 
        {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4( glow, 1.0 );
        }
        `;
  }

  getSolarFlare() {
    const textureLoader = new THREE.TextureLoader();

    const textureFlare0 = textureLoader.load(
      "./components/textures/Sun/SolarFlare/lensflare0.png"
    );
    const textureFlare3 = textureLoader.load(
      "./components/textures/Sun/SolarFlare/lensflare3.png"
    );

    const lensflare = new Lensflare();

    lensflare.addElement(new LensflareElement(textureFlare0, 700, 100));
    lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
    lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));

    return lensflare;
  }
}

export default sun;
