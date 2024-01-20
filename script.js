//Lenis code

// const lenis = new Lenis()

// lenis.on('scroll', (e) => {
//     console.log(e)
// })

// function raf(time) {
//     lenis.raf(time)
//     requestAnimationFrame(raf)
// }

// requestAnimationFrame(raf)


// skip



const cardBunch = document.querySelectorAll(".card__inner");


cardBunch.forEach(function (card){
  card.addEventListener("click", function (e) {
    card.classList.toggle('is-flipped');
  });
})



// 2nd---page

var tl = gsap.timeline({scrollTrigger:{
    trigger:"#main-gallery",
   //  markers:true,
    start:"50% 50%",
    end:"150% 50%",
    scrub:2,
    pin:true
}});
tl
.to("#center-gallery",{
   height: "100vh",
},'a')
.to("#top-gallery",{
    top: "-50%",
 },'a')
 .to("#bottom-gallery",{
    bottom: "-50%",
 },'a')
.to("#top-h1",{
    top: "60%"
 },'a')
 .to("#bottom-h1",{
    bottom: "-30%"
 },'a')
.to("#center-h1",{
   top: "-30%"
},'a')
.to(".content-gallery",{
   delay: -0.2,
   marginTop: "0%"
})


// about us Page
document.addEventListener("DOMContentLoaded", function () {
   var aboutSection = document.querySelector('.about');
   var aboutPara = document.querySelector('.about_para');
   var imgPara = document.querySelector('.about');
   var aboutheading= document.querySelector('.about_heading');

   var options = {
       root: null,
       rootMargin: '0px',
       threshold: 0.5
   };

   var observer = new IntersectionObserver(handleIntersect, options);

   observer.observe(aboutSection);

   function handleIntersect(entries) {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               aboutPara.classList.add('slide-in-right');
               imgPara.classList.add('fade-in');
               aboutheading.classList.add('growin');
           } else {
               aboutPara.classList.remove('slide-in-right');
               imgPara.classList.remove('fade-in');
               aboutheading.classList.remove('growin');
           }
       });
   }
});

// home page 
const button = document.querySelector(".button");
const mobileMenu = document.querySelector(".mobile-menu");
var elements = document.querySelectorAll(".mobile_nav_elements");
let isMenuOpen = false;  // Flag to track menu state

function toggleMenu() {
  if (isMenuOpen) {
    // If menu is open, hide it with a delay
    mobileMenu.classList.remove("show");
    setTimeout(() => {
      mobileMenu.style.opacity = "0";
    }, 250); // 300 milliseconds (0.3 seconds) delay
    isMenuOpen = false;
  } else {
    // If menu is closed, toggle the "show" class for animation
    mobileMenu.classList.add("show");
    mobileMenu.style.opacity = "1"; // Reset opacity if previously hidden
    isMenuOpen = true;
  }
}

button.addEventListener("click", toggleMenu);
elements.forEach(element => {
  element.addEventListener("click", toggleMenu);
});
 



// EXTRA

// EXTRA
//fun event
//fun event
const wrapper = document.querySelector(".fwrapper");
const carousel = document.querySelector(".fcarousel");
const firstCardWidth = carousel.querySelector(".fcard").offsetWidth;
const arrowBtns = document.querySelectorAll(".fwrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to the beginning of the carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to the end of the carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at the appropriate position to hide the first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false, return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if the mouse is not hovering over the carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    // Autoplay the carousel continuously
    timeoutId = setTimeout(() => {
        carousel.scrollLeft += firstCardWidth;

        // If the carousel is at the end, reset to the beginning for infinite autoplay
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
            carousel.scrollLeft = carousel.offsetWidth;
        }

        autoPlay(); // Call the function recursively for continuous autoplay
    }, 1000);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


