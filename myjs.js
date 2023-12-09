console.log("sono nel codice");

// funzione che passa come paramentro l'array dei prodotti per pubblicarne tutte le card
const printProd = function (productArray) {
  const rowContainer = document.getElementById("cardContainer");
  productArray.forEach((product) => {
    const prodcol = document.createElement("div");
    prodcol.innerHTML = `
        <div class="row-col-2 px-2 card-group flex-wrap">
          <div class="card col-2 my-sm-1 my-md-2 ">
            <div class="card-body d-flex flex-column justify-content-evenly" style="height: 400px;">
            <img src=${product.imageUrl} class="card-img-top object-fit-cover" style="height:300px" alt="cover">
              <h6 class="card-title py-2">${product.name}</h5>
              <p class="card-text">Brand: ${product.brand}</p>
              <p class="card-text blockquote-footer">Prezzo: ${product.price}</p>
              <button type="button" class="btn btn-warning" onclick="./detail.html?resourceId=${product._id}">Details</button>
            </div>
          </div>
        </div>
      `;
    rowContainer.appendChild(prodcol);
  });
};

const getProduct = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDhlODBkOGEyMDAwMThhNDhhNjMiLCJpYXQiOjE3MDE5NTk5MTMsImV4cCI6MTcwMzE2OTUxM30.7Nc65XVF224FEFOAOZGGWOdMTSzJOMtiTbdY22tfuHw",
    },
  })
    // valore in uscita della fetch nel primo then tramite parametro callback
    .then((responseObj) => {
      // ricevuto un response object da cui posso leggere proprietà OK della risposta
      if (responseObj.ok) {
        // SE procediamo, ritorniamo l'operazione response.json() = Promise a sua volta
        return responseObj.json();
      } else {
        throw new Error("errore caricamento dati");
      }
    })
    // THEN fa aspettare il tempo necessario alla risoluzione del metodo .json() che fa il parse del body della response
    .then((productObj) => {
      // dentro il parametro di questa callback -> il dato fornito dalle API pronto per essere utilizzato, salvato e disponibile
      // IN QUESTO contesto
      // utilizziamo i dati contenuti nella risposta
      // lancio la funzione che genera le cards (DOM manip)
      printProd(productObj);
    })
    .catch((error) => {
      // Chiamata quando si verifica un errore nella richiesta
      console.error("si è verificato un errore", error);
    });
};

getProduct();
