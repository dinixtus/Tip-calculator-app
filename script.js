console.log('work');

let billInput = document.getElementById('billInput'),
    peopleInput = document.getElementById('peopleInput'),
    error = document.getElementsByClassName('error'),
    procentButtons = document.querySelectorAll('.procent-button'),
    procentInput = document.getElementById('procentInput'),
    tipResultSpan = document.getElementById('tipResult'),
    totalResultSpan = document.getElementById('totalResult'),
    resetButton = document.getElementById('resetButton'),
    regex = /^[0-9]+$/;

billInput.addEventListener('input', function(event) {
    if(!regex.test(event.target.value.trim()) || parseFloat(event.target.value) === 0)  {
        error[0].innerHTML = `Write a number please`;
        billInput.style.backgroundColor = 'hsl(0, 64%, 67%)';
        billInput.style.borderColor = 'red'
    } else {
        error[0].innerHTML = ``;
        billInput.style.backgroundColor = 'hsl(180, 33%, 94%)';
        billInput.style.borderColor = 'hsl(180, 33%, 94%)';
        let selectedPercent = getSelectedPercent(); // Получаем текущий выбранный процент
        calculateTip(selectedPercent); // Рассчитываем чаевые
        calculateTotal(selectedPercent); 
    }
});

peopleInput.addEventListener('input', function(event) {
    if(!regex.test(event.target.value.trim()) || parseFloat(event.target.value) === 0)  {
        error[1].innerHTML = `Write a number please`;
        peopleInput.style.backgroundColor = 'hsl(0, 64%, 67%)';
        peopleInput.style.borderColor = 'red'
    } else {
        error[1].innerHTML = ``;
        peopleInput.style.backgroundColor = 'hsl(180, 33%, 94%)';
        peopleInput.style.borderColor = 'hsl(180, 33%, 94%)';
        let selectedPercent = getSelectedPercent(); // Получаем текущий выбранный процент
        calculateTip(selectedPercent); // Рассчитываем чаевые
        calculateTotal(selectedPercent); 
    }
});

procentInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
    let selectedPercent = getSelectedPercent();
        calculateTip(selectedPercent);
        calculateTotal(selectedPercent);
})

procentButtons.forEach(button => {
    button.addEventListener('click', function(){
        procentButtons.forEach(button => {
            button.classList.remove('active');
            procentInput.value = '';
            button.removeAttribute('id');
        })
        this.classList.add('active');
        this.id = 'selected';

        let selectedPercent = getSelectedPercent();
        calculateTip(selectedPercent);
        calculateTotal(selectedPercent);
    })
})

function getSelectedPercent() {
    let selected = document.getElementById('selected');

    if(selected) {
        if (selected.tagName === 'BUTTON') {
            let selectedPro = selected.querySelector('span');
            return parseFloat(selectedPro.textContent);
        } else if (selected.tagName === 'INPUT') {
            return parseFloat(procentInput.value); // Если введен процент вручную
        }
    } else {
        return 0; // Если процент не выбран
    }  // Получаем процент из кнопки
}

let billInputValue = parseFloat(billInput.value),
    peopleInputValue = parseFloat(peopleInput.value);

function calculateTip(selectedPercent) {
    let billInputValue = parseFloat(billInput.value),
        peopleInputValue = parseFloat(peopleInput.value);

    let tipResult = billInputValue * (selectedPercent/100)/peopleInputValue;

    tipResultSpan.innerHTML = tipResult.toFixed(2); // Выводим результат с округлением до 2 знаков
}

function calculateTotal(selectedPercent) {
    let billInputValue = parseFloat(billInput.value),
        peopleInputValue = parseFloat(peopleInput.value);

    let totalResult = billInputValue/peopleInputValue + (billInputValue * (selectedPercent/100)/peopleInputValue);

    totalResultSpan.innerHTML = totalResult.toFixed(2);
}

resetButton.addEventListener('click', function() {
    billInput.value = '';
    peopleInput.value = '';
    procentButtons.forEach(button => {
        button.classList.remove('active');
        button.removeAttribute('id');
    });
    totalResultSpan.innerHTML = '0.00';
    tipResultSpan.innerHTML = '0.00';
})