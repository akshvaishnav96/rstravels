window.onscroll = function() {myFunction()};

let navbar = document.getElementById("navbar");

let sticky = navbar.offsetTop;


function myFunction() {
  if (window.pageYOffset >= sticky+100) {
    navbar.classList.add("navcolor")
  } else {
    navbar.classList.remove("navcolor");
  }
}




