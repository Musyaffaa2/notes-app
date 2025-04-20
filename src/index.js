// src/index.js
import './styles.css';
import './components/app-bar.js';
import './components/custom-button.js';
import './components/note-form.js';
import './components/note-item.js';
import './script.js';
import anime from 'animejs';

document.addEventListener('DOMContentLoaded', () => {
  anime({
    targets: 'note-item',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(100),
    duration: 500,
    easing: 'easeOutQuad',
  });
});
