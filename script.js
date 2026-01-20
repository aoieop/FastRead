{
    const input = document.getElementById("inp");
    const output = document.getElementById("tex");
    const start = document.getElementById("start");
    const stop = document.getElementById("stop");
    const peem = document.getElementById("wpm");
    const slide = document.getElementById("wpm-slider");

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

    function turnOn(){
        turnOff();
        timer = setInterval(nextWord, speed);
    }

    slider.oninput = function() {
        turnOff();
        peem.value = this.value;
    }

    slider.addEventListener("click", turnOff);

    function turnOff(){
        clearInterval(timer);
    }

    peem.addEventListener("click", turnOff);
    peem.addEventListener("input", ()=>{
        turnOff();
        speed = 60000/parseInt(peem.value);
    })
    
    input.addEventListener("click", turnOff);

    
    input.addEventListener("input", () => {

        word = 0;
        inp = input.value;
        words = inp.split(" ");
        output.textContent = words[word];
    });

    

    start.addEventListener("click", turnOn);
    stop.addEventListener("click", turnOff);

    

}