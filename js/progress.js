function update_bar(speed) {
  var element = document.getElementById('myprogressBar');
  var width = 1;
  var identity = setInterval(scene, speed);

  function scene() {
      if (width >= 100) {
          clearInterval(identity);
      } else {
          width++;
          element.style.width = width + '%';
      }
  }
}