let bar = document.querySelector('.sliding-bar');
let targetArea = document.querySelector('.target-area');
let image = document.getElementById('noah-image');
let badSound = document.getElementById('bad-sound');
let goodSound = document.getElementById('good-sound');
let sleepiness = 0;

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 32 || event.button === 0) { // Spacebar or mouse left button
        checkHit();
    }
});

function checkHit() {
    const barPosition = bar.getBoundingClientRect();
    const targetPosition = targetArea.getBoundingClientRect();

    if (barPosition.left >= targetPosition.left && barPosition.right <= targetPosition.right) {
        goodSound.currentTime = 0; // Reset the audio to play it again immediately
        goodSound.play();
        sleepiness = Math.min(sleepiness + 1, 14); // Increase sleepiness, max 14
        resetBar(); // Reset the bar position
    } else {
        badSound.currentTime = 0; // Reset the audio to play it again immediately
        badSound.play();
        sleepiness = Math.max(sleepiness - 1, 0); // Decrease sleepiness, min 0
    }

    updateStage();
}

function updateStage() {
    if (sleepiness >= 0 && sleepiness <= 3) {
        image.src = 'Medias/angry.jpg';
        targetArea.style.width = '100px';
        bar.style.animationDuration = '2s';
    } else if (sleepiness >= 4 && sleepiness <= 5) {
        image.src = 'Medias/awake.jpg';
        targetArea.style.width = '80px';
        bar.style.animationDuration = '1.5s';
    } else if (sleepiness >= 6 && sleepiness <= 8) {
        image.src = 'Medias/sleepy.jpg';
        targetArea.style.width = '60px';
        bar.style.animationDuration = '1s';
    } else if (sleepiness >= 9 && sleepiness <= 11) {
        image.src = 'Medias/asleep.png';
        targetArea.style.width = '50px';
        bar.style.animationDuration = '0.8s';
    } else if (sleepiness >= 13) {
        //image.src = 'deep_sleep.jpg';
        alert('Congratulations! You won!');
        let restart = confirm('Do you want to restart?');
        if (restart) {
            sleepiness = 0;
            updateStage(); // Update to the initial stage
        } else {
            window.location.href = 'index.html'; // Replace with your actual homepage URL
        }
    }
}

function resetBar() {
    bar.style.animation = 'none';
    void bar.offsetHeight; // Trigger reflow to reset the animation
    bar.style.animation = null;
}
