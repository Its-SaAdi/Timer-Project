let timerInterval;
const timerArea = document.getElementById("timearea");
const playBtn = document.getElementById("play-btn");
const resetBtn = document.getElementById("reset-btn");
const stopBtn = document.getElementById("stop-btn");
let hours, minutes, seconds;
let isTimerRunning = false;
let remainingTime = 0;
let timeLeft = 0;

resetBtn.addEventListener('click', function() {
    hours = +prompt("Enter hours: ", "0");
    minutes = +prompt("Enter minutes: ", "0");
    seconds = +prompt("Enter seconds: ", "0");

    if (checkTimerValues(hours, minutes, seconds)) {
        return;
    }
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    isTimerRunning = false;
    timerArea.textContent = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    remainingTime = 0;
    console.log(hours, minutes, seconds);
});

function checkTimerValues(hours, minutes, seconds) {
    if ((hours <= 0 && minutes <= 0 && seconds <= 0) || (hours > 24 && minutes > 60 && seconds > 60)) {
        alert("Enter valid hours, minutes, and seconds.");
        return true;
    }

    if (hours > 24 || hours < 0 || minutes > 60 || minutes < 0 || seconds > 60 || seconds < 0) {
        alert("Enter values in the normal range (0 - 60)");
        return true;
    }
}

playBtn.addEventListener('click', function() {
    if (hours === undefined && minutes === undefined && seconds === undefined) {
        alert("Set a timer before starting.");
        return;
    }
    if (isTimerRunning) {
        alert("Timer is already running. Create another timer to continue.");
        return;
    }

    let totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalTimeInSeconds) {        
        timeLeft = remainingTime || totalTimeInSeconds - 1; 

        isTimerRunning = true;

        timerInterval = setInterval(function() {
            let hoursLeft = Math.floor(timeLeft / 3600);
            let minutesLeft = Math.floor((timeLeft % 3600) / 60);
            let secondsLeft = timeLeft % 60;

            console.log(`Time Left: ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
            timerArea.textContent = `${hoursLeft < 10 ? "0" + hoursLeft : hoursLeft}:${minutesLeft < 10 ? "0" + minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`;

            if (timeLeft === 0) {
                clearInterval(timerInterval);
                isTimerRunning = false;
                remainingTime = 0;
                new Audio("../Jaldi Wahan Se Hato - Notification Tone.mp3").play();
                hours = minutes = seconds = 0;
            }

            timeLeft--;
        }, 1000);
    } else {
        alert("Set a timer to continue..");
    }

});

stopBtn.addEventListener('click', function() {
    if (!isTimerRunning) {
        alert("Timer is already stopped. Set a timer to continue.");
        return;
    } else {
        clearInterval(timerInterval);
        isTimerRunning = false;
        remainingTime = timeLeft;
    }
});
