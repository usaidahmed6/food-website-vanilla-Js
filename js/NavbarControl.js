

// // active navbar
// let nav = document.querySelector(".navigation-wrap");
// window.onscroll = function () {
//     if (document.documentElement.scrollTop > 20) {
//         nav.classList.add("scroll-on");
//     } else {
//         nav.classList.remove("scroll-on");
//     }
// }


// nav hide
let navBar = document.querySelectorAll('.nav-link');
let navCollapse = document.querySelector('.navbar-collapse.collapse');
navBar.forEach(function (a) {
    a.addEventListener("click", function () {
        navCollapse.classList.remove("show");
    })
})


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
window.myDropdown = function myDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropProfile')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
