function calc() {
 //Calc

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'famale'; // пишем значение которое уже выбрано дизайнером и подсвечено (дефолт значение)
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        sex = 1.375; // пишем значение которое уже выбрано дизайнером и подсвечено (дефолт значение)
        localStorage.setItem('ratio', 1.375);
    }
  
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    } 

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);//  будем получать всe div-ы
        elements.forEach(elem =>{                       // берем каждый элемент и перебираем
            elem.addEventListener('click', (e) => {     //вешаем обработчик события на каждый элемент
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');// используем атрибут который искали, вытаскиваем активность котрая была выбрана пользователем 
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')) // записываем в localStorage на те элементы которые были выбраны пользователем
                }else{
                    sex = e.target.getAttribute('id');  // если нет атрибута data ratio, значит работаем с поолом(sex) определяем по id
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
             
 // теперь поработаем с классами активности
                elements.forEach(elem => {
                    elem.classList.remove(activeClass); // класс активности убираем у каждого элемента вначале 
                });
 
                e.target.classList.add(activeClass); // назначаем класс активности тому div, который кликнули назначили событие
         
                calcTotal();
            });
        })

    }
    getStaticInformation('#gender div', 'calculating__choose-item_active'); // вызываем функцию (это для определения пола)
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');//вызываем функцию, они навесят обработчики событий (это для выбора активности )

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

    input.addEventListener('input', () => {

        if(input.value.match(/\D/g)){   //проверим с помощью рег выражения, если польз-тель ввел нечисло,
            input.style.border = '1px solid red'; // то подсвечиваем рамку красным
        } else{
            input.style.border = 'none'; 
        }

        switch(input.getAttribute('id')) {      // ссылаемся на идентификатор , проверяем на id
            case 'height':                          // проверяем на строку, если это input с ростом
                height = +input.value;              //то мы берем эту переменную и записываем в нее     значение которое ввел пользователь,мы работаем с input-ом, что то вводим, значит у него есть какое то value
                break;// и останавливаем этот кейс
            case 'weight':
                weight = +input.value;
                break;
            case 'age':
                age = +input.value;
                break;   
        }

        calcTotal();
    });
 
    }

    getDynamicInformation('#height');   //вызываем функцию с опеределенными 3мя селекторами
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

export default calc;