const totalCards = 10;
let tries = 0;
let targetCardId;
let cardChoices = [];

function startGame() {
    tries = 0;
    document.getElementById('tries').textContent = tries;
    document.getElementById('medal').textContent = '-';

    // 보기 카드 랜덤 선택
    targetCardId = Math.floor(Math.random() * totalCards) + 1;
    document.getElementById('targetCard').src = `img/${targetCardId}.jpg`;

    // 하단 카드 3장 랜덤 배치 (1장은 보기 카드)
    const choices = new Set();
    choices.add(targetCardId);
    while (choices.size < 3) {
        choices.add(Math.floor(Math.random() * totalCards) + 1);
    }
    cardChoices = [...choices].sort(() => Math.random() - 0.5); // 섞기

    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';
    cardChoices.forEach(id => {
        const card = document.createElement('img');
        card.className = 'card';
        card.dataset.id = id;
        card.src = 'img/back.jpg';
        card.addEventListener('click', () => flipCard(card));
        cardsContainer.appendChild(card);
    });
}

function flipCard(card) {
    if (!card.src.includes('back.jpg')) return; // 이미 뒤집힌 카드 무시

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

// 게임 시작
startGame();
