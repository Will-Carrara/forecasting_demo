slider.addEventListener('input', (e) => {
    // adjust the high res layer opacity
    map.setPaintProperty(
      'High',
      'raster-opacity',
      parseInt(e.target.value, 10) / 100
    );
    // adjust the low res layer opacity
    map.setPaintProperty(
      'Low',
      'raster-opacity',
      parseInt(e.target.value, 10) / 100
    );
});