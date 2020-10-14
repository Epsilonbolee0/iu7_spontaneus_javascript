window.onload = function() {
    const email_input = document.getElementById("email_input");

    const btn = document.getElementById("get_btn");
    const label = document.getElementById("result_label");

    const image = document.getElementById("image");

    function ajaxGet(urlString, callback) {
        let request = new XMLHttpRequest();
        request.open("GET", urlString, true);
        request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        request.send(null);
        request.onload = function() {
            callback(request.response);
        };
    };

    btn.onclick = function() {
        const email = email_input.value;
        const url = `/get_record?email=${email}`;
        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const found = objectAnswer.found;
            const surname = objectAnswer.surname;
            const number = objectAnswer.number;
            label.innerHTML = found ? `Пользователь с почтой <font color="red">${email}</font>:<br>\
                                       Фамилия: <font color="green">${surname}</font><br>\
                                       Телефон: <font color="blue">${number}</font><br>`:
                                       `Пользователь с почтой <font color="red">${email}</font> не найден!`;
            image.src = found ? '../visuals/happy.gif' :'../visuals/sad.gif';                         
            });
    };
};