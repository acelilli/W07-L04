const sourceId = new URLSearchParams(window.location.search);
// ottendiamo il valore del parametro sourceId
console.log("RESOURCE ID: ", sourceId);

// se c'è valore dentro la variabile sourceId viene costruito ULR
const URL = sourceId
  ? "https://striveschool-api.herokuapp.com/api/product/" + sourceId
  : "https://striveschool-api.herokuapp.com/api/product/";
// nb: il ? Può essere
// 1. forma compatta di if/else (operatore ternario),
// 2. Valori opzionali? Cioè se proprietà/metodi esistono prima di accedervi
// dato URL quale metodo uso?
const method = sourceId ? "PUT" : "POST";
//determino il metodo da usare
console.log("method: ", method);

// funzione che parte quando il DOM è carcato (nb: usato come parametro) che determinano? le operazioni di modifica/creazione
window.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector("button[type='submit']");
  const deleteBtn = document.querySelector("button[type='button'].btn-danger");
  if (sourceId) {
    //  bottoni submit
    submitBtn.classList.remove("btn-danger");
    submitBtn.classList.add("btn-success");
    submitBtn.innerText = "Modifica prodotto";
    // pulsante  delete
    deleteBtn.classList.remove("d-none");
    // spinner caricamento
    isLoading(true);
    // GET su endpoint con id incorporato
    fetch(URL)
      .then((resp) => resp.json())
      .then(({ name, artist, imageUrl, brand, description, price }) => {
        // destrutturazione sui parametri della callback
        // prepopolazione campi input con valori dal server per evitare errori di battitura
        document.getElementById("name").value = name;
        document.getElementById("artist").value = artist;
        document.getElementById("img").value = imageUrl;
        document.getElementById("brand").value = brand;
        document.getElementById("description").value = description;
        document.getElementById("price").value = price;
      }) // spegnimento spinner
      .finally(() => isLoading(false));
  }
});

// funzione che raccoglie i dati, li invia all'API e gestisce la risposta
const handleSubmit = (event) => {
  event.preventDefault();

  const form = event.target;
  // creazione newProduct ad ogni SUMBIT del form
  const newProduct = {
    name: document.getElementById("name").value,
    brand: document.getElementById("brand").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
  };
  // again spinner caricamento
  isLoading(true);
  // Come siamo arrivati su questa pagina?
  // Creazione = url normale,
  // Modifica = integrato anche l'id
  // deciso dal ternary operator alla creazione variabile "URL" sopra
  fetch(URL, {
    method, // => method: method
    body: JSON.stringify(newProduct), // stringhifizzazione dell'oggetto nativo per non avere "[object Object]"
    // Header impo: Content-Type (specifica formato invio, o server non lo riconosce !!!!)
    // l'Authorization header serve in caso di API che richiedono autenticazione tramite una API Key
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDhlODBkOGEyMDAwMThhNDhhNjMiLCJpYXQiOjE3MDE5NTk5MTMsImV4cCI6MTcwMzE2OTUxM30.7Nc65XVF224FEFOAOZGGWOdMTSzJOMtiTbdY22tfuHw",
    }, // nb lasciare sia content-type che, in questo caso, inserire authorization !!!!
  })
    .then((resp) => resp.json())
    .then((createdObj) => {
      // Aspettiamo il valore di createdObj per le info generate dal server ad es. l'_id

      // Come siamo arrivati => messaggio alla fine della richiesta

      if (sourceId) {
        showAlert("Modificata risorsa: " + createdObj._id + "!");
      } else {
        showAlert("Creata risorsa: " + createdObj._id + "!");

        // pulizia dei campi SOLO in CREAZIONE (POST)
        form.reset();
      }
    })
    //spinner off
    .finally(() => isLoading(false));
};

// funzione x visualizzazione spinner con boolean come parametro
const isLoading = (boolean) => {
  const spinner = document.querySelector(".spinner-border");
  // true = rimuove d-none (quindi appare)
  // false = mostra d-none (quindi scompare)
  if (boolean) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

//funzione x gli alert custom
const showAlert = (message, colorCode = "primary") => {
  const alertBox = document.getElementById("alert-box");
  alertBox.innerHTML = `<div class="alert alert-${colorCode}" role="alert">
                                ${message}
                                </div>`;

  // Sparizione alert dopo 5sec
  setTimeout(() => {
    alertBox.innerHTML = "";
  }, 5000);
};

//per cancellare
const handleDelete = () => {
  const hasConfirmed = confirm("Vuoi eliminare il prodotto?");
  // se si rimozione (+ spinner)
  if (hasConfirmed) {
    isLoading(true);

    fetch(URL, {
      method: "DELETE",
    }) // Dopo assere eliminata:
      .then((resp) => {
        // Utile x sapere quando il server risponde x conferma
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((deletedObj) => {
        showAlert("hai eliminato la risorsa " + deletedObj.name + " che aveva id: " + deletedObj._id, "danger");
        // alert custom = ci serve setTimeout per forzare attesa
        setTimeout(() => {
          window.location.assign("./index.html");
        }, 5000);
      })
      .finally(() => {
        isLoading(false); // off spinner
      });
  }
};
