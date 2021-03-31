// TODO: Make it poly

let synth = new Tone.Synth().toDestination(),
    html = "",
    octave = 4;

let notesOne = [{
  "note": 'C',
  "key": 'A',
  "ascii": '65'
}, {
  "note": 'D',
  "key": 'S',
  "ascii": '83'
}, {
  "note": 'E',
  "key": 'D',
  "ascii": '68'
}, {
  "note": 'F',
  "key": 'F',
  "ascii": '70'
}, {
  "note": 'G',
  "key": 'G',
  "ascii": '71'
}, {
  "note": 'A',
  "key": 'H',
  "ascii": '72'
}, {
  "note": 'B',
  "key": 'J',
  "ascii": '74'
}];

let sharpsOne = [{
  "note": 'C#',
  "key": 'W',
  "ascii": '87'
}, {
  "note": 'D#',
  "key": 'E',
  "ascii": '69'
}, {
  "note": 'F#',
  "key": 'T',
  "ascii": '84'
}, {
  "note": 'G#',
  "key": 'Y',
  "ascii": '89'
}, {
  "note": 'A#',
  "key": 'U',
  "ascii": '85'
}];

let notesTwo = [{
  "note": 'C',
  "key": 'K',
  "ascii": '75'
}, {
  "note": 'D',
  "key": 'L',
  "ascii": '76'
}, {
  "note": 'E',
  "key": ';',
  "ascii": '186' 
}, {
  "note": 'F',
  "key": "'",
  "ascii": '222'
}];

let sharpsTwo = [{
  "note": 'C#',
  "key": 'O',
  "ascii": '79'
}, {
  "note": 'D#',
  "key": 'P',
  "ascii": '80'
}];

synth.oscillator.type = "sine";

buildKeyboard(octave);

// On mouse down and up - octave and button color change
document.getElementById("octave-up").onmousedown = () => {
  document.querySelector('#octave-up').style.background = "#6DBEE4";
  octaveUp();
}

document.getElementById("octave-up").onmouseup = () => {
  document.querySelector('#octave-up').style.background = "#F84D00";
  octaveUp();
}

document.getElementById("octave-down").onmousedown = () => {
  document.querySelector('#octave-down').style.background = "#6DBEE4";
  octaveDown();
}

document.getElementById("octave-down").onmouseup = () => {
  document.querySelector('#octave-down').style.background = "#F84D00";
  octaveDown();
}

// ASCII Octave Up and Down
document.onkeydown = (e) => {
  e = e || window.event;
  console.log(e.keyCode);
  if (e.keyCode == 49) {
    document.querySelector('#octave-down').style.background = "#6DBEE4";
    octaveDown();
  }
  if (e.keyCode == 50) {
    document.querySelector('#octave-up').style.background = "#6DBEE4";
    octaveUp();
  }
}

// Change button color back onkeyup
document.onkeyup = (e) => {
  e = e || window.event;
  console.log(e.keyCode);
  if (e.keyCode == 49) {
    document.querySelector('#octave-down').style.background = "#F84D00";
  }
  if (e.keyCode == 50) {
    document.querySelector('#octave-up').style.background = "#F84D00";
  }
}

var waveButtons = document.getElementsByClassName('change-wave');
for (var i = 0; i < waveButtons.length; i++) {
  let selected = 'wave-selected';
  waveButtons[i].addEventListener('click', function() {
    synth.oscillator.type = this.value;

    // Remove selected class from all buttons, then add it to the currently selected button
    for (let sibling of this.parentNode.children) {
      sibling.classList.remove(selected);
    }
    this.classList.add(selected);

  });
}

function octaveUp() {
  octave += 1;
  buildKeyboard(octave);
}

function octaveDown() {
  octave -= 1;
  buildKeyboard(octave);
}

function buildKeyboard(octave) {
  html = "";
  addKeys(notesOne.length, octave, notesOne, sharpsOne);
  addKeys(notesTwo.length, octave + 1, notesTwo, sharpsTwo);
  document.querySelector('#keys-container').innerHTML = html;
}


function addKeys(x, octave, notes, sharps){

  // For every note we're iterating over:
  for (var i = 0; i < x; i++) {
    var displaySharp = true;
    var note = notes[i].note;
    var key = notes[i].key;
    var ascii = notes[i].ascii;

    // If second F, don't display sharp
    if (x == 4) {
      if (note == 'F') {
        displaySharp = false;
      }
    }
    
    // E# and B# don't exist, so don't display:
    if (note == 'E' || note == 'B') {
      displaySharp = false;
    }

    // HTML render for all white and black keys:
    html += `<div class="whitenote" 
      onmousedown="noteDown(this, false)" 
      onmouseup="noteUp(this, false)" 
      onmouseleave="noteUp(this, false)"
      data-ascii="${ascii}"
      data-note="${note + (octave)}">`;

    let noteSharp = note + '#';

    // If displaying the sharp note, configure to have the correct ASCII key value.
    if (displaySharp) {
      html += `<div class="blacknote" 
        onmousedown="noteDown(this, true)" 
        onmouseup="noteUp(this, true)"
        onmouseleave="noteUp(this, true)"
        data-ascii="${ascii}"
        data-note="${noteSharp + (octave)}">
        <div class="ascii-key-display">`;

      // i.e. if C# = C#, get the correct 'key' value and render it in HTML 
      for (var j = 0; j < sharps.length; j++) {
        if (sharps[j].note == noteSharp) {
          html += `${sharps[j].key}`;
        }
      }

      // Close the divs
      html += `</div></div>`;
    }
    
    // White note inner HTML
    html += `<div class="ascii-key-display">${key}</div></div>`;
  }
}

function noteUp(e, isSharp) {
  e.style.background = isSharp ? 'black' : 'white';
}

function noteDown(e, isSharp) {
  console.log(e)
  var ascii = e.dataset.ascii
  var note = e.dataset.note;
  e.style.background = isSharp ? '#c29417' : '#fff6de';
  synth.triggerAttackRelease(note, "16n");
  event.stopPropagation();
}

// TODO: Refactor this with noteUp and noteDown
// Add keydown function / ascii playability
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(event) {
  keyCode = event.keyCode;

  // NotesOne
  for (var i = 0; i < notesOne.length; i++) {
    var note = notesOne[i].note
    var ascii = notesOne[i].ascii

    if (ascii == keyCode) {
      note = note + (octave);
      synth.triggerAttackRelease(note, "16n");
      document.querySelector(`.whitenote[data-ascii="${ascii}"]`).style.background = '#fff6de';
    }
  }

  // NotesTwo
  for (var i = 0; i < notesTwo.length; i++) {
    var note = notesTwo[i].note
    var ascii = notesTwo[i].ascii

    if (ascii == keyCode) {
      note = note + (octave + 1);
      synth.triggerAttackRelease(note, "16n");
      document.querySelector(`.whitenote[data-ascii="${ascii}"]`).style.background = '#fff6de';
    }
  }

  // SharpsOne
  for (var i = 0; i < sharpsOne.length; i++) {
    var note = sharpsOne[i].note
    var ascii = sharpsOne[i].ascii

    if (ascii == keyCode) {
      note = note + (octave);
      console.log(note);
      synth.triggerAttackRelease(note, "16n");
      document.querySelector(`.blacknote[data-note="${note}"]`).style.background = '#c29417';

    }
  }

  // SharpsTwo
  for (var i = 0; i < sharpsTwo.length; i++) {
    var note = sharpsTwo[i].note
    var ascii = sharpsTwo[i].ascii

    if (ascii == keyCode) {
      note = note + (octave + 1);
      synth.triggerAttackRelease(note, "16n");
      document.querySelector(`.blacknote[data-note="${note}"]`).style.background = '#c29417';
    }
  }
}

function keyUp() {
  // NotesOne
  for (var i = 0; i < notesOne.length; i++) {
    var ascii = notesOne[i].ascii
    document.querySelector(`.whitenote[data-ascii="${ascii}"]`).style.background = 'white';
    }

  // NotesTwo
  for (var i = 0; i < notesTwo.length; i++) {
    var ascii = notesTwo[i].ascii
    document.querySelector(`.whitenote[data-ascii="${ascii}"]`).style.background = 'white';
    }
  
  // SharpsOne
  for (var i = 0; i < sharpsOne.length; i++) {
    var note = sharpsOne[i].note
    note = note + octave
    document.querySelector(`.blacknote[data-note="${note}"]`).style.background = 'black';
    }

  // SharpsTwo
  for (var i = 0; i < sharpsTwo.length; i++) {
    var note = sharpsTwo[i].note
    note = note + (octave + 1)
    document.querySelector(`.blacknote[data-note="${note}"]`).style.background = 'black';
    }
  }