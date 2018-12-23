const blessed = require('blessed');
const JsonExplorer = require('./index');
const mock = require('./stubs/swapi.json');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'jsonExplorer';

var box = blessed.box({
  width: '100%',
  height: '90%',
  content: JSON.stringify(mock, "utf-8", 4),
  tags: true,
  scrollable: true,
  alwaysScroll: true,
  mouse: true,
});

var input = blessed.textarea({
    bottom: 0,
    width: '100%',
    height: '10%',
    keyable: true,
    keys: false,
    tags: true,
    style: {
      fg: 'white',
      bg: 'white',
      color: 'black'
    }
  });

screen.append(box);
screen.append(input);

const jxplore = new JsonExplorer();

let inputVal = "";

input.focus();

input.on('keypress', function(data,e) {
    if (data == undefined) return;

    if(e.name === "backspace") {
      inputVal = inputVal.slice(0,-1);
    } else {
      inputVal += data;
    }

    const filteredData = jxplore.initDev(mock, inputVal);

    if (filteredData) {
      box.setContent(JSON.stringify(filteredData, "utf-8", 4));
    }

    if (inputVal.length < 1) {
      box.setContent(JSON.stringify(mock, "utf-8", 4))
    }

    input.setContent(`{black-fg}${inputVal}{/black-fg}`);
    screen.render();
})

input.on('click', function() {
  input.focus();
})

screen.key(['C-d'], function(ch, key) {
  inputVal = "";
  box.setContent(JSON.stringify(mock, "utf-8", 4))
  input.setContent(`{black-fg}${inputVal}{/black-fg}`);
  screen.render();
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Render the screen.
screen.render();