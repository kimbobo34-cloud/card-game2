const totalCards = 10;
let tries = 0;
let targetCardId;
let cardChoices = [];

const cardData = {
    1: "카드 1 설명: <경계 아래, 머무는 것들>, 김지아나",
    2: "카드 2 설명: <붉은산수>, 이세현",
    3: "카드 3 설명: <과거에 대한 고찰>, 로랑 그라소",
    4: "카드 4 설명: <심호도 춘수>, 박그림",
    5: "카드 5 설명: <Hi-Ne-Ni VII>, 펑웨이",
    6: "카드 6 설명: <스타벅스>, 지만석",
    7: "카드 7 설명: <범과 모란>, 박생광",
    8: "카드 8 설명: 수정 구슬",
    9: "카드 9 설명: <집단 3>, 문주혜",
    10: "카드 10 설명: <종이의 낙원-깊은 곳으로>, 시리아가리 고토부키"
};

function startGame() {
    tries = 0;
    document.getElementById('tries').textContent = tries;
    document.getElementById('medal').textContent = '-';

    targetCardId = Math.floor(Math.random() * totalCards) + 1;
    document.getElementById('targetCard').src = `img/${targetCardId}.jpg`;

    document.getElementById('cardDescription').textContent = cardData[targetCardId];

    const choices = new Set();
    choices.add(targetCardId);
    while (choices.size < 3) {
        choices.add(Math.floor(Math.random() * totalCards) + 1);
    }
    cardChoices = [...choices].sort(() => Math.random() - 0.5);

    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';
    cardChoices.forEach(id => {
        const card = document.createElement('img');
        card.className = 'card';
        card.dataset.id = id;
        card.src = 'img/back.png';
        card.addEventListener('click', () => flipCard(card));
        cardsContainer.appendChild(card);
    });
}

function flipCard(card) {
    if (!card.src.includes('back.png')) return;

    card.src = `img/${card.dataset.id}.jpg`;
    tries++;
    document.getElementById('tries').textContent = tries;

    if (parseInt(card.dataset.id) === targetCardId) {
        if (tries === 1) document.getElementById('medal').textContent = '금메달';
        else if (tries === 2) document.getElementById('medal').textContent = '은메달';
        else document.getElementById('medal').textContent = '동메달';
    }
}

document.getElementById('restartBtn').addEventListener('click', startGame);

startGame();
