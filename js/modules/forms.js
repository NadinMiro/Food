import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
//Forms

const forms = document.querySelectorAll(formSelector);

const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
bindpostData(item);
});

function bindpostData(form) {     // отвечает за привязку постинга данных
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
        
        form.insertAdjacentElement('afterend', statusMessage);// метод для вставки в разные места верстки, первый арг- куда вставить, второй-что вставить)

        const formData = new FormData(form); // используем отправку данных в formData формате

        const json = JSON.stringify(Object.fromEntries(formData.entries()));//берем formData(которая собрала данные с формы), превращаем вначале в массив массивов, потом превращаем в классичюформу, а после в объект в JSON объект
       
        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(() => {
            showThanksModal(message.failure); // ловим ошибку и выдаем сообщение
        }).finally(() =>{
            form.reset(); // очистка формы выполняется в любом случае
        })
    });
}

function showThanksModal(message){
    const preModalDialog = document.querySelector('.modal__dialog');

    preModalDialog.classList.add('hide');
    openModal('.modal', modalTimerId);
    
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
    </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        preModalDialog.classList.add('show');
        preModalDialog.classList.remove('hide');
        closeModal('.modal');
    }, 4000);
}

}

export default forms;