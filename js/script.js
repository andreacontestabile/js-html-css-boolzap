$(document).ready(function() {

  $("#msg-input").keypress(function(e) {
    if (e.which == 13) {
      sendMessage();
    }
  });

  $("#send-btn").click(function(){
    sendMessage();
  });
});

// FUNZIONI

// Funzione Get Time
function getTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var currentTime = hours + ":" + minutes;

  return currentTime;
}

// Funzione Send Message
function sendMessage() {

  var inputValue = $("#msg-input").val();
  var msgElement = $(".msg-template .msg-row").clone();
  if (inputValue !="") {

    var currentTime = getTime();

    msgElement.find(".msg-text").text(inputValue);
    msgElement.find(".msg-time").text(currentTime);
    msgElement.find(".msg").addClass("user-msg");

    $(".main-view").append(msgElement);
    $("#msg-input").val("");

    getReply();
  };

}

// Funzione Get Reply
function getReply() {
  setTimeout(function(){
    var msgElement = $(".msg-template .msg-row").clone();
    var currentTime = getTime();

    msgElement.find(".msg-text").text("Questa è una risposta");
    msgElement.find(".msg-time").text(currentTime);
    msgElement.find(".msg").addClass("ai-msg");

    $(".main-view").append(msgElement);

  }, 1000);
}
