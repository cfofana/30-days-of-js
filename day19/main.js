const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(localMediaStream => {
        console.log(localMediaStream);
        video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
    }).catch(err => {
        console.error(`OH NO!!!`, err);
    })
}



function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    
    return setInterval(() => {
       ctx.drawImage(video, 0, 0, width, height); 
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.1;
        //pixels = redEffect(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    // play the sound
    snap.currentTime = 0;
    snap.play();
    
    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'beautiful');
    link.innerHTML = `<img src="${data}" alt="Beautiful girl" />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for(let i=0; i<pixels.length; i+=4) {
        pixels[i+0] = pixels.data[i + 0] + 200; //RED
        pixels[i+1] = pixels.data[i+1] - 50; //GREEN
        pixels[i+2] = pixels.data[i+2] * 0.5; //BLUE
    }
    return pixels;
}

function rgbSplit(pixels) {
    for(let i=0; i<pixels.length; i+=4) {
        pixels[i-150] = pixels.data[i + 0]; //RED
        pixels[i+100] = pixels.data[i+1]; //GREEN
        pixels[i-550] = pixels.data[i+2]; //BLUE
    }
    return pixels;
}
getVideo();

video.addEventListener('canplay', paintToCanvas);