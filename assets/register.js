const barsBtn = document.querySelector('.toggle-icon')
const barsMenu = document.querySelector('.navbar')
const overlay = document.querySelector('.overlay')

const toggleMenu = () => {
    barsMenu.classList.toggle('open-menu')
    overlay.classList.toggle('show-overlay')
}


const closeOnScroll = () => {
    if (!barsMenu.classList.contains('open-menu')) return;

    barsMenu.classList.remove('open-menu')
    overlay.classList.remove('show-overlay')
}

const closeOnClick = (e) => {
    if (!e.target.classList.contains('navbar-link')) return;
    barsMenu.classList.remove('open-menu')
    overlay.classList.remove('show-overlay')
}

const closeOnOverlayClick = () => {
    barsMenu.classList.remove('open-menu')
    overlay.classList.remove('show-overlay')
}

const init = () => {
    barsBtn.addEventListener('click', toggleMenu)

    window.addEventListener('scroll', closeOnScroll)

    barsMenu.addEventListener('click', closeOnClick)
    overlay.addEventListener('click', closeOnOverlayClick)
}

init()
