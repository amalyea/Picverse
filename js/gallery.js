document.querySelectorAll('.img-container img').forEach(image =>{
    image.onclick = () => {
        document.querySelector('.popup').style.display = 'block';
        document.querySelector('.popup img').src = image.getAttribute('src');
    }
});

document.querySelector('.popup span').onclick = () => {
    document.querySelector('.popup').style.display = 'none';
}

function showSideBar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSideBar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}