import { TennisMatch } from './tennis-match.js';

let match = null;

function updateSetHistory() {
    const history = match.getSetHistory();
    const tbody = document.getElementById('setHistoryTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    history.forEach(set => {
        const row = tbody.insertRow();
        row.insertCell().textContent = set.setNumber;
        row.insertCell().textContent = set[match.player1];
        row.insertCell().textContent = set[match.player2];
        row.insertCell().textContent = set.tiebreak || '-';
    });
}

function updateScoreboard() {
    if (!match) return;

    const score1 = match.getScore(match.player1);
    const score2 = match.getScore(match.player2);

    document.getElementById('point1').textContent = score1.points;
    document.getElementById('game1').textContent = score1.games;
    document.getElementById('set1').textContent = score1.sets;

    document.getElementById('point2').textContent = score2.points;
    document.getElementById('game2').textContent = score2.games;
    document.getElementById('set2').textContent = score2.sets;

    const status = match.getStatus();
    document.getElementById('matchStatus').textContent = status;

    updateSetHistory();

    if (match.winner) {
        document.getElementById('match').classList.add('hidden');
        document.getElementById('gameOver').classList.remove('hidden');
        document.getElementById('winner').textContent = `${match.winner} venceu a partida!`;
        
        // Copy set history to final score
        const finalTbody = document.getElementById('finalScoreTable').getElementsByTagName('tbody')[0];
        const historyTbody = document.getElementById('setHistoryTable').getElementsByTagName('tbody')[0];
        finalTbody.innerHTML = historyTbody.innerHTML;
    }
}

function initializeMatch(event) {
    event.preventDefault();
    
    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;
    const setFormat = parseInt(document.getElementById('setFormat').value);

    match = new TennisMatch(player1Name, player2Name, setFormat);

    document.getElementById('player1Name').textContent = player1Name;
    document.getElementById('player2Name').textContent = player2Name;
    document.getElementById('historyPlayer1').textContent = player1Name;
    document.getElementById('historyPlayer2').textContent = player2Name;
    document.getElementById('finalPlayer1').textContent = player1Name;
    document.getElementById('finalPlayer2').textContent = player2Name;

    document.getElementById('setup').classList.add('hidden');
    document.getElementById('match').classList.remove('hidden');

    updateScoreboard();
}

function addPoint(player) {
    if (!match) return;
    match.addPoint(player);
    updateScoreboard();
}

function startNewGame() {
    document.getElementById('gameOver').classList.add('hidden');
    document.getElementById('setup').classList.remove('hidden');
    document.getElementById('playerForm').reset();
    match = null;
}

// Event Listeners
document.getElementById('playerForm').addEventListener('submit', initializeMatch);
document.getElementById('point1Btn').addEventListener('click', () => addPoint(match.player1));
document.getElementById('point2Btn').addEventListener('click', () => addPoint(match.player2));
document.getElementById('newGame').addEventListener('click', startNewGame);