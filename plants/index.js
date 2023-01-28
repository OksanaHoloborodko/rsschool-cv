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

//service blur
const seviceCards = document.querySelectorAll('.service-btn');
const serviceIssues = document.querySelectorAll('.service-card');

seviceCards.forEach((service) => {
    service.addEventListener('click', () => {
        service.classList.toggle('clicked');
        let activeSeviceCards = document.querySelectorAll('.service-btn.clicked');
        let activeSeviceCardsId = [];
        for (let activeSeviceCard of activeSeviceCards) {
            activeSeviceCardsId.push(activeSeviceCard.getAttribute('id'));
        }

        serviceIssues.forEach((serviceIssue) => {
            if(serviceIssue.getAttribute('class').includes('blur')) {
                serviceIssue.classList.toggle('blur');
            }
            if(!activeSeviceCardsId.includes(serviceIssue.getAttribute('class').split(' ')[1])) {
                serviceIssue.classList.toggle('blur');
            }
            if(activeSeviceCardsId.length == 0) {
                serviceIssue.classList.toggle('blur');
            }
        });

        if(activeSeviceCards.length === 2) {
            seviceCards.forEach((e) => {
                if(!e.classList.contains('clicked')) {
                    e.setAttribute('disabled', true);
                }
            });
        } else {
            const noActiveService = document.querySelector('.service-btn:disabled');
            if (noActiveService) {
                noActiveService.removeAttribute('disabled');
            }
        }
        }
    );
});
