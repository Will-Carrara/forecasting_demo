function randomInRange(min, max) {
  /* Generate a random number in the range */
  return Math.random() * (max - min) + min;
}

function smallParty() {
  /* Fire confetti from the button at an angle */

  // party object
  confetti({
    startVelocity: randomInRange(40, 80),
    angle: 120,
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: {
        y: .95,
        x: .95
    }
  });
};

function fullParty() {
  /* Rain confetti down from the top of the page*/

  // duration: 5 seconds
  var duration = 5 * 1000;
  var end = Date.now() + duration;

  (function frame() {
    // launch a few confetti from the left edge

    // right side
    confetti({
      startVelocity: 50,
      particleCount: 5,
      angle: 90,
      spread: 180,
      origin: { x:1.2, y:-0.1 }
    });

    //left side
    confetti({
      startVelocity: 50,
      particleCount: 5,
      angle: 90,
      spread: 180,
      origin: { x:-0.2 , y:-0.1 }
    });

    // center
    confetti({
      startVelocity: 60,
      particleCount: 10,
      angle: -90,
      spread: 180,
      origin: { x:0.5, y:-1 },
    });

    // keep going until we are out of time
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    };
  }());
};


async function addLayers() {
  /* Dynamically add global variable raster layers to map*/

  // request url for ground truth
  const url = 'https://openet-raster-api.org/visual/tile_id?admin_key=hello';
  var args = {
    "start_date": "2021-01-01",
    "end_date": "2021-12-31",
    "geometry": [
      -126.69800563131702, 49.56739654380486,
      -126.69800563131702, 25.1046857170018,
      -64.47144313131702, 25.1046857170018,
      -64.47144313131702, 49.56739654380486
    ],
    "model": "ensemble",
    "variable": VARIABLE,
    "ref_et_source": "gridmet",
    "pixel_aggregation": "sum",
    "units": "english",
    "provisional": "true",
    "visual_parameters": master['monthly'][VARIABLE]['tile_palette']
  }
  var tiles = await requestTiles(url ,args);

  /*
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
  */

  //map.removeSource('ET')

  console.log(map.getStyle().layers)

  map.addLayer({
    "id": "Current",
    "type": "raster",
    "source": {
        "type": "raster",
        "tiles": [tiles['tile_fetcher']],
        "minzoom": 5,
        "maxzoom": 15,
        "tileSize": 256
    },
    'layout': {
      'visibility': 'visible',
    }
  },
  "country-label"
  );
}