window.onload = function() {
    const login_input = document.getElementById("login_input");
    const password_input = document.getElementById("password_input");

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

    function getFromBase(login, password) {
        const url = `/get_user?login=${login}&password=${password}`;
        let found;
        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            found = objectAnswer.found;
            if (!found) {
                label.innerHTML = `Логин или почта некорректны. Попробуйте ещё раз!`;
                image.src = "../visuals/sad.gif";
            } else {
                const hobbie = objectAnswer.hobbie;
                const age = objectAnswer.age;
                const account_url = `/account?login=${login}&hobbie=${hobbie}&age=${age}`;
                console.log(1);
                window.open(account_url);
            }                     
        });
        return found;
    }

    function authByCookies(stringAnswer) {
        console.log(stringAnswer);
        const objectAnswer = JSON.parse(stringAnswer);
            if (objectAnswer.exists) {
                const login = objectAnswer.login;
                const password = objectAnswer.password;
                getFromBase(login, password);
            } 
    }

    let url = `/api/delete/`;
    ajaxGet(url, function(stringAnswer){});

    url = `/api/get/`;
    ajaxGet(url, authByCookies);            

    btn.onclick = function() {
        const login = login_input.value;
        const password = password_input.value;
        const found = getFromBase(login, password);
        if (!found) {
            url = `/api/save?login=${login}&password=${password}`;
            ajaxGet(url, function(stringAnswer){});
        }
    }
}