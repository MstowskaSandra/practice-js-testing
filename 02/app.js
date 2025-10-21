document.addEventListener('DOMContentLoaded', init);
const alertEl = document.querySelector('.alert');

function init() {
    const clickEl = document.querySelector('.error--click');
    const enterEl = document.querySelector('.error--enter');

    setRandomPosition(clickEl);
    setRandomPosition(enterEl);

    initEventWithError(clickEl, 'click', new RangeError('Błąd zakresu!'));
    initEventWithError(enterEl, 'mouseenter', new TypeError('Błąd typu!'));

    alertEl.addEventListener('click', () => {
        alertEl.classList.add('alert--hidden');
    });

}

function setRandomPosition(element, error = null) {
    element.style.top = Math.random() * 600 + 'px';
    element.style.left = Math.random() * 800 + 'px';
}




function initEventWithError(element, eventName, error) {
    element.addEventListener(eventName, function() {
        try {
            throw error;
        } catch(err) {
            alertEl.classList.remove('alert--hidden');
            alertEl.textContent = err.message;
            console.error(err);
        }
    });
}
