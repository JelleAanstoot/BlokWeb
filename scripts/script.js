// JavaScript Document
// Functie menu open

var button = document.querySelector("button")
var nav = document.querySelector("nav")


button.addEventListener("click", menuOpen)


function menuOpen() {
    nav.classList.toggle("menuOpen")
}

// Functie menu sluiten

var buttonClose = document.querySelector("#menuSluiten")

document.getElementById("menuSluiten").addEventListener("click", menuSluiten);
button.addEventListener("click", menuSluiten)

