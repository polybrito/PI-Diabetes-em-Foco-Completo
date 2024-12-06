const track = document.querySelector('.carrossel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('#setaEsquerda');
const nextButton = document.querySelector('#setaDireita');

let currentSlideIndex = 0;

// Clona os elementos no início e no fim para looping
const cloneFirstSlides = slides.slice(0, 4).map(slide => slide.cloneNode(true));
const cloneLastSlides = slides.slice(-4).map(slide => slide.cloneNode(true));
cloneFirstSlides.forEach(slide => track.appendChild(slide));
cloneLastSlides.reverse().forEach(slide => track.insertBefore(slide, track.firstChild));

// Ajusta a posição inicial
const slideWidth = slides[0].getBoundingClientRect().width;
const totalSlides = track.children.length;
track.style.transform = `translateX(-${4 * slideWidth}px)`;

function updateSlidePosition() {
  track.style.transition = 'transform 0.3s ease-in-out';
  track.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
}

function handleTransitionEnd() {
  if (currentSlideIndex === 0) {
    track.style.transition = 'none';
    currentSlideIndex = slides.length;
    track.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
  }
  if (currentSlideIndex === totalSlides - 4) {
    track.style.transition = 'none';
    currentSlideIndex = slides.length - 4;
    track.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
  }
}

prevButton.addEventListener('click', () => {
  currentSlideIndex -= 4;
  updateSlidePosition();
});

nextButton.addEventListener('click', () => {
  currentSlideIndex += 4;
  updateSlidePosition();
});

track.addEventListener('transitionend', handleTransitionEnd);

if (screenWidth <= 768) {

}