const burger = document.querySelector('.burger-menu');
const popup = document.querySelector('.popup-menu');
const menu = document.querySelector('.nav-menu').cloneNode(1);
const body = document.querySelector('body');
const links = Array.from(menu.children);

burger.addEventListener('click', burgerHandler);
links.forEach((l) => l.addEventListener('click', closePopup));
popup.addEventListener('click', closePopup);

function burgerHandler(e) {
    e.preventDefault();
    popup.classList.toggle('open');
    burger.classList.toggle('active');
    body.classList.toggle('noscroll');
    renderPopup();
}

function renderPopup() {
    popup.appendChild(menu);
    menu.classList.remove('nav-menu');
    menu.classList.add('nav-menu-mod');
}

function closePopup () {
    popup.classList.remove("open");
    burger.classList.remove("active");
    body.classList.remove("noscroll");
}