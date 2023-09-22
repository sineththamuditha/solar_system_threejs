function getCelestialBodyData() {
  return [
    {
      name: "mercury",
      radius: 0.025,
      distanceFromSun: 5.8,
      rotationFactor: 1 / 58.6,
      revolutionFactor: 1 / 87.97,
      axisTiltFactor: 0.03,
      texture: "./components/textures/Mercury/mercurytexturemap.jpg",
      bumpMap: "./components/textures/Mercury/mercurybumpmap.jpg",
    },
    {
      name: "venus",
      radius: 0.06,
      distanceFromSun: 10.8,
      rotationFactor: 1 / 243,
      revolutionFactor: 1 / 224.7,
      axisTiltFactor: 177.3,
      texture: "./components/textures/Venus/venustexturemap.jpg",
      bumpMap: "./components/textures/Venus/venusbumpmap.jpg",
    },
    {
      name: "earth",
      radius: 0.063,
      distanceFromSun: 14.9,
      rotationFactor: 1,
      revolutionFactor: 1 / 365,
      axisTiltFactor: 23.5,
      texture: "./components/textures/Earth/earthtexturemap.png",
      bumpMap: "./components/textures/Earth/earthbumpmap.jpg",
      hasClouds: true,
      cloudsTexture: "./components/textures/Earth/earthcloudmap.jpg",
      moons: [
        {
          name: "moon",
          radius: 0.003,
          distanceFromMotherPlanet: 0.0384,
          rotationFactor: 1 / 27.3,
          revolutionFactor: 1 / 27.3,
          axisTiltFactor: 6.68,
          texture: "./components/textures/Earth/moon/moontexturemap.jpg",
          bumpMap: "./components/textures/Earth/moon/moonbumpmap.jpg",
        },
      ],
    },
    {
      name: "mars",
      radius: 0.033,
      distanceFromSun: 22.7,
      rotationFactor: 1 / 1.03,
      revolutionFactor: 1 / 686.98,
      axisTiltFactor: 25.19,
      texture: "./components/textures/Mars/marstexturemap.png",
      bumpMap: "./components/textures/Mars/marsbumpmap.jpg",
      moons: [
        {
          name: "phobos",
          radius: 0.0007,
          distanceFromMotherPlanet: 0.0009,
          rotationFactor: 1 / 0.32,
          revolutionFactor: 1 / 0.32,
          axisTiltFactor: 0,
          texture:
            "./components/textures/Mars/moons/phobos/phobostexturemap.jpg",
          bumpMap: "./components/textures/Mars/moons/phobos/phobosbumpmap.jpg",
        },
        {
          name: "deimos",
          radius: 0.0004,
          distanceFromMotherPlanet: 0.0023,
          rotationFactor: 1 / 1.26,
          revolutionFactor: 1 / 1.26,
          axisTiltFactor: 0,
          texture:
            "./components/textures/Mars/moons/deimos/deimostexturemap.jpg",
          bumpMap: "./components/textures/Mars/moons/deimos/deimosbumpmap.jpg",
        },
      ],
    },
    {
      name: "jupiter",
      radius: 0.71,
      distanceFromSun: 77.8,
      rotationFactor: 1 / 0.41,
      revolutionFactor: 1 / 4332.59,
      axisTiltFactor: 3.13,
      texture: "./components/textures/Jupiter/jupitertexturemap.png",
      bumpMap: "./components/textures/Jupiter/jupiterbumpmap.png",
      moons: [
        {
          name: "io",
          radius: 0.009,
          distanceFromMotherPlanet: 0.0128,
          rotationFactor: 1 / 1.77,
          revolutionFactor: 1 / 1.77,
          axisTiltFactor: 0,
          texture: "./components/textures/Jupiter/moons/io/iotexturemap.jpg",
        },
        {
          name: "europa",
          radius: 0.008,
          distanceFromMotherPlanet: 0.067,
          rotationFactor: 1 / 3.55,
          revolutionFactor: 1 / 3.55,
          axisTiltFactor: 0,
          texture:
            "./components/textures/Jupiter/moons/europa/europatexturemap.jpg",
        },
        {
          name: "ganymede",
          radius: 0.014,
          distanceFromMotherPlanet: 0.11,
          rotationFactor: 1 / 7.15,
          revolutionFactor: 1 / 7.15,
          axisTiltFactor: 0,
          texture:
            "./components/textures/Jupiter/moons/ganymede/ganymedetexturemap.jpg",
        },
        {
          name: "callisto",
          radius: 0.012,
          distanceFromMotherPlanet: 0.18,
          rotationFactor: 1 / 16.69,
          revolutionFactor: 1 / 16.69,
          axisTiltFactor: 0,
          texture:
            "./components/textures/Jupiter/moons/callisto/callistotexturemap.jpg",
        },
      ],
    },
    {
      name: "saturn",
      radius: 0.6,
      distanceFromSun: 143.4,
      rotationFactor: 1 / 0.45,
      revolutionFactor: 1 / 10759.22,
      axisTiltFactor: 26.73,
      texture: "./components/textures/Saturn/saturntexturemap.jpg",
      bumpMap: "./components/textures/Saturn/saturnbumpmap.jpg",
      ring: {
        innerRadius: 0.58232,
        outerRadius: 1.7,
        thetaSegments: 64,
        phiSegments: 8,
        horizontalRotation: true,
        texture: "./components/textures/Saturn/ring/ringtexturemap.png",
        colorMap: "./components/textures/Saturn/ring/ringcolormap.png",
      },
      moons: [
        {
          name: "titan",
          radius: 0.008,
          distanceFromMotherPlanet: 0.022,
          rotationFactor: 1 / 15.95,
          revolutionFactor: 1 / 15.95,
          axisTiltFactor: 0,
          texture:
            "./components/textures/Saturn/moons/titan/titantexturemap.jpg",
        },
        {
          name: "rhea",
          radius: 0.003,
          distanceFromMotherPlanet: 0.012,
          rotationFactor: 1 / 4.52,
          revolutionFactor: 1 / 4.52,
          axisTiltFactor: 0,
          texture: "./components/textures/Saturn/moons/rhea/rheatexturemap.jpg",
        },
        {
          name: "iapetus",
          radius: 0.003,
          distanceFromMotherPlanet: 0.023,
          rotationFactor: 1 / 79.33,
          revolutionFactor: 1 / 79.33,
          axisTiltFactor: 0,
          texture:
            "./components/textures/Saturn/moons/iapetus/iapetustexturemap.jpg",
        },
        {
          name: "dione",
          radius: 0.002,
          distanceFromMotherPlanet: 0.009,
          rotationFactor: 1 / 2.74,
          revolutionFactor: 1 / 2.74,
          axisTiltFactor: 0,
          texture:
            "./components/textures/Saturn/moons/dione/dionetexturemap.jpg",
        },
        {
          name: "tethys",
          radius: 0.002,
          distanceFromMotherPlanet: 0.007,
          rotationFactor: 1 / 1.89,
          revolutionFactor: 1 / 1.89,
          axisTiltFactor: 0,
          texture:
            "./components/textures/Saturn/moons/tethys/tethystexturemap.jpg",
        },
      ],
    },
    {
      name: "uranus",
      radius: 0.3,
      distanceFromSun: 287.2,
      rotationFactor: 1 / 0.72,
      revolutionFactor: 1 / 30700,
      axisTiltFactor: 97.77,
      texture: "./components/textures/Uranus/uranustexturemap.jpg",
      moons: [
        {
          name: "miranda",
          radius: 0.001,
          distanceFromMotherPlanet: 0.0013,
          rotationFactor: 1 / 1.41,
          revolutionFactor: 1 / 1.41,
          axisTiltFactor: 0,
          texture:
            "./components/textures/Uranus/moons/miranda/mirandatexturemap.jpg",
        },
        {
          name: "ariel",
          radius: 0.002,
          distanceFromMotherPlanet: 0.0019,
          rotationFactor: 1 / 2.52,
          revolutionFactor: 1 / 2.52,
          axisTiltFactor: 0,
          texture:
            "./components/textures/Uranus/moons/ariel/arieltexturemap.jpg",
        },
        {
          name: "umbriel",
          radius: 0.002,
          distanceFromMotherPlanet: 0.0027,
          rotationFactor: 1 / 4.14,
          revolutionFactor: 1 / 4.14,
          axisTiltFactor: 0,
          texture:
            "./components/textures/Uranus/moons/umbriel/umbrieltexturemap.jpg",
        },
        {
          name: "titania",
          radius: 0.002,
          distanceFromMotherPlanet: 0.0041,
          rotationFactor: 1 / 8.71,
          revolutionFactor: 1 / 8.71,
          axisTiltFactor: 0,
          texture:
            "./components/textures/Uranus/moons/titania/titaniatexturemap.jpg",
        },
      ],
    },
    {
      name: "neptune",
      radius: 0.29,
      distanceFromSun: 449.5,
      rotationFactor: 1 / 0.67,
      revolutionFactor: 1 / 60190,
      axisTiltFactor: 28.32,
      texture: "./components/textures/Neptune/neptunetexturemap.jpg",
      moons: [
        {
          name: "triton",
          radius: 0.003,
          distanceFromMotherPlanet: 0.0024,
          rotationFactor: 1 / 5.88,
          revolutionFactor: 1 / 5.88,
          axisTiltFactor: 0,
          texture:
            "./components/textures/Neptune/moons/triton/tritontexturemap.jpg",
        },
      ],
    },
  ];
}

function getAsteroidBeltData() {
  return {
    count: 10000,
    innerRadius: 32.9,
    outerRadius: 47.8,
    texture: "./components/textures/Asteroid/asteroidtexturemap.jpg",
  };
}

function getControllerConfig() {
  return {
    sun: {
      minDistance: 10,
      maxDistance: 250,
    },
    mercury: {
      minDistance: 0.2,
      maxDistance: 0.5,
    },
    venus: {
      minDistance: 0.2,
      maxDistance: 0.5,
    },
    earth: {
      minDistance: 0.2,
      maxDistance: 0.5,
    },
    mars: {
      minDistance: 0.2,
      maxDistance: 0.3,
    },
    jupiter: {
      minDistance: 1,
      maxDistance: 3,
    },
    saturn: {
      minDistance: 1,
      maxDistance: 3,
    },
    uranus: {
      minDistance: 1,
      maxDistance: 2,
    },
    neptune: {
      minDistance: 1,
      maxDistance: 2,
    },
  };
}

function getAsteroidFactoryData() {
  return {
    texture: "./components/textures/Asteroid/asteroidtexturemap.jpg",
    parentRadius: 6.96,
    innerRadius: 32.9,
    outerRadius: 47.8,
  };
}

export {
  getCelestialBodyData,
  getAsteroidBeltData,
  getControllerConfig,
  getAsteroidFactoryData,
};
