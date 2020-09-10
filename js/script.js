$(document).ready(function() {

// Keypress event (send message)
  $("#msg-input").keypress(function(e) {
    // Se il tasto premuto è INVIO (codice 13), allora eseguo la funzione che invia il messaggio
    if (e.which == 13) {
      sendMessage();
    }
  });

// Click event (send message)
// Al click sul bottone di invio, eseguo la funzione che invia il messaggio
  $("#send-btn").click(function(){
    sendMessage();
  });

// Input event (contact name search/filter)
// Ad ogni input inviato al campo di ricerca:
  $("#search-field").on("input",function(){
    // Salvo il valore dell'input
    var input = $(this).val().toLowerCase();
    // Seleziono tutti i contatti e per ognuno:
    $(".conversation-item").each(function() {
      // Salvo il nome in minuscolo in una variabile
      var nome = $(this).find(".contact-name").text().toLowerCase();
      // Se il nome include l'input scritto nel campo cerca, allora...
      if (nome.includes(input)) {
        // Mostro il contatto
        $(this).show();
      } else {
        // Altrimenti, lo nascondo
        $(this).hide();
      }
    });
  });

// Click event on contact items
// Al click su ognuno dei contatti:
  $(".conversation-item").click(function() {
    //Rimuovo la classe "selected" da tutti i contatti
    $(".conversation-item").removeClass("selected");
    // E aggiungo la classe "selected" solo all'elemento cliccato
    $(this).addClass("selected");

    // Salvo in una variabile il valore index dell'elemento cliccato
    var contactIndex = $(this).index();
    // Rimuovo la classe "active" da tutte le finestre di chat
    $(".main-view").removeClass("active");
    // Aggiungo la classe "active" solo alla finestra che corrisponde all'index del contatto
    $(".main-view").eq(contactIndex).addClass("active");

    // Salvo in una variabile il nome e l'immagine del contatto cliccato
    var contactName = $(this).find(".contact-name").text();
    var contactImg = $(this).find(".contact-img img").attr('src');
    // Sostituisco i dati/valori nell'header con quelli salvati
    $(".active-conversation-info .contact-name h3").text(contactName);
    $("#contact-avatar").attr("src", contactImg);

  });

// Click event on message arrow
// Al click su una "arrow":
  $(document).on("click", ".arrow a", function(e) {
    // Seleziono il menu opzioni corrispondente
    var thisMenu = $(this).parent().siblings(".msg-menu");
    // Nascondo tutti i menu che non siano quello relativo al messaggio cliccato
    $(".msg-menu").not(thisMenu).hide();
    // Apro/chiudo il menu cliccato in base allo stato attuale
    thisMenu.toggle();
    // Fermo la propagazione dell'evento all'elemento stesso (non al body)
    e.stopPropagation();
  });

// Click event to close msg-menu (click anywhere)
// Al click sul body (ovunque):
  $(document).on("click", "body", function() {
    // Nascondo tutti i menu opzioni dei messaggi
    $(".msg-menu").hide();
  });

// Click event to remove message
// Al click sul pulsante "Elimina messaggio"
  $(document).on("click", "a.msg-del", function() {
    // Elimino la riga messaggio relativa al messaggio cliccato
    $(this).parents(".msg-row").remove();
  });

});

// FUNZIONI

// Funzione Get Time
function getTime() {
  // Genero un nuovo oggetto data
  var date = new Date();
  // Ricavo le ore e i minuti correnti
  var hours = date.getHours();
  var minutes = date.getMinutes();
  // Se i minuti sono minori di 10, aggiungo uno 0 all'inizio
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  // L'orario sarà uguale alle ore più i minuti, separati da :
  var currentTime = hours + ":" + minutes;
  // Ritorno l'orario ottenuto
  return currentTime;
}

// Funzione Send Message
function sendMessage() {
  // Salvo il valore del campo input messaggio
  var inputValue = $("#msg-input").val();
  // Clono e salvo il template messaggio creato nell'html
  var msgElement = $(".msg-template .msg-row").clone();

  // Eseguo le istruzioni solo se il campo input messaggio non è vuoto
  if (inputValue !="") {

    // Genero l'orario corrente
    var currentTime = getTime();

    // Inserisco nel template salvato il valore dell'input e l'orario generato
    msgElement.find(".msg-text").text(inputValue);
    msgElement.find(".msg-time").text(currentTime);
    // Aggiungo la classe "user-msg", perché il messaggio è inviato dall'utente
    msgElement.find(".msg").addClass("user-msg");

    // Aggiungo il messaggio ottenuto alla finestra chat attiva
    $(".main-view.active").append(msgElement);
    // Svuoto il campo input messaggio
    $("#msg-input").val("");

    // Eseguo la funzione che scrolla in basso la chat
    scrollBottom();
    // Eseguo la funzione che genera una risposta automatica
    getReply();

  };

}

// Funzione Get Reply
// Definisco un array di risposte possibili
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
  // Seleziono e salvo l'elemento nell'header relativo all'ultimo accesso
  var statusElement = $(".conversation-last p").text();
  // Appena eseguita la funzione, il testo diventerà "Sta scrivendo..."
  $(".conversation-last p").text("Sta scrivendo...");
  // Salvo l'index della finestra attiva, in cui è stato inviato il messaggio
  var viewIndex = $(".main-view.active").index() - 1;

  // Dopo un secondo...
  setTimeout(function(){
    // Clono e salvo il template relativo al messaggio di chat
    var msgElement = $(".msg-template .msg-row").clone();

    //Genero l'orario corrente
    var currentTime = getTime();

    // Genero un numero casuale fino alla lunghezza dell'array risposte
    var rand = Math.floor(Math.random() * risposte.length);
    // Seleziono una risposta random in base al numero generato
    var risposta = risposte[rand];

    // Al template messaggio, aggiungo la risposta e l'orario generati negli appositi campi
    msgElement.find(".msg-text").text(risposta);
    msgElement.find(".msg-time").text(currentTime);
    // E aggiungo al messaggio la classe "ai-msg", perché è inviata dal computer
    msgElement.find(".msg").addClass("ai-msg");

    // Aggiungo alla finestra di chat attiva (dove l'utente ha scritto l'ultima volta), il messaggio del computer ottenuto
    $(".main-view").eq(viewIndex).append(msgElement);

    // Ripristino il testo dello status nell'header
    $(".conversation-last p").text(statusElement);

    // Eseguo la funzione che scrolla in basso la chat
    scrollBottom();

  }, 1000);
}

// Funzione Scroll to Bottom

function scrollBottom() {
  // Seleziono l'elemento finestra chat
  var chat = $('.main-view');
  // Eseguo uno scroll verso il basso di un valore pari all'altezza totale possibile dello scroll
  chat.scrollTop(chat.prop("scrollHeight"));
}
