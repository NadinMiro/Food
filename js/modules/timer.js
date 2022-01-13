function timer(id, deadline) {

function getTimerRemining (endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t/(1000 * 60 * 60 * 24)),
        hours = Math.floor((t/(1000 * 60 * 60)) % 24),
        minutes = Math.floor((t/ 1000 / 60) % 60),
        seconds = Math.floor((t/ 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds

        };
}

function getZero(num) {
    if (num >= 0 && num < 10){
        return `0${num}`;
    } else{
        return num;
    }
}

//функция ктр устанавливает таймер-часы на страницу
function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000); // переменная создана  запускается конструкция setInterval чтобы запускать ф-цию updateClpck через 1 сек
    
        updateClock();

// функция ктр обновляет таймер каждую секунду
    function updateClock() {
         const t = getTimerRemining(endtime);

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);

        if(t.total <= 0) {
            clearInterval(timeInterval); // если время вышло(идет в отриц сторону), то мы таймер не обновляем

        }

    }

}
setClock(id, deadline);
}


export default timer;