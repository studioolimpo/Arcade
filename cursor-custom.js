//---------CUSTOM CURSOR-----------//

// Custom cursor movement
gsap.set(".cursor_wrap", { xPercent: -50, yPercent: -50 });

var cursor = document.querySelector(".cursor_wrap");
var cursorDot = document.querySelector(".cursor_dot");
var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
var mouse = { x: pos.x, y: pos.y };
var speed = 0.1; // Smooth movement

var fpms = 60 / 1000;

var xSet = gsap.quickSetter(cursor, "x", "px");
var ySet = gsap.quickSetter(cursor, "y", "px");

var currentTheme = "brand"; // Default theme

// Hide cursor on page load
$(".cursor_dot").addClass("cursor_hide");

// Reveal cursor on first mouse move
let cursorRevealed = false;

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  if (!cursorRevealed) {
    // Remove the hidden class and update immediately to sync the position
    $(".cursor_dot").removeClass("cursor_hide");
    cursorRevealed = true;
  }

});

// Continuously update cursor position
gsap.ticker.add((time, deltaTime) => {
  var delta = deltaTime * fpms;
  var dt = 1.0 - Math.pow(1.0 - speed, delta);

  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;

  // Update cursor position on the page
  xSet(pos.x);
  ySet(pos.y);
});

// Add custom class on hover
$("a").on("mouseenter", function () {
  $(".cursor_dot").addClass("cursor_hover");
});

$("a").on("mouseleave", function () {
  $(".cursor_dot").removeClass("cursor_hover");
});

$(".accordion_trigger_item").on("mouseenter", function () {
  $(".cursor_dot").addClass("cursor_hover");
});

$(".accordion_trigger_item").on("mouseleave", function () {
  $(".cursor_dot").removeClass("cursor_hover");
});

$(".form_main_option_link").on("mouseenter", function () {
  $(".cursor_dot").addClass("cursor_hide");
});

$(".form_main_option_link").on("mouseleave", function () {
  $(".cursor_dot").removeClass("cursor_hide");
});

$(".form_main_inner").on("mouseenter", function () {
  $(".cursor_dot").addClass("cursor_hide");
});

$(".form_main_inner").on("mouseleave", function () {
  $(".cursor_dot").removeClass("cursor_hide");
});

$("body").on("mousedown", function () {
  $(".cursor_dot").addClass("cursor_smaller");
});

$("body").on("mouseup", function () {
  $(".cursor_dot").removeClass("cursor_smaller");
});


