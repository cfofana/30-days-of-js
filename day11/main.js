// Get the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
//const volume = document.querySelector('.player__slider');
//const playBackRate = document.querySelector('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// the functions
function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function updateButton(){
    const icon = this.paused ? 'A' : 'B';
    toggle.textContent = icon;
}
function skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
    video[this.name] = [this.value];
}

// add event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

