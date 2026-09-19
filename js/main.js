function showSideBar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSideBar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}

let currentIndex = 0;
const slides = document.querySelectorAll('#slider .slide');

function showSlide(index) {
    const slider = document.getElementById('slider');
    slider.scrollTo({
      left: index * slider.clientWidth,
      behavior: 'smooth'
    });
  }

function autoSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

setInterval(autoSlide, 4000); 