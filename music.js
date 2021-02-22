let synth = new Tone.Synth().toDestination(),
    notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    html = "",
    octave = 4;

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
    waveButtons[i].addEventListener('click', function() {
        synth.oscillator.type = this.value;
        if (this.value != synth.oscillator.type) {
          this.style.background = "#6DBEE4";
        } else {
          this.style.background = "#F84D00";
        }
    });
}
// for (let button in waveButtons) {
//   current = waveButtons[button];
//   console.log(current);
//   current.onclick = () => {
//     console.log(this);
//   }
// }

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
  for (var i = 0; i < x; i++) {
    var displaySharp = true;
    var note = notes[i];

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
  
    if (displaySharp) {
      html += `<div class="blacknote" 
        onmousedown="noteDown(this, true)" 
        onmouseup="noteUp(this, true)" 
        onmouseleave="noteUp(this, true)" 
        data-note="${note + '#' + (octave)}"></div>`;
    }
  
    html += '</div>';
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

