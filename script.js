{
    const input = document.getElementById("input");
    const output = document.getElementById("text");
    const start = document.getElementById("start");
    const stop = document.getElementById("stop");
    const wpm = document.getElementById("wpm");
    const slide = document.getElementById("wpm-slider");
    const test = document.getElementById("test");

    var inp = "";
    var word = 0;
    var words;
    var on = false;
    var timer;
    var speed = 120;

    function nextWord(){
            word++;
            output.textContent = words[word];
    }

    function setSpeed(x){
        speed = 60000/x
    }

    function turnOn(){
        turnOff();
        timer = setInterval(nextWord, speed);
    }

    function turnOff(){
        clearInterval(timer);
    }

    //Slider
    slide.oninput = function() {
        turnOff();
        wpm.value = this.value;
        setSpeed(slide.value);
    }

    slide.addEventListener("click", turnOff);

    
    //WPM Number field
    wpm.addEventListener("click", turnOff);
    wpm.addEventListener("input", ()=>{
        turnOff();
        slide.value = wpm.value;
        setSpeed(wpm.value);
    })
    
    //Text Area
    input.addEventListener("click", turnOff);

    
    input.addEventListener("input", () => {

        word = 0;
        inp = input.value;
        words = inp.split(" ");
        output.textContent = words[word];
    });

    
    //Buttons
    start.addEventListener("click", turnOn);
    stop.addEventListener("click", turnOff);

    

}