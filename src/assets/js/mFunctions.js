function startSideMenu() {
  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems);

    var closeButton = document.querySelector('.close-menu a');
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        var sidenavInstance = M.Sidenav.getInstance(
          document.getElementById("mobile-demo")
        );
        sidenavInstance.close();
      });
    }
  });
}
startSideMenu();

function handleSubmit(event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  if (email) {
      alert('Correo enviado');
      window.location.href = '/security/user-identification';
  } else {
      alert('Por favor, ingrese un correo electrónico válido');
  }
}

handleSubmit();
