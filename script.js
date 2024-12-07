const startButton = document.getElementById('startButton');
const player = document.getElementById('player');
const gameArea = document.getElementById('game');

const title = document.getElementById('title2');
let scale = 1;
let growing = true;

function animateText() {
    if (growing) {
        scale += 0.01; // Kasvata skaalausta
        if (scale >= 1.35) { // Kun skaalaus on 1.5, vaihda suuntaa
            growing = false;
        }
    } else {
        scale -= 0.01; // Vähennä skaalausta
        if (scale <= 1) { // Kun skaalaus on 1, vaihda suuntaa
            growing = true;
        }
    }
    title.style.transform = `rotate(-15deg) scale(${scale})`; // Aseta uusi skaalaus
    requestAnimationFrame(animateText); // Kutsu funktiota uudelleen
}

// Aloita animaatio
animateText();
// Aloita peli, kun painetaan "Aloita peli" -painiketta
let gameRunning = false;

startButton.addEventListener('click', startGame);
startButton.addEventListener('click', showGame);
startButton.addEventListener('click', showGame2);

function showGame() {
    const gameElement = document.getElementById('game');
    gameElement.style.display = 'block'; // Muuta display-arvo 'block':ksi
}

function showGame2() {
    const gameElement = document.getElementById('gameContainer');
    gameElement.style.display = 'block'; // Muuta display-arvo 'block':ksi
}

function hidegame() {
    const gameElement = document.getElementById('game');
    gameElement.style.display = 'none'; // Muuta display-arvo 'block':ksi
}

function hideGame2() {
    const gameElement = document.getElementById('gameContainer');
    gameElement.style.display = 'none'; // Muuta display-arvo 'block':ksi
}

function showtitle3() {
    const gameElement = document.getElementById('title3');
    gameElement.style.display = 'block'; // Muuta display-arvo 'block':ksi
}

function startGame() {
    if (gameRunning) return; // Estä pelin käynnistäminen uudelleen
    gameRunning = true;
    console.log('Peli käynnistetty!');
    resetPlayer(); // Palauta pelaaja alkuasentoon
    resetObstacles(); // Poista kaikki esteet
    startObstacleCreation(); // Aloitetaan esteiden luonti
    moveObstacles(); // Aloita esteiden liikkuminen
}

function resetPlayer() {
    // Koodia pelaajan palauttamiseksi alkuasentoon
}

function resetObstacles() {
    // Koodia esteiden poistamiseksi
}

function startObstacleCreation() {
    // Koodia esteiden luomiseksi
}

function moveObstacles() {
    // Koodia esteiden liikkumiseksi
}

function endGame() {
    gameRunning = false; // Estä pelin jatkaminen
    startButton.style.display = 'block'; // Näytä "Aloita peli" -painike
    resetObstacles(); // Poista kaikki esteet
    console.log("Peli päättynyt! Klikkaa 'Aloita peli' aloittaaksesi uudelleen.");
    hidegame();
    hideGame2();
    showtitle3();
}

function resetObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.remove(); // Poista este pelialueelta
    });
    obstacles = []; // Tyhjennä esteiden lista
}

 // Esimerkiksi voit aloittaa pelin logiikan, nollata pelaajan sijainnin jne.
 

// Törmäystarkistuksen kutsuminen
function checkCollisions(player) {
    obstacles.forEach(obstacle => {
        if (obstacle.className === 'obstacle' && isCollisionWithObstacle1(obstacle, player)) {
            endGame(); // Lopeta peli törmäyksen sattuessa
        } else if (obstacle.className === 'obstacle2' && isCollisionWithObstacle2(obstacle, player)) {
            endGame(); // Lopeta peli törmäyksen sattuessa
        }
    });
}

let isJumping = false;
let jumpHeight = 0;
const maxJumpHeight = 170; // Maksimi hyppykorkeus
const gravity = 7; // Painovoima, joka vetää pelaajan alas
let jumpSpeed = 15; // Nopeus, jolla pelaaja hyppää
let obstacleSpeed = 3.73; // Esteiden liikenopeus
let obstacles = []; // Lista esteistä

// Käynnistä peli, kun painetaan "Aloita peli" -painiketta
startButton.addEventListener('click', startGame);
// Lisää klikkikuuntelija pelialueelle, joka aktivoi hyppäyksen
gameArea.addEventListener('click', function() {
    if (gameRunning) {
        jump(); // Suorita hyppy, jos peli on käynnissä
    }
});
// Kuuntele hyppyä (esim. välilyönti)
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') { // Tarkista, onko painettu välilyöntiä
        if (!gameRunning) {
            startGame(); // Käynnistä peli
        }
        jump(); // Suorita hyppy
    }
});

function startGame() {
    if (gameRunning) return; // Estä pelin käynnistäminen uudelleen
    gameRunning = true;
    console.log('Peli käynnistetty!');
    startButton.style.display = 'none'; // Piilotetaan "Aloita peli" -painike
    resetPlayer(); // Palauta pelaaja alkuasentoon
    startObstacleCreation(); // Aloitetaan esteiden luonti
}

function jump() {
    if (isJumping) return; // Estä hyppy, jos pelaaja on jo ilmassa
    isJumping = true;
    jumpHeight = 30; // Nollaa hyppykorkeus

    const jumpInterval = setInterval(() => {
        if (jumpHeight < maxJumpHeight) {
            jumpHeight += jumpSpeed; // Nosta pelaajaa
            player.style.bottom = `${jumpHeight}px`; // Aseta pelaajan sijainti
        } else {
            clearInterval(jumpInterval); // Lopeta ylös hyppääminen
            fall(); // Aloita putoaminen
        }
    }, 20); // Hyppy kesto
}

function fall() {
    const fallInterval = setInterval(() => {
        if (jumpHeight > 37) {
            jumpHeight -= gravity; // Vähennä hyppykorkeutta
            player.style.bottom = `${jumpHeight}px`; // Aseta pelaajan sijainti
        } else {
            clearInterval(fallInterval); // Lopeta putoaminen
            jumpHeight = 0; // Nollaa hyppykorkeus
            isJumping = false; // Hyppy on valmis
            resetPlayer(); // Palauta pelaaja maahan
        }
    }, 20); // Putoamisen kesto
}

function resetPlayer() {
    player.style.bottom = '27px'; // Palauta pelaaja maahan
}

function startObstacleCreation() {
    const minInterval = 3500; // Minimum interval for obstacle creation (ms)
    const maxInterval = 9000; // Maximum interval for obstacle creation (ms)

    function createObstacleWithRandomInterval() {
        createObstacles(); // Luo este
        const randomInterval = Math.floor(Math.random() * (maxInterval - minInterval)) + minInterval; // Satunnainen väli
        setTimeout(createObstacleWithRandomInterval, randomInterval); // Luo uusi este satunnaisessa ajassa
    }

    function createObstacle1() {
        const gameWidth = 400; // Pelialueen leveys
        const obstacleWidth = 30; // Esteen leveys
        const obstacleHeight = 30; // Esteen korkeus
    
        // Luodaan div esteelle
        const obstacle = document.createElement('div'); 
        obstacle.className = 'obstacle'; // Asetetaan esteen tyyppi
        obstacle.style.position = 'absolute';
        obstacle.style.left = `${gameWidth}px`; // Asetetaan este oikeaan reunaan
        obstacle.style.width = `${obstacleWidth}px`; // Asetetaan esteen leveys
        obstacle.style.height = `${obstacleHeight}px`; // Asetetaan esteen korkeus
        obstacle.style.bottom = '30px'; // Asetetaan obstacle1 28 pikseliä korkealle
    
        // Lisätään este pelialueelle ja esteiden listaan
        gameArea.appendChild(obstacle);
        obstacles.push(obstacle); // Lisätään este listaan
    }
    
    function createObstacle2() {
        const gameWidth = 400; // Pelialueen leveys
        const obstacleWidth = 30; // Esteen leveys
        const obstacleHeight = 30; // Esteen korkeus
    
        // Luodaan div esteelle
        const obstacle = document.createElement('div'); 
        obstacle.className = 'obstacle2'; // Asetetaan esteen tyyppi
        obstacle.style.position = 'absolute';
        obstacle.style.left = `${gameWidth}px`; // Asetetaan este oikeaan reunaan
        obstacle.style.width = `${obstacleWidth}px`; // Asetetaan esteen leveys
        obstacle.style.height = `${obstacleHeight}px`; // Asetetaan esteen korkeus
        obstacle.style.bottom = '0px'; // Asetetaan obstacle2 maantasoon
    
        // Lisätään este pelialueelle ja esteiden listaan
        gameArea.appendChild(obstacle);
        obstacles.push(obstacle); // Lisätään este listaan
    }
    
    function isCollisionWithObstacle1(obstacle1, player) {
        const obstacleRect = obstacle1.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();
        
        // Määritä hitboxin offsetit
        const leftOffset = 18.5;   // Voit säätää näitä arvoja tarpeen mukaan
        const rightOffset = 18.5;  
        const topOffset = 7;     
        const bottomOffset = 0;  
        
        return (
            obstacleRect.left + leftOffset < playerRect.right &&
            obstacleRect.right - rightOffset > playerRect.left &&
            obstacleRect.top + topOffset < playerRect.bottom &&
            obstacleRect.bottom - bottomOffset > playerRect.top
        );
    }
    
    function isCollisionWithObstacle2(obstacle2, player) {
        const obstacle2Rect = obstacle2.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();
        
        // Määritä hitboxin offsetit
        const leftOffset = 18.5;   // Voit säätää näitä arvoja tarpeen mukaan
        const rightOffset = 18.5;  
        const topOffset = 0;     
        const bottomOffset = 0;  
        
        return (
            obstacle2Rect.left + leftOffset < playerRect.right &&
            obstacle2Rect.right - rightOffset > playerRect.left &&
            obstacle2Rect.top + topOffset < playerRect.bottom &&
            obstacle2Rect.bottom - bottomOffset > playerRect.top
        );
    }
    
    // Esimerkki esteiden luomisesta ja törmäystarkistuksesta
    function startObstacleCreation() {
        const minInterval = 4000; // Minimum interval for obstacle creation (ms)
        const maxInterval = 8500; // Maximum interval for obstacle creation (ms)
    
        function createObstacles() {
            const randomType = Math.random() < 0.5 ? createObstacle1 : createObstacle2; // Satunnainen esteen tyyppi
            randomType(); // Luo este
            const randomInterval = Math.floor(Math.random() * (maxInterval - minInterval)) + minInterval; // Satunnainen väli
            setTimeout(createObstacles, randomInterval); // Luo uusi este satunnaisessa ajassa
        }
    
        createObstacles(); // Aloita esteiden luominen
    }
    
    // Törmäystarkistuksen kutsuminen
    function checkCollisions(player) {
        obstacles.forEach(obstacle => {
            if (obstacle.className === 'obstacle' && isCollisionWithObstacle1(obstacle, player)) {
        endGame(); // Lopeta peli törmäyksen sattuessa
    } else if (obstacle.className === 'obstacle2' && isCollisionWithObstacle2(obstacle, player)) {
        endGame(); // Lopeta peli törmäyksen sattuessa
    }
});
}

// Muokkaa moveObstacles-funktiota niin, että se kutsuu checkCollisions-funktiota
function moveObstacles() {
obstacles.forEach((obstacle, index) => {
    obstacle.style.left = (parseInt(obstacle.style.left) - obstacleSpeed) + 'px'; // Liikutetaan esteitä vasemmalle

    // Tarkistetaan, onko este poistunut näkyvistä
    if (parseInt(obstacle.style.left) < -30) { // Rajan tarkistus
        obstacle.remove(); // Poistetaan este
        obstacles.splice(index, 1); // Poistetaan este listasta
    }
});

// Tarkista törmäykset pelaajan kanssa
checkCollisions(player);

if (gameRunning) {
    requestAnimationFrame(moveObstacles); // Päivitetään esteiden sijainti seuraavassa ruudunpäivityksessä
}
}

// Aloita esteiden luonti ja liikkuminen heti pelin alussa
startObstacleCreation();
moveObstacles(); // Aloita esteiden liikkuminen
}

// Aloita esteiden luonti ja liikkuminen heti pelin alussa
startObstacleCreation();