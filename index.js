function myFunction(newName) {
  var name = newName || document.getElementById("name").value;

  var low = name.toLowerCase();
  var trim = low.trim();
  var clean = trim.replaceAll(".", "");

  document.getElementById("name").value = clean;
  var answer;
  if (clean === "randy") {
    answer = clean + ", Good name";
  } else if (trim === "david") {
    answer = clean + ", you smell bad";
  } else if (trim === "beth") {
    answer = clean + ", you smell bad";
  } else if (trim === "randall") {
    answer = clean + ", you smell good like chery blossoms";
  } else if (trim === "evie") {
    answer = clean + ", you smell worse than beth";
  } else if (trim === "evilin") {
    answer =
      clean + ", you smell like fresh cut wood. just by the way that is good";
  } else {
    answer = clean + ", bad name";
  }
  document.getElementById("answer").innerHTML = answer;
  say(answer);
}

function say(message) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = message;
  window.speechSynthesis.speak(msg);
}

function hear() {
  // new speech recognition object
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;

  // This runs when the speech recognition service starts
  recognition.onstart = function () {
    console.log("We are listening. Try speaking into the microphone.");
  };

  recognition.onspeechend = function () {
    // when user is done speaking
    recognition.stop();
  };

  var finalTranscripts = "";
  recognition.onresult = function (event) {
    var interimTranscripts = "";
    for (var i = event.resultIndex; i < event.results.length; i++) {
      var transcript = event.results[i][0].transcript;
      transcript.replace("\n", "<br>");

      if (event.results[i].isFinal) {
        myFunction(transcript);
        finalTranscripts += transcript;
      } else {
        interimTranscripts += transcript;
      }
    }
  };

  recognition.start();
}
