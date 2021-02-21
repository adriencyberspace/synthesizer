var synth = new Tone.PolySynth().toDestination();
  var notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  var html = "";

  for (var octave = 0; octave < 2; octave++) {

    // TODO: Make the keyboard end after the 2nd F
    // i.e. for (var i = 0; i < 4; i++) {
      // add a second octave

    for (var i = 0; i < notes.length; i++) {
      var hasSharp = true;
      var note = notes[i];

      if (note == 'E' || note == 'B') {
        hasSharp = false;
      }

      html += `<div class="whitenote" 
        onmousedown="noteDown(this, false)" 
        onmouseup="noteUp(this, false)" 
        onmouseleave="noteUp(this, false)" 
        data-note="${note + (octave + 4)}">`;

      if (hasSharp) {
        html += `<div class="blacknote" 
          onmousedown="noteDown(this, true)" 
          onmouseup="noteUp(this, true)" 
          onmouseleave="noteUp(this, true)" 
          data-note="${note + '#' + (octave+4)}"></div>`;
      }

      html += '</div>';
    }

}

  document.querySelector('#keys-container').innerHTML = html;

  function noteUp(e, isSharp) {
    e.style.background = isSharp ? 'black' : 'white';
  }

  function noteDown(e, isSharp) {
    var note = e.dataset.note;
    e.style.background = isSharp ? '#c29417' : '#fff6de';
    synth.triggerAttackRelease(note, "16n");
    event.stopPropagation();
  }

  