"use strict";

function validateNumber(number) {
        const regexpNumber = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
        return number.match(regexpNumber);
}

function validateEmail(email) {
        const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return email.match(regexpEmail);
}

function validateSurname(surname) {
        const regexpSurname = /^([A-ЯЁ]{1}[а-яё]{1,23})$/
        return surname.match(regexpSurname);
}

window.onload = function() {
    const email_input = document.getElementById("email_input");
    const surname_input = document.getElementById("surname_input");
    const number_input = document.getElementById("number_input");

    const btn = document.getElementById("add_btn");
    const label = document.getElementById("result_label");
    const image = document.getElementById("image");

    function ajaxGet(urlString, callback) {
        let request = new XMLHttpRequest();
        request.open("POST", urlString, true);
        request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        request.send(null);
        request.onload = function() {
            callback(request.response);
        };
    };

    btn.onclick = function() {
        const number = number_input.value;
        const email = email_input.value;
        const surname = surname_input.value;

        let resulting_image = '../visuals/sad.gif';
        let resulting_text = '';
        let verified = true;

        if (!validateSurname(surname)) {
            resulting_text += 'Формат фамилии неверен. Используйте только кириллицу и пишите с большой буквы!<br>';
            if (verified) 
                verified = false;
         } 

        if (!validateNumber(number)) {
            resulting_text += 'Формат номера неверен. Используйте валидный формат российского номера!<br>';
            if (verified)
                verified = false;
        }

        if (!validateEmail(email)) {
            resulting_text += 'Формат почты неверен. Используйте валидный формат почты!<br>';
            if (verified)
                verified = false;
        }

        if (!verified) {
            label.innerHTML = resulting_text;
            image.src = resulting_image;
        } else {
            const url = `/add_record?email=${email}&surname=${surname}&number=${number}`;
            ajaxGet(url, function(stringAnswer) {
                const objectAnswer = JSON.parse(stringAnswer);
                const added = objectAnswer.added;
                label.innerHTML = added ? `Пользователь с почтой <font color="red">${email}</font> и телефоном <font color="green">${number}</font> добавлен!` :
                                          `Пользователь с почтой <font color="red">${email}</font> или телефоном <font color="green">${number}</font> уже существует!`;
                image.src = added ? '../visuals/happy.gif' : '../visuals/shaking.gif';                         
            });
        };
    };
};