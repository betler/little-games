// Vanilla JS — no jQuery needed anymore, Bootstrap 5 doesn't require it
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const adivinaButton = document.getElementById('adivinaButton');
    const progressBar = document.getElementById('barraProgreso');
    const adivinaInput = document.getElementById('adivinaInput');
    const difficultySelect = document.getElementById('difficultySelect');
    const realValueSpan = document.getElementById('realValueSpan');
    const scoreSpan = document.getElementById('scoreSpan');
    const streakSpan = document.getElementById('streakSpan');
    const resetScoreButton = document.getElementById('resetScoreButton');

    const successModal = new bootstrap.Modal(document.getElementById('sucessModal'));
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));

    let gameActive = false;
    let score = parseInt(localStorage.getItem('guessGameScore'), 10) || 0;
    let streak = parseInt(localStorage.getItem('guessGameStreak'), 10) || 0;
    updateScoreDisplay();

    startButton.addEventListener('click', (e) => {
        e.preventDefault();
        lanzarJuego();
    });

    adivinaButton.addEventListener('click', (e) => {
        e.preventDefault();
        adivinar();
    });

    resetScoreButton.addEventListener('click', (e) => {
        e.preventDefault();
        score = 0;
        streak = 0;
        updateScoreDisplay();
        saveScore();
    });

    function lanzarJuego() {
        const valor = Math.floor(Math.random() * 101);
        progressBar.style.width = '0%';
        progressBar.setAttribute('aria-valuenow', valor);
        progressBar.dataset.realValue = valor;
        adivinaInput.value = '';
        adivinaInput.focus();
        startButton.classList.add('disabled');
        gameActive = true;

        // small delay so the CSS transition actually animates the reveal
        requestAnimationFrame(() => {
            setTimeout(() => {
                progressBar.style.width = valor + '%';
            }, 50);
        });
    }

    function adivinar() {
        if (!gameActive) {
            alert("Press START first, champ.");
            return;
        }

        const guessed = adivinaInput.value;
        if (guessed === '' || isNaN(guessed)) {
            alert("That's not a number!");
            return;
        }

        const real = parseInt(progressBar.dataset.realValue, 10);
        const tolerance = parseInt(difficultySelect.value, 10);
        const difference = Math.abs(real - parseInt(guessed, 10));

        if (difference <= tolerance) {
            realValueSpan.textContent = real + '%';
            score += 10;
            streak += 1;
            successModal.show();
        } else {
            streak = 0;
            errorModal.show();
        }

        gameActive = false;
        startButton.classList.remove('disabled');
        updateScoreDisplay();
        saveScore();
    }

    function updateScoreDisplay() {
        scoreSpan.textContent = score;
        streakSpan.textContent = streak;
    }

    function saveScore() {
        localStorage.setItem('guessGameScore', score);
        localStorage.setItem('guessGameStreak', streak);
    }
});
