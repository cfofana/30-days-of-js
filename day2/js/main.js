
const secondHand = document.querySelector('.sec');
const minuteHand = document.querySelector('.min');
const hourHand = document.querySelector('.hour');
function setDate(){
    var now = new Date();
    
    var seconds = now.getSeconds();
    var secondsDegrees = ((seconds/60)*360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    
    var minutes = now.getMinutes();
    var minutesDegrees = ((minutes/60)*360) + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    
    var hours = now.getHours();
    var hoursDegrees = ((hours/12)*360) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    
   // console.log(hours + " " + hoursDegrees);
    
}
setDate();
setInterval(setDate, 1000);