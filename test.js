let synth = new Tone.Synth().toDestination(),
    html = "",
    octave = 4;

// TODO: trigger attack release for each key down so you can play with ascii keyboard.
let notesOne = [{
  "note": 'C',
  "key": 'A',
  "ascii": '#'
}, {
  "note": 'D',
  "key": 'S',
  "ascii": '#'
}, {
  "note": 'E',
  "key": 'D',
  "ascii": '#'
}, {
  "note": 'F',
  "key": 'F',
  "ascii": '#'
}, {
  "note": 'G',
  "key": 'G',
  "ascii": '#'
}, {
  "note": 'A',
  "key": 'H',
  "ascii": '#'
}, {
  "note": 'B',
  "key": 'J',
  "ascii": '#'
}];

let sharpsOne = [{
  "note": 'C#',
  "key": 'W',
  "ascii": '#'
}, {
  "note": 'D#',
  "key": 'E',
  "ascii": '#'
}, {
  "note": 'F#',
  "key": 'T',
  "ascii": '#'
}, {
  "note": 'G#',
  "key": 'Y',
  "ascii": '#'
}, {
  "note": 'A#',
  "key": 'U',
  "ascii": '#'
}];

let notesTwo = [{
  "note": 'C',
  "key": 'K',
  "ascii": '#'
}, {
  "note": 'D',
  "key": 'L',
  "ascii": '#'
}, {
  "note": 'E',
  "key": ';',
  "ascii": '#'
}, {
  "note": 'F',
  "key": "'",
  "ascii": '#'
}];

let sharpsTwo = [{
  "note": 'C#',
  "key": 'O',
  "ascii": '#'
}, {
  "note": 'D#',
  "key": 'P',
  "ascii": '#'
}];

synth.oscillator.type = "sine";

buildKeyboard(octave);

document.getElementById("octave-up").onclick = () => {
  octaveUp();
}

document.getElementById("octave-down").onclick = () => {
  octaveDown();
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

// TODO: one function for both octave up and down
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
      data-note="${note + (octave)}">`;

    let noteSharp = note + '#';

    // If displaying the sharp note, configure to have the correct ASCII key value.
    if (displaySharp) {
      html += `<div class="blacknote" 
        onmousedown="noteDown(this, true)" 
        onmouseup="noteUp(this, true)" 
        onmouseleave="noteUp(this, true)" 
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
  var note = e.dataset.note;
  e.style.background = isSharp ? '#c29417' : '#fff6de';
  synth.triggerAttackRelease(note, "16n");
  event.stopPropagation();
}

