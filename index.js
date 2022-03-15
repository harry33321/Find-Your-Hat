const startBtn = document.querySelector('#startBtn');
const gameMap = document.querySelector('#gameMap');

startBtn.addEventListener('click', () => {
    startBtn.classList.add('hide');
    gameMap.classList.remove('hide');
    startGame();
});

const startGame = () => {

    const mapHeight = prompt('請設定地圖的高度 (請輸入10-30內的數字)');
    const mapWidth = prompt('請設定地圖的寬度 (請輸入10-30內的數字)');
    const mapHole = prompt('請設定洞穴佔地圖的百份比 (請輸入0-40內的數字)');
    if (mapHeight < 10 || mapHeight > 30 || mapWidth < 10 || mapWidth > 30 || mapHole < 0 || mapHole > 40) {
        alert('請輸入正確的數字!');
        location.reload();
    }

    gameMap.style.width = `${mapWidth * 24}px`;
    gameMap.style.height = `${mapHeight * 24}px`;

    const totalGrid = mapHeight * mapWidth;

    for (let i = 0; i < totalGrid; i++) {
        const grid = document.createElement('div');
        grid.setAttribute('id', `grid-${i}`);
        gameMap.appendChild(grid);
    }

    for (let i = 0; i < mapHole / 100 * totalGrid; i++) {
        let randomId = Math.floor(Math.random() * totalGrid);
        const hole = document.querySelector(`#grid-${randomId}`);
        hole.classList.add('hole');
    }

    for (let i = 0; i < totalGrid; i++) {
        const randomHat = Math.floor(Math.random() * totalGrid);
        const hat = document.querySelector(`#grid-${randomHat}`);
        if (hat.classList.contains('hole') === false) {
            hat.classList.add('hat');
            break;
        }
    }
    const randomPlayer = Math.floor(Math.random() * totalGrid);
    const player = document.querySelector(`#grid-${randomPlayer}`);
    player.classList.add('player');

    let leftBorderArr = [];
    const getLeftBorder = () => {
        let leftBorder = 0;
        for (let i = 0; i < mapHeight; i++) {
            leftBorderArr.push(leftBorder);
            leftBorder += parseInt(mapWidth);
        }
    }
    getLeftBorder();

    let rightBorderArr = [];
    const getRightBorder = () => {
        let rightBorder = mapWidth - 1;
        for (let i = 0; i < mapHeight; i++) {
            rightBorderArr.push(rightBorder);
            rightBorder += parseInt(mapWidth);
        }
    }
    getRightBorder();

    const checkWinLoss = (newPlayerLocationId) => {
        const newPlayerLocation = document.querySelector(`#grid-${newPlayerLocationId}`);
        if (!newPlayerLocation) {
            alert('You out of bounds!');
            location.reload();
        } else if (newPlayerLocation.classList.contains('hat')) {
            alert('You Win!');
            location.reload();
        } else if (newPlayerLocation.classList.contains('hole')) {
            alert('You Lose!');
            location.reload();
        } else {
            newPlayerLocation.classList.add('player');
        }
    }

    // Player Move
    window.addEventListener('keydown', (e) => {
        const move = e.key;
        const playerLocation = document.querySelector('.player');
        const playerLocationId = playerLocation.id.split('-')[1];

        if (move === "ArrowUp") {
            playerLocation.classList.remove('player');
            playerLocation.classList.add('foot');
            const newPlayerLocationId = parseInt(playerLocationId) - parseInt(mapWidth);
            checkWinLoss(newPlayerLocationId);
        } else if (move === "ArrowDown") {
            playerLocation.classList.remove('player');
            playerLocation.classList.add('foot');
            const newPlayerLocationId = parseInt(playerLocationId) + parseInt(mapWidth);
            checkWinLoss(newPlayerLocationId);
        } else if (move === "ArrowLeft") {
            if (leftBorderArr.includes(parseInt(playerLocationId))) {
                alert('You out of bounds!');
                location.reload();
            } else {
                playerLocation.classList.remove('player');
                playerLocation.classList.add('foot');
                const newPlayerLocationId = parseInt(playerLocationId) - 1;
                checkWinLoss(newPlayerLocationId);
            }
        } else if (move === "ArrowRight") {
            if (rightBorderArr.includes(parseInt(playerLocationId))) {
                alert('You out of bounds!');
                location.reload();
            } else {
                playerLocation.classList.remove('player');
                playerLocation.classList.add('foot');
                const newPlayerLocationId = parseInt(playerLocationId) + 1;
                checkWinLoss(newPlayerLocationId);
            }
        }
    });
}