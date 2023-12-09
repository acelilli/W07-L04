const addressContent = new URLSearchParams(location.search);
const prodId = addressContent.get("prodId");
// fetch
window.onload = () => {
  if (prodId) {
    //SE prod id c'è = mod modifica
    fetch("https://striveschool-api.herokuapp.com/api/product/" + prodId, {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDhlODBkOGEyMDAwMThhNDhhNjMiLCJpYXQiOjE3MDE5NTk5MTMsImV4cCI6MTcwMzE2OTUxM30.7Nc65XVF224FEFOAOZGGWOdMTSzJOMtiTbdY22tfuHw",
      },
    })
      .then((result) => {
        if (result.ok) {
          const deleteButton = document.getElementsByClassName("btn-danger")[0];
          deleteButton.classList.add("d-none");
          return result.json();
        } else {
          throw new Error("ERRORE NEL RECUPERO DETTAGLIO");
        }
      })
      .then((prod) => {
        //Se abbiamo ottenuto i dettagli allora andiamo a popolare il form
        const inputName = document.getElementById("name");
        const inputArtist = document.getElementById("artist");
        const inputDesc = document.getElementById("description");
        const inputImg = document.getElementById("img");
        const inputPrice = document.getElementById("price");
        const inputBrand = document.getElementById("brand");
        // parte in cui li popoliamo con i value
        inputName.value = prod.name;
        inputArtist.value = prod.artist;
        inputDesc.value = prod.description;
        inputImg.value = prod.imgUrl;
        inputPrice.value = prod.price;
        inputBrand.value = prod.brand;
      })
      .catch((error) => {
        console.log("errore", error);
      });
  }
};

//---------- FORM ---------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // questa cosa del dom mi è stata suggerita tho
  const form = document.getElementsByClassName("form")[0];
  form.addEventListener("submit", function (noDefault) {
    noDefault.preventDefault();

    const inputName = document.getElementById("name");
    const inputArtist = document.getElementById("artist");
    const inputDesc = document.getElementById("description");
    const inputImg = document.getElementById("img");
    const inputPrice = document.getElementById("price");
    const inputBrand = document.getElementById("brand");

    // values
    const newProduct = {
      name: document.getElementById("name").value,
      artist: document.getElementById("artist").value,
      brand: document.getElementById("brand").value,
      description: document.getElementById("description").value,
      price: document.getElementById("price").value,
    };
    console.log(newProduct); //check

    const reset = function () {
      inputName.value = "";
      inputArtist.value = "";
      inputDesc.value = "";
      inputImg.value = "";
      inputPrice.value = "";
      inputBrand.value = "";
    };
    let methodToUse = "POST";
    if (prodId) {
      methodToUse = "PUT";
    }
    // POST indirizzo generico
    // POST su indirizzo specifico, quindi:
    let urlToUse = "https://striveschool-api.herokuapp.com/api/product";
    if (prodId) {
      urlToUse = "https://striveschool-api.herokuapp.com/api/product/" + prodId;
    }

    fetch(urlToUse, {
      method: methodToUse,
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDhlODBkOGEyMDAwMThhNDhhNjMiLCJpYXQiOjE3MDE5NTk5MTMsImV4cCI6MTcwMzE2OTUxM30.7Nc65XVF224FEFOAOZGGWOdMTSzJOMtiTbdY22tfuHw",
      }, // nb sia content-type che authorization !!!!
    })
      .then((result) => {
        if (result.ok) {
          alert("Prodotto inserito");
        } else {
          console.log("Prodotto non inserito! Controllare errori");
        }
      })
      .catch((reject) => {
        console.log(reject);
      });
  });

  // Funzione per resettare il form
  const resetButton = document.querySelector(".btn-danger");
  resetButton.addEventListener("click", function () {
    reset();
  });

  const reset = function () {
    const inputName = document.getElementById("name");
    const inputArtist = document.getElementById("artist");
    const inputDesc = document.getElementById("description");
    const inputImg = document.getElementById("img");
    const inputPrice = document.getElementById("price");
    const inputBrand = document.getElementById("brand");

    inputName.value = "";
    inputArtist.value = "";
    inputDesc.value = "";
    inputImg.value = "";
    inputPrice.value = "";
    inputBrand.value = "";
  };
});
// Come volevasi dimostrare non funziona, la console mi da errore alla riga 50 //
// nb non funziona neanche con il primo backoffice che segue passo passo il codice del prof quindi il problema evidentemente sono io che non ho capito (...)
// non funziona più neanche il bottone per svuotare il form, gg

/* --- CONTENT DA AGGIUNGERE ----
Nome: Eleven
Artist: Ive
imgUrl: https://static.wikia.nocookie.net/ive/images/7/72/ELEVEN_album_cover.png/revision/latest?cb=20221102124046
Descrizione: Ive's debut album
Prezzo: 18.99
Brand: Starship Ent
 */
