alert("js is on");

// Select elements
const speedUp = document.querySelector("#spup");
const speedDown = document.querySelector("#spd");
const volUp = document.querySelector("#vlup");
const volDown = document.querySelector("#vld");
const videoBtn = document.querySelector("#videoBtn");
const videoInput = document.querySelector("#videoInput");
const videoPlayer = document.querySelector("#main");
const messageDiv = document.querySelector("#message");

// Function to handle video input click
const videoInputHandler = () => {
    videoInput.click();
};

// Function to handle file input change
const acceptFiles = (obj) => {
    const selectedFiles = obj.target.files[0];
    if (selectedFiles) {
        const link = URL.createObjectURL(selectedFiles);
        const video = document.createElement("video");
        video.src = link;
        video.controls = false;  // Ensure default controls are hidden
        video.volume = 0.5;
        video.muted = false;
        video.autoplay = false;
        videoPlayer.innerHTML = '';  // Clear previous video if any
        videoPlayer.appendChild(video);
        video.addEventListener('loadedmetadata', () => {
            const progressBar = document.querySelector('#progressBar');
            progressBar.max = video.duration;
            updateTime();
        });
        video.addEventListener('timeupdate', () => {
            const progressBar = document.querySelector('#progressBar');
            progressBar.value = video.currentTime;
            updateTime();
        });
    }
};

// Function to show message
const showMessage = (text) => {
    messageDiv.textContent = text;
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 2000);
};

// Function to increase volume
const increaseVolume = () => {
    const video = videoPlayer.querySelector("video");
    if (video && video.volume < 1.0) {
        video.volume = Math.min(video.volume + 0.1, 1.0);
        showMessage(`Volume increased to ${(video.volume * 100).toFixed(0)}%`);
    }
};

// Function to decrease volume
const decreaseVolume = () => {
    const video = videoPlayer.querySelector("video");
    if (video && video.volume > 0.0) {
        video.volume = Math.max(video.volume - 0.1, 0.0);
        showMessage(`Volume decreased to ${(video.volume * 100).toFixed(0)}%`);
    }
};

// Function to increase playback speed
const increaseSpeed = () => {
    const video = videoPlayer.querySelector("video");
    if (video) {
        video.playbackRate = Math.min(video.playbackRate + 0.1, 4.0);
        showMessage(`Speed increased to ${video.playbackRate.toFixed(1)}x`);
    }
};

// Function to decrease playback speed
const decreaseSpeed = () => {
    const video = videoPlayer.querySelector("video");
    if (video) {
        video.playbackRate = Math.max(video.playbackRate - 0.1, 0.1);
        showMessage(`Speed decreased to ${video.playbackRate.toFixed(1)}x`);
    }
};

// Add event listeners
speedUp.addEventListener("click", increaseSpeed);
speedDown.addEventListener("click", decreaseSpeed);
videoBtn.addEventListener("click", videoInputHandler);
videoInput.addEventListener("change", acceptFiles);
volUp.addEventListener("click", increaseVolume);
volDown.addEventListener("click", decreaseVolume);

const fullScreenHandler = () => {
    const video = videoPlayer.querySelector("video");
    if (video) {
        video.requestFullscreen();
    }
};

const fullScreen = document.querySelector("#fullScreen");
fullScreen.addEventListener("click", fullScreenHandler);

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");

// Play and Pause buttons
playBtn.addEventListener("click", () => {
    const video = videoPlayer.querySelector("video");
    if (video) {
        video.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
    }
});

pauseBtn.addEventListener("click", () => {
    const video = videoPlayer.querySelector("video");
    if (video) {
        video.pause();
        pauseBtn.style.display = "none";
        playBtn.style.display = "inline";
    }
});

// Update the progress time
const updateTime = () => {
    const video = videoPlayer.querySelector("video");
    const progressBar = document.querySelector('#progressBar');
    const progressTime = document.querySelector('#progressTime');
    if (video) {
        const currentTime = video.currentTime;
        const duration = video.duration;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);
        progressTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
    }
};

// Add event listener for the progress bar
document.querySelector('#progressBar').addEventListener('input', (event) => {
    const video = videoPlayer.querySelector("video");
    if (video) {
        video.currentTime = event.target.value;
    }
});
