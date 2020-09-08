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


function sendMessage() {

  var inputValue = $("#msg-input").val();
  var msgElement = $(".msg-template .msg-row").clone();
  if (inputValue !="") {
    msgElement.find(".msg-text").text(inputValue);
    $(".main-view").append(msgElement);
    $("#msg-input").val("");
  };

}
