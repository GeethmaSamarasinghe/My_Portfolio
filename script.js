// Typing Effect
const text = "Hi, I'm Geethma Samarasinghe!";
const typedText = document.getElementById("typed-text");
const introGif = document.querySelector(".intro-gif");
let index = 0;
const speed = 100;

function typeEffect() {
  if (index < text.length) {
    typedText.textContent += text.charAt(index++);
    setTimeout(typeEffect, speed);
  } else {
    if (introGif) introGif.classList.add("show");
  }
}
window.addEventListener("DOMContentLoaded", typeEffect);

// Scroll Reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
reveals.forEach(el => observer.observe(el));

