const totalCards = 10;
let tries = 0;
let targetCardId;
let cardChoices = [];

const cardData = {
    1: "카드 1 설명: 전설의 검",
    2: "카드 2 설명: 신비한 방패",
    3: "카드 3 설명: 용의 불꽃",
    4: "카드 4 설명: 마법의 물약",
    5: "카드 5 설명: 은빛 화살",
    6: "카드 6 설명: 고대 책",
    7: "카드 7 설명: 황금 열쇠",
    8: "카드 8 설명: 수정 구슬",
    9: "카드 9 설명: 달빛 반지",
    10: "카드 10 설명: 별빛 망토"
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
