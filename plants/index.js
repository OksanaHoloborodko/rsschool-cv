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

//prices accordion
const accordionTitles = document.querySelectorAll('.prices-item');
let arr = [];

accordionTitles.forEach((accordionTitle) => {
    accordionTitle.addEventListener('click', () => {
        let layout = accordionTitle.closest('.prices-item-layout');
        let zero_id = false
        if(arr.length === 1) {
            zero_id = arr[0].getAttribute('id')
            arr[0].classList.toggle('open');
            arr.pop();
        }
        if (zero_id !== layout.getAttribute('id')) {
            layout.classList.toggle('open');
            arr.push(layout);
        }
    })
});

//contacts dropdown
const selectHeader = document.querySelectorAll('.contacts-city');
const selectCity = document.querySelectorAll('.select-city');
const cityInfo = [
    ['Yonkers, NY', '+1 914 678 0003', '511 Warburton Ave'], 
    ['Canandaigua, NY', '+1 585 393 0001', '151 Charlotte Street'], 
    ['Sherrill, NY', '+1 315 908 0004', '14 WEST Noyes BLVD'],
    ['New York City', '+1 212 456 0002', '9 East 91st Street']
    ];
let callUsBtn = document.querySelector('.call-btn');

selectHeader.forEach((item) => {
    item.addEventListener('click', () => {
        item.parentElement.classList.toggle('visible');
    });
});

selectCity.forEach((item) => {
    item.addEventListener('click', () => {
        let text = item.innerText;
        let currentText = item.closest('.contacts-select').querySelector('.contacts-city-text');
        currentText.innerText = text;
        item.closest('.contacts-select').classList.add('choose-city');
        item.closest('.contacts-select').querySelector('.contacts-city').classList.add('choose-city');
        item.closest('.contacts-select').classList.remove('visible');
        document.querySelector('.container-contacts').classList.add('choose-city');

        for (let city of cityInfo) {
            if (currentText.innerText === city[0]) {
                document.querySelector('.adress .value').innerText = city[0];
                document.querySelector('.phone .value').innerText = city[1];
                document.querySelector('.office .value').innerText = city[2];
                callUsBtn.setAttribute("phone", city[1].split(' ').join(''))
                callUsBtn.onclick = () => {
                    window.location = 'tel:'+ city[1].split(' ').join('');
                    console.log(city[1].split(' ').join(''));
                }
            }
        }
    });
});
