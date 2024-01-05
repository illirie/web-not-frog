import 'normalize.css';
import './index.less';

class Card {
    constructor(id, code, name, url, desc, provider) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.description = desc;
        this.code = code;
        this.provider = provider;
    }
}

function generateId () {
    return Math.random().toString(16).slice(2);
}

let n1 = new Card(generateId(), 1, "Звуковая отвертка", "https://static.insales-cdn.com/images/products/1/6816/42646176/%D0%97%D0%B2%D1%83%D0%BA%D0%BE%D0%B2%D0%B0%D1%8F_%D0%BE%D1%82%D0%B2%D0%B5%D1%80%D1%82%D0%BA%D0%B0_12-%D0%B3%D0%BE_%D0%94%D0%BE%D0%BA%D1%82%D0%BE%D1%80%D0%B0_%D0%9A%D1%82%D0%BE_1.jpg", "отлично жужжит","Галлифрей");
let n4 = new Card(generateId(), 4, "Шепот", "https://i.playground.ru/p/yHTGNxQDRaYQFYkP5dDeeA.jpeg", "лишь четыре выстрела, зато какие", "Иония");
let n3 = new Card(generateId(), 3, "Чужой", "https://horrorzone.ru/uploads/_gallery/75074/alien00.jpg", "...кто решил продавать ксеноморфов?", "???");
let n2 = new Card(generateId(), 2, "Крабсбургер", "https://avatars.dzeninfra.ru/get-zen_doc/1945976/pub_5cfe4d061b104c00afefbcb1_5cfe547885b5e500afe2ecee/scale_1200", "точно вкусный", "Красти Крабс");
let setupData = [n1, n2, n3, n4];

const applicantForm = document.getElementById('card-form')
const setupButton = document.getElementById('setup-button');
const editButton = document.getElementById('edit-button');
const submitButton = document.getElementById('submit-button');

setupButton.addEventListener('click', setupCards);
submitButton.addEventListener('click', pushCard); 
editButton.addEventListener('click', editCard);

async function getName(){ 
    try {
        let user = await fetch('http://localhost:3000/profile').then( (response) =>  response.json());
        document.getElementById('header__text').textContent = user.name + " " + user.group;
    } catch (err) {
        alert("Возникла ошибка при запросе имени автора.");
    } 
}

let i = 0;
function drawCard(card) { 
    const divCard = document.createElement("div");
    divCard.id = `card${i}`;
    divCard.setAttribute('class', "list-block__card");
    document.getElementsByClassName("list-block__list")[0].appendChild(divCard);

    const divCardTop = document.createElement("div");
    divCardTop.id = `cardTop${i}`;
    divCardTop.setAttribute('class', "list-block__card-top");
    document.getElementById(`card${i}`).appendChild(divCardTop);

    const divCardRed = document.createElement("a");
    divCardRed.id = `cardRed${i}`;
    divCardRed.setAttribute('class', "list-block__card-red");
    divCardRed.addEventListener('click', pullForm);
    divCardRed.editId = card.id;
    divCardRed.textContent = 'Edit';
    document.getElementById(`cardTop${i}`).appendChild(divCardRed);

    const divCardCode = document.createElement("div");
    divCardCode.id = `cardId${i}`;
    divCardCode.setAttribute('class', "list-block__card-id");
    divCardCode.textContent = `Код: ${card.code}`;
    document.getElementById(`cardTop${i}`).appendChild(divCardCode);

    const divCardDel = document.createElement("a");
    divCardCode.id = `cardDel${i}`;
    divCardDel.setAttribute('class', "list-block__card-red");
    divCardDel.textContent = `X`;
    divCardDel.addEventListener('click', deleteCard);
    divCardDel.delId = card.id;
    document.getElementById(`cardTop${i}`).appendChild(divCardDel);
    

    const divCardMain = document.createElement("div");
    divCardMain.id = `cardMain${i}`;
    divCardMain.setAttribute('class', "list-block__card-main");
    document.getElementById(`card${i}`).appendChild(divCardMain);

    const divCardImg = document.createElement("img");
    divCardImg.id = `cardImg${i}`;
    divCardImg.setAttribute('class', "list-block__card-img");
    divCardImg.src = `${card.url}`;
    document.getElementById(`cardMain${i}`).appendChild(divCardImg);

    const divCardText = document.createElement("div");
    divCardText.id = `cardText${i}`;
    divCardText.setAttribute('class', "list-block__card-text");
    document.getElementById(`cardMain${i}`).appendChild(divCardText);

    const divCardName = document.createElement("div");
    divCardName.id = `cardName${i}`;
    divCardName.setAttribute('class', "list-block__card-name");
    divCardName.textContent = `${card.name}`;
    document.getElementById(`cardText${i}`).appendChild(divCardName);

    const divCardProvider = document.createElement("div");
    divCardProvider.id = `cardProvider${i}`;
    divCardProvider.setAttribute('class', "list-block__card-provider");
    divCardProvider.textContent = `${card.provider}`;
    document.getElementById(`cardText${i}`).appendChild(divCardProvider);

    const divCardDescription = document.createElement("div");
    divCardDescription.id = `cardDescription${i}`;
    divCardDescription.setAttribute('class', "list-block__card-description");
    divCardDescription.textContent = `${card.description}`;
    document.getElementById(`card${i}`).appendChild(divCardDescription);
    ++i;
}

async function pullForm(event) { 
    try {
        let card = await fetch(`http://localhost:3000/cards/${event.target.editId}`).then((res) => res.json());
        document.getElementsByName('name')[0].value = await card.name;
        document.getElementsByName('url')[0].value = await card.url;
        document.getElementsByName('description')[0].value = await card.description;
        document.getElementsByName('code')[0].value = await card.code;
        document.getElementsByName('provider')[0].value = await card.provider;
        document.getElementById('submit-button').classList.add('invisible');
        document.getElementById('edit-button').classList.remove('invisible');
        document.getElementById('edit-button').editId = card.id;
    } catch(err) {
        alert(err);
    }
}

function serializeForm(formNode, obj) { 
    const data = Array.from((new FormData(formNode)).entries());
    let card = obj;
    for (let i = 0; i < data.length; ++i) {
        let [key, value] = data[i];
        switch (true) {
            case key == 'name':
                card.name = value;
                break;
            case key == 'url':
                card.url = value;
                break;
            case key == 'description':
                card.description = value;
                break;
            case key == 'code':
                card.code = value;
                break;
            case key == 'provider':
                card.provider = value;
                break;
            default: break;
        }
    }
    return card;
}

async function getCards() {
    try {
        let cards = await fetch('http://localhost:3000/cards').then( (response) =>  response.json());
        let skeletons = document.getElementsByClassName('skeleton');
        for (let skeleton of skeletons){
            skeleton.classList.add('invisible');
        }
        for (let card of (await cards ? await cards : []) ){
            drawCard(card);
        }
    } catch (err) {
        alert("Ошибка при запросе карточек с сервера.");
    }
}

async function setupCards () {
    let cards = document.getElementsByClassName('list-block__card');
    for (let card of cards){
        card.classList.add('invisible');
    }
    let skeletons = document.getElementsByClassName('skeleton');
    for (let skeleton of skeletons){
        skeleton.classList.remove('invisible');
    }
    try {
        for (let j = 0; j < setupData.length; ){
            await fetch('http://localhost:3000/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body: JSON.stringify(setupData[j])
            }).then( ++j);
        }
        
    } catch {
        alert("Ошибка при сетапе карточек.");
    }
    getCards();
}

function validateData(data){
    return (data.name && data.code && data.provider)
}
  
async function pushCard(event) { 
    try {
        let card = serializeForm(applicantForm, new Card());
        if (validateData(card)){
            document.getElementById('loader').classList.remove('invisible');
            setupButton.setAttribute('disabled', '');
            submitButton.setAttribute('disabled', '');
            card.id = generateId();
            await fetch('http://localhost:3000/cards', { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(card)
            }).then(() => {
                document.getElementById('loader').classList.add('invisible');
                setupButton.removeAttribute('disabled', '');
                submitButton.removeAttribute('disabled', '');
                drawCard(card);
            });
        } else {
            alert("Введите необходимые поля");
        };      
    } catch (err) {
        alert("Ошибка при добавлении карточки.");
    }
}

async function deleteCard(event) {
    try {
        await fetch(`http://localhost:3000/cards/${event.target.delId}`, {
            method: 'DELETE'
        }).then(() => location.reload())
    } catch (err) {
        alert("Ошибка при удалении карточки.");
    }
    
}

async function editCard(event) {
    let card = serializeForm(applicantForm, new Card());
    try {
        await fetch(`http://localhost:3000/cards/${event.target.editId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(card)
        }).then(() => {
            document.getElementById('submit-button').classList.remove('invisible');
            document.getElementById('edit-button').classList.add('invisible');
            location.reload();
        })
    } catch (err) {
        alert(err);
    }
}

function getFromDBAll() { 
    getName();
    getCards();
}
getFromDBAll();

