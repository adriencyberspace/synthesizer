let synth = new Tone.Synth().toDestination(),
    html = "",
    octave = 4;


let notes = [{
  "note": 'C',
  "key": 'A'
}, {
  "note": 'D',
  "key": 'S'
}, {
  "note": 'E',
  "key": 'D'
}, {
  "note": 'F',
  "key": 'F'
}, {
  "note": 'G',
  "key": 'G'
}, {
  "note": 'A',
  "key": 'H'
}, {
  "note": 'B',
  "key": 'J'
}];

let sharps = [{
  "note": 'C#',
  "key": 'W'
}, {
  "note": 'D#',
  "key": 'E'
}, {
  "note": 'F#',
  "key": 'T'
}, {
  "note": 'G#',
  "key": 'Y'
}, {
  "note": 'A#',
  "key": 'U'
}];

console.log(notes[0].note);

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
  addKeys(notes.length, octave);
  addKeys(4, octave + 1);
  document.querySelector('#keys-container').innerHTML = html;
}


function addKeys(x, octave){
  if (x == 4) {
    notes = [{
      "note": 'C',
      "key": 'K'
    }, {
      "note": 'D',
      "key": 'L'
    }, {
      "note": 'E',
      "key": ';'
    }, {
      "note": 'F',
      "key": "'"
    }];
    sharps = [{
      "note": 'C#',
      "key": 'O'
    }, {
      "note": 'D#',
      "key": 'P'
    }];
    console.log(sharps);
  }

  for (var i = 0; i < x; i++) {
    var displaySharp = true;
    var note = notes[i].note;
    var key = notes[i].key;

    if (x == 4) {
      if (note == 'F') {
        displaySharp = false;
      }
    }
  
    if (note == 'E' || note == 'B') {
      displaySharp = false;
    }

    

    html += `<div class="whitenote" 
      onmousedown="noteDown(this, false)" 
      onmouseup="noteUp(this, false)" 
      onmouseleave="noteUp(this, false)" 
      data-note="${note + (octave)}">`;
  

    let noteSharp = note + '#';

    if (displaySharp) {
      html += `<div class="blacknote" 
        onmousedown="noteDown(this, true)" 
        onmouseup="noteUp(this, true)" 
        onmouseleave="noteUp(this, true)" 
        data-note="${noteSharp + (octave)}">
        <div class="ascii-key-display">`;

      for (var j = 0; j < sharps.length; j++) {
        if (sharps[j].note == noteSharp) {
          html += `${sharps[j].key}`;
        }
      }

      html += `</div></div>`;
    
      }

    
  
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

