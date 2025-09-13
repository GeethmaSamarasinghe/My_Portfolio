// Typing Effect
const text = "Hi, I'm Geethma Samarasinghe!";
const typedText = document.getElementById("typed-text");
const introGif = document.querySelector(".intro-gif");
let index = 0;
const speed = 100;
const showGifAt = 3; // show GIF after 3 characters

function typeEffect() {
  if (index < text.length) {
    typedText.textContent += text.charAt(index);

    // Show GIF early
    if (index === showGifAt && introGif) {
      introGif.classList.add("show");
    }

    index++;
    setTimeout(typeEffect, speed);
  }
}

// Start typing on DOM load
window.addEventListener("DOMContentLoaded", typeEffect);
const aboutElements = document.querySelectorAll('.about-text, .about-pic');

const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

aboutElements.forEach(el => aboutObserver.observe(el));


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

// Skills Section Animation
const skillCategories = document.querySelectorAll('.skill-category');

const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillCategories.forEach((cat, index) => {
        setTimeout(() => {
          cat.classList.add('show');
        }, index * 200); // stagger effect
      });
      skillsObserver.unobserve(entry.target); 
    }
  });
}, { threshold: 0.2 });

skillsObserver.observe(document.querySelector('#skills'));
