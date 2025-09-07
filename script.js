// Typing Effect
const text = "Hi, I'm Geethma Samarasinghe!";
let index = 0;
const speed = 100; // typing speed in ms
const typedText = document.getElementById("typed-text");

function typeEffect() {
  if (index < text.length) {
    typedText.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, speed);
  }
}

window.onload = typeEffect;

// Optional: Trigger animations when sections are visible
const sections = document.querySelectorAll('.fade-in, .slide-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

sections.forEach(section => {
  observer.observe(section);
});
