import 'normalize.css';
import './index.less';


const applicantForm = document.getElementById('card-form');
const setupButton = document.getElementById('setup-button');
const editButton = document.getElementById('edit-button');
const submitButton = document.getElementById('submit-button');

setupButton.addEventListener('click', setupCards);
submitButton.addEventListener('click', pushCard);
editButton.addEventListener('click', editCard);
window.onload = renderCards;

class Card {
    constructor(id, name, url, description, provider) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.description = description;
        this.provider = provider;
    }
}

function renderCards () {
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let i = 0;
    for (let card of (cards ? cards : []) ){
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
        divCardRed.pos = i;
        divCardRed.textContent = 'Edit';
        document.getElementById(`cardTop${i}`).appendChild(divCardRed);

        const divCardId = document.createElement("div");
        divCardId.id = `cardId${i}`;
        divCardId.setAttribute('class', "list-block__card-id");
        divCardId.textContent = `Id: ${card.id}`;
        document.getElementById(`cardTop${i}`).appendChild(divCardId);

        const divCardDel = document.createElement("a");
        divCardId.id = `cardDel${i}`;
        divCardDel.setAttribute('class', "list-block__card-red");
        divCardDel.textContent = `X`;
        divCardDel.addEventListener('click', deleteCard);
        divCardDel.pos = i;
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
        i++;
    }
}

function setupCards () {
    let n1 = new Card(1, "Звуковая отвертка", "https://static.insales-cdn.com/images/products/1/6816/42646176/%D0%97%D0%B2%D1%83%D0%BA%D0%BE%D0%B2%D0%B0%D1%8F_%D0%BE%D1%82%D0%B2%D0%B5%D1%80%D1%82%D0%BA%D0%B0_12-%D0%B3%D0%BE_%D0%94%D0%BE%D0%BA%D1%82%D0%BE%D1%80%D0%B0_%D0%9A%D1%82%D0%BE_1.jpg", "отлично жужжит","Галлифрей");
    let n4 = new Card(4, "Шепот", "https://i.playground.ru/p/yHTGNxQDRaYQFYkP5dDeeA.jpeg", "лишь четыре выстрела, зато какие", "Иония");
    let n3 = new Card(3, "Чужой", "https://horrorzone.ru/uploads/_gallery/75074/alien00.jpg", "...кто решил продавать ксеноморфов?", "???");
    let n2 = new Card(2, "Крабсбургер", "https://avatars.dzeninfra.ru/get-zen_doc/1945976/pub_5cfe4d061b104c00afefbcb1_5cfe547885b5e500afe2ecee/scale_1200", "точно вкусный", "Красти Крабс");
    let array = [n1, n2, n3, n4];
    try {
        window.localStorage.clear();
        window.localStorage.setItem('cards', JSON.stringify(array));
        location.reload();
    } catch {
        alert("ошибка при попытке засетапить начальные значения карточек");
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
                card.id = value;
                break;
            case key == 'provider':
                card.provider = value;
                break;
            default: break;
        }
    }
    return card;
}
  
function pushCard(event) {
    let card = serializeForm(applicantForm, new Card());
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    cards.push(card);
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
}
  
function deleteCard(event) {
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    cards.splice(event.target.pos, 1);
    window.localStorage.setItem('cards', JSON.stringify(cards));
    location.reload();
}

function pullForm(event) {
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let card = cards.at(event.target.pos);
    document.getElementsByName('name')[0].value = card.name;
    document.getElementsByName('url')[0].value = card.url;
    document.getElementsByName('description')[0].value = card.description;
    document.getElementsByName('code')[0].value = card.id;
    document.getElementsByName('provider')[0].value = card.provider;
    document.getElementById('submit-button').classList.add('invisible');
    document.getElementById('edit-button').classList.remove('invisible');
    document.getElementById('edit-button').pos = event.target.pos;
}

function editCard(event) {
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let card = serializeForm(applicantForm, cards.at(event.target.pos));
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
    document.getElementById('submit-button').classList.remove('invisible');
    document.getElementById('edit-button').classList.add('invisible');
}