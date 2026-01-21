const input = document.getElementById("input");
const Loutput = document.getElementById("left");
const Coutput = document.getElementById("center");
const Routput = document.getElementById("right");
const wpm = document.getElementById("wpm");
const slide = document.getElementById("wpm-slider");
const playback = document.getElementById("playback");
const playPause = document.getElementById("play-pause");
const restart = document.getElementById("restart");

let inp = "";
let rawInp = "";
let word = 0;
let words;
let on = false;
let timer;
let speed = 60000/120;
let prevPlayback = "";
let feed = "";

function nextWord() {

    document.getElementById(word).style.backgroundColor = "";
    document.getElementById(word + 1).style.backgroundColor = "aquamarine";

    word++;

    outputFormat();


}

function outputFormat() {
    let out = words[word]
    console.log(out);
    if (out.length == 1) {
        Loutput.innerHTML = "";
        Coutput.innerHTML = out;
        Routput.innerHTML = "";
    }
    else if (out.length < 5) {
        Loutput.innerHTML = out.substring(0, 1);
        Coutput.innerHTML = out.charAt(1);
        Routput.innerHTML = out.substring(2);
    } else {
        Loutput.innerHTML = out.substring(0, 2);
        Coutput.innerHTML = out.charAt(2);
        Routput.innerHTML = out.substring(3);
    }
}

function set() {
    document.getElementById(word).style.backgroundColor = "";
    playPause.value = "on";
    turnOff();
    playPause.innerHTML = "play";
    word = 0;
    inp = rawInp;
    words = parse(rawInp);
    prevPlayback = "";
    outputFormat();
    playback.innerHTML = feed;
    document.getElementById(word).style.backgroundColor = "aquamarine";

}


function setSpeed(x) {
    console.log(x);
    speed = 60000 / x
}

function turnOn() {
    clearInterval(timer)
    timer = setInterval(nextWord, speed);
}

function turnOff() {
    playPause.value = "on";
    playPause.innerHTML = "play";
    clearInterval(timer);
}

function parse(text) {
    let tokens = text.split(/\W\s*\n*/);
    tokens = tokens.filter((i) => { return i != "" });
    feed = "";
    inp = inp.substring(inp.indexOf(tokens[0]));
    for (let id in tokens) {
        feed += "<span id = '" + id + "'>" + tokens[parseInt(id)] + "</span>";
        inp = inp.substring(tokens[parseInt(id)].length);
        feed += inp.substring(0, inp.indexOf(tokens[parseInt(id) + 1]));
        inp = inp.substring(inp.indexOf(tokens[parseInt(id) + 1]));
    }
    feed += inp;
    console.log(tokens);
    return tokens;
}

//Slider
slide.oninput = function () {
    turnOff();
    wpm.value = this.value;
    setSpeed(slide.value);
}

slide.addEventListener("click", turnOff);


//WPM Number field
wpm.addEventListener("click", turnOff);
wpm.addEventListener("input", () => {
    turnOff();
    slide.value = wpm.value;
    setSpeed(wpm.value);
})

//Text Area
input.addEventListener("click", turnOff);


input.addEventListener("input", () => {

    word = 0;
    inp = input.value;
    rawInp = input.value;
    words = parse(inp);
    playback.innerHTML = feed;
    outputFormat();
    document.getElementById(word).style.backgroundColor = "aquamarine";

});


//Buttons

playPause.addEventListener("click", () => {
    let playState = playPause.value;
    if (playState === "on") {
        playPause.value = "off";
        turnOn();
        playPause.innerHTML = "pause";
    } else {
        turnOff();
    }
});

restart.addEventListener("click", () => {
    set();
})



