
function closeNav() {
  var instance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
  instance.close();
}

function startSideMenu() {
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
      edge: 'right'
    });
  });
}

startSideMenu();
closeNav();

function handleSubmit(event) {
  event.preventDefault();
  var email = document.getElementById("email").value;
  if (email) {
    alert("Correo enviado");
    window.location.href = "/security/user-identification";
  } else {
    alert("Por favor, ingrese un correo electrónico válido");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var carousel = document.querySelectorAll(".carousel");
  M.Carousel.init(carousel);
});
