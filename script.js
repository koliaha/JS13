window.addEventListener('DOMContentLoaded', function(){
'use strict';

let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');

function hideTabContent(a) {
    for (let i = a; i< tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
    }
}

hideTabContent(1);

function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');  
    }
}

info.addEventListener('click', function(event) {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
        for ( let i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                hideTabContent(0);
                showTabContent(i);
                break;
            }
        }
    }
});

let deadline = '2018-11-20';

function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

    return {
        'total' : t,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
    };
}

function setClock(id, endtime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
        let t = getTimeRemaining(endtime);
        if (t.total <= 0) {
            clearInterval(timeInterval);
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
        } else {
            if (t.hours.toString().length == 1){
                hours.textContent = '0' + t.hours;
            } else {
                hours.textContent = t.hours;
            }
            if (t.minutes.toString().length == 1){
                minutes.textContent = '0' + t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }if (t.seconds.toString().length == 1){
                seconds.textContent = '0' + t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }
        }
    }
}

setClock('timer', deadline);

//окно узнать больше

let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close'),
    more2 = document.querySelectorAll('.description-btn'),
    mas = [],
    n = more2.length + 1;
    for (let i = 0; i < n; i++) {
        mas[i] = more2[i];    
    }
    mas[n-1] = more;
    mas.forEach(function(elem) {
        elem.addEventListener('click', function (){
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });

    close.addEventListener('click', function (){
        overlay.style.display = 'none';
        this.classList.remove('more-splash');
        document.body.style.overflow = '';
    });


//Form

let message = {
    loading: 'Ждите, идет загрузка',
    success: 'Спасибо! скоро с вами свяжемся!',
    failure: 'Что-то пошло не так...'
};

let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
function sendForm(elem){
    elem.addEventListener('submit', function (e){
        e.preventDefault();
        elem.appendChild(statusMessage);
        let formData = new FormData(form);

        function postData(data) {

            return new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader ('Content-Type', 'application/json; charset=utf-8');
                request.onreadystatechange = function () {
                    if (request.readyState < 4) {
                        resolve() 
                    } else if ( request.readyState === 4 ) {
                       if ( request.status == 200 && request.status < 300){
                       resolve()
                    } else {
                        reject()
                    }
                }
            }
            request.send(data);
            })
        }

        function clearInput() {
            for ( let i = 0; i< input.length; i++) {
                input[i].value = '';
            }
        }

        postData(formData)
            .then(() => statusMessage.innerHTML = message.loading)
            .then(() => statusMessage.innerHTML = message.success)
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput)
    });
}
sendForm(form);
let formBottom = document.getElementById('form'),
    inputmail = formBottom.getElementsByTagName('input')[0],
    inputphone = formBottom.getElementsByTagName('input')[1],
    btn = formBottom.getElementsByTagName('button')[0];
sendForm(formBottom);

//sliders

let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1; 
        }
        if (n < 1) {
            slideIndex = slides.length; 
        }
        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');

    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    showSlides(slideIndex);

    prev.addEventListener('click', function (){
        plusSlides(-1); 
    });
    next.addEventListener('click', function (){
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function (event){
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') 
                && event.target == dots[i-1]) {
                    currentSlide(i);
                }
        }
    });
//calc
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;
    totalValue.innerHTML = 0;
    
    persons.onkeypress = function (event){
        event = event || window.event;
        if (event.charCode && (event.charCode < 48 || event.charCode > 57))
         return false;
       };
    restDays.onkeypress = function (event){
        event = event || window.event;
        if (event.charCode && (event.charCode < 48 || event.charCode > 57))
         return false;
       };
    
    persons.addEventListener('change', function () {
        personsSum = +this.value;
        total = (daysSum + personsSum) *4000;
        if (restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
        if (this.value == ''){
            totalValue.innerHTML = 0;
        }
    });  
    restDays.addEventListener('change', function () {
        daysSum = +this.value;
        total = (daysSum + personsSum) *4000;

        if (persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
        if (this.value == ''){
            totalValue.innerHTML = 0;
        }
    });

    place.addEventListener('change', function () {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    })
});