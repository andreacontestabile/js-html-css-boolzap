$(document).ready(function() {
// Keypress event (send message)
  $("#msg-input").keypress(function(e) {
    if (e.which == 13) {
      sendMessage();
    }
  });

// Click event (send message)
  $("#send-btn").click(function(){
    sendMessage();
  });

// Input event (contact name search/filter)
  $("#search-field").on("input",function(){
    var input = $(this).val().toLowerCase();
    $(".conversation-item").each(function() {
      var nome = $(this).find(".contact-name").text().toLowerCase();
      if (nome.includes(input)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

// Click event on contact items

  $(".conversation-item").click(function() {
    $(".conversation-item").removeClass("selected");
    $(this).addClass("selected");

    var contactIndex = $(this).index();

    $(".main-view").each(function() {
      $(this).removeClass("active");
    });

    $(".main-view").eq(contactIndex).addClass("active");

    var contactName = $(this).find(".contact-name").text();
    var contactImg = $(this).find(".contact-img img").attr('src');

    $(".active-conversation-info .contact-name h3").text(contactName);
    $("#contact-avatar").attr("src", contactImg);

  })

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

    $(".main-view.active").append(msgElement);
    $("#msg-input").val("");

    getReply();

  };

}

// Funzione Get Reply

var risposte = [
  "Ok",
  "Certo",
  "Bene",
  "Ciao!",
  "Molto bene",
  "Benissimo",
  "Sì, tranquillo",
  "Grande!",
  "Sicuramente",
  "Sono d'accordo",
  "Stai scherzando?",
  "Ci sentiamo più tardi, ok?"
];

function getReply() {

  var statusElement = $(".conversation-last p").text();
  $(".conversation-last p").text("Sta scrivendo...");

  var viewIndex = $(".main-view.active").index() - 1;

  setTimeout(function(){
    var msgElement = $(".msg-template .msg-row").clone();

    var currentTime = getTime();
    var rand = Math.floor(Math.random() * risposte.length);
    var risposta = risposte[rand];

    msgElement.find(".msg-text").text(risposta);
    msgElement.find(".msg-time").text(currentTime);
    msgElement.find(".msg").addClass("ai-msg");

    $(".main-view").eq(viewIndex).append(msgElement);

    $(".conversation-last p").text(statusElement);

    var chat = document.querySelector(".main-view");
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;

  }, 1000);
}
