const URL = "https://striveschool-api.herokuapp.com/api/product/";

const addressBarContent = new URLSearchParams(location.search);
const prodId = addressBarContent.get("prodId");
console.log("RESOURCE ID: ", id);

window.onload = () => {
  fetch(
    URL,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDhlODBkOGEyMDAwMThhNDhhNjMiLCJpYXQiOjE3MDE5NTk5MTMsImV4cCI6MTcwMzE2OTUxM30.7Nc65XVF224FEFOAOZGGWOdMTSzJOMtiTbdY22tfuHw",
      },
    } + id
  )
    .then((resp) => resp.json())
    .then((prod) => {
      const { name, artist, img, description, brand, price, _id } = prod;

      const containerText = document.getElementById("allDetails");
      // cosa ci metto?
      container.innerHTML = `
            <div class="card col-2 my-sm-1 my-md-2 ">
    <div class="card-body d-flex flex-column justify-content-evenly" style="height: 400px;">
    <img src=${product.imageUrl} class="card-img-left object-fit-cover" style="height:450px" alt="cover">
      <h6 class="card-title py-2">${product.name}</h5>
       <p class="card-text">Artist: ${product.artist}</p>
      <p class="card-text">Description: ${product.description}</p>
      <p class="card-text">Brand: ${product.brand}</p>
      <p class="card-text blockquote-footer">Price: ${product.price}</p>
    </div>
  </div>
   `;
    })
    .catch((err) => console.log(err));
};

/*
    Non funziona manco questo, ye
  */
