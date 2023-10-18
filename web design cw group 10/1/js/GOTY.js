
let intro =document.querySelector(".intro");
let logo = document.querySelector(".project-title");
let logoSpan = document.querySelectorAll(".title-1");
let subHeader = document.querySelectorAll(".sub");
let imgBox = document.querySelectorAll('.intro-image-box')
let anchorLinks = document.querySelectorAll('a[href^="#g"]');
let nav = document.querySelector('.header');

if(document.readyState == "loading"){
  document.addEventListener("DOMContentLoaded", ready);
}else {
  ready();  
}

function ready(){
  anchorLinks.forEach(link => {
    link.addEventListener('click', scrollToAnchor);
  });
}


window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

function scrollToAnchor(event) {
  event.preventDefault();
  const offset = parseInt(event.target.dataset.offset || '0');
  const targetId = event.target.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const targetOffset = targetElement.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetOffset - offset,
      behavior: 'smooth'
    });
  }
}