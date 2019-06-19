let button = document.querySelector('.button');
let countLi = document.querySelectorAll('li').length;
button.style.background = 'grey';
let gameObj = {
        X: [],
        O: [],
    },
    flag = true,
    fieldValueX = 'X',
    fieldValueO = 'O',
    playerX = 'КРЕСТИКИ',
    playerO = 'НОЛИКИ',
    nobodyWin = true,
    buttonAuto = false;

const comboArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];

let checkResult = (comboArr, playerArr, name) => {
    for (let i = 0; i < comboArr.length; i++) {
        let res = 0;
        for (let j = 0; j < comboArr[i].length; j++) {
            if (playerArr.includes(comboArr[i][j])) res++;
        };
        if (res >= 3) {
            window.removeEventListener('click', clickEvent);
            nobodyWin = false;
            setTimeout(() => {
                alert('ПОБЕДИЛИ ' + name);
                document.location.reload();
            }, 40);

        };
    };
};


let myRandom = () => Math.floor(Math.random() * 9);
/////////////для пуша рандома в объект(массив объекта)////
let ai = (thisObj) => {
    let randomValue = myRandom();
    if (thisObj.X.includes(randomValue) || thisObj.O.includes(randomValue)) {
        return ai(thisObj);
    } else {
        thisObj.O.push(randomValue);
        return randomValue;
    };
};

//////////ставим Х или О в зависимости от флага////
let addText = (field) => {
    if (!field.textContent && flag) {
        field.textContent = fieldValueX;
        flag = false;
    } else if (!field.textContent && !flag) {
        field.textContent = fieldValueO;
        flag = true;
    };
};

////пушим в массив id из события////
let pushFieldValue = (field) => {
    if (!field.textContent && flag) {
        gameObj.X.push(Number(field.getAttribute('data-id')));
    } else if (!field.textContent && !flag) {
        gameObj.O.push(Number(field.getAttribute('data-id')));
    };
}

/// ходит компуктер. Рисуем нолик.Меняем флаг//
let cpuStep = () => {
    let liId = ai(gameObj);
    let field = document.querySelectorAll('.doska > li')[liId];
    field.textContent = fieldValueO;
    flag = true;
}

let clickEvent = (e) => {
    let _this = e.target;
    if (_this.matches('li')) {
        if (buttonAuto && flag && !_this.textContent) {
            pushFieldValue(_this);
            addText(_this);
            checkResult(comboArr, gameObj.X, playerX);
            if ((gameObj.X.length + gameObj.O.length) < countLi) {
                cpuStep();
            };
            checkResult(comboArr, gameObj.O, playerO);
        } else if (!buttonAuto && !_this.textContent) {
            pushFieldValue(_this);
            addText(_this);
            checkResult(comboArr, gameObj.X, playerX);
            checkResult(comboArr, gameObj.O, playerO);
        };
        if ((gameObj.X.length + gameObj.O.length) >= countLi && nobodyWin) {
            setTimeout(() => {
                alert('НИЧЬЯ');
                document.location.reload();
            }, 40);
        };

    };
};

let activateVsPC = () => {
    button.style.background = (!buttonAuto) ? 'green' : 'grey';
    buttonAuto = !buttonAuto;
};

let buttonEvent = button.addEventListener('click', activateVsPC);

let gameEvent = window.addEventListener('click', clickEvent);
