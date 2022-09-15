slider.addEventListener('input', (e) => {
  // Adjust the layers opacity. 
  map.setPaintProperty(
    'High',
    'raster-opacity',
    parseInt(e.target.value, 10) / 100
  );

  map.setPaintProperty(
    'Low',
    'raster-opacity',
    parseInt(e.target.value, 10) / 100
  );
});