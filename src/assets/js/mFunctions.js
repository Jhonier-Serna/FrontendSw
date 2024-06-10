function startSideMenu(){
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    // Manejador de eventos para el botón de cerrar menú
    var closeButton = document.querySelector('.close-menu a');
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        var sidenavInstance = M.Sidenav.getInstance(document.getElementById('mobile-demo'));
        sidenavInstance.close();
      });
    }
  });
}
startSideMenu();


function carouselF(){
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, options);
  });
}

carouselF();


function login(){
  document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('container');
    const switchToSignIn = document.getElementById('switchToSignIn');
    const switchToLogin = document.getElementById('switchToLogin');

    switchToSignIn.addEventListener('click', () => {
      container.classList.add("sign-up-active");
    });

    switchToLogin.addEventListener('click', () => {
      container.classList.remove("sign-up-active");
    });
  });

}

login();
