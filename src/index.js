let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  cardGetter();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


// to run server -> json-server --watch db.json

/* 
  Function that on load, GETs toy objects.
  - split into two parts - card builder function and the GET request

  ** card builder **
  - createElement <div class="card"> 
  - card elements are: [] - stored in db.JSON
      - <h2> = [toy name] - no class req
      - <img> = src=["toyimgURL"] class="toy-avatar"
      - <p> = "[#] Likes"
      - <button> = class"like-btn" id="[toy_id]">like
  - append to div id="toy-collection"
*/  
  const cardBuilder = (toyInfo) => {
  const cardCollection = document.getElementById("toy-collection");

  const createCard = document.createElement("div");
  createCard.className = "card";
  
  const cardHeader = document.createElement("h2");
  cardHeader.innerText = toyInfo.name
  createCard.appendChild(cardHeader);

  const cardImage = document.createElement("img");
  cardImage.className = "toy-avatar";
  cardImage.src = toyInfo.image;
  createCard.appendChild(cardImage);

  const cardPara = document.createElement("p");
  cardPara.innerText = toyInfo.likes + " likes!";
  createCard.appendChild(cardPara);

  const cardButton = document.createElement("button");
  cardButton.innerText = "♥ Like ♥";
  cardButton.id = toyInfo.id;
  cardButton.class = "like-btn";
  createCard.appendChild(cardButton);

  cardCollection.appendChild(createCard);
  };

  /*
  ** GET cards **
  - Fetch() method GET
  - will be required to update page at new card submit and like clicked as well
*/

  const cardGetter = (url="http://localhost:3000/toys") => {
    fetch(url, {
      method: "GET",
     })
      .then(function(response) {
        return response.json();
      })
      .then(function(toyData) {
        toyData.map( toys => cardBuilder(toys));
      })
      .catch(function(error) {
        console.log(error.message)
      })
    };
  


/* 
  Function that creates toy card via submit 
  - eventListener that preventDefault() action (no refresh of page)
  - will need to do a POST info to db.JSON (example in lab notes)
  - some form of card capture - taking form input into JSON.stringify body text
  - run GET request function
*/
// const newToyName = document.querySelector("name");
// const newToyImg = document.querySelector("image");


const userCreatesCard = () => {
  const newToyName = document.querySelector(".input.input-text input[name='name']");
  const newToyImg = document.querySelector(".input.input-text input[name='image']");
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": newToyName.value,
      "image": newToyImg.value,
      "likes": 0
    })
  })
    .then(function(response) {
        console.log(response.json())
        return response.json();
      
    })
    .then(function(toyData) {
        console.log(toyData)
        toyData.map( toys => cardBuilder(toys));
    })
    .catch(function(error) {
      console.log(error.message)
    })
};

const toySubmit = document.querySelector(".submit");

toySubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  userCreatesCard();
});




/* 
  Function to create like button which increases #likes 
  - apply eventListener via a [for (const eachLikeButton of LikeButtons) {} ]
  - Click event which will send a PATCH request to ID# update the likes number "++likesNumber"
  - update via sending GET request (may be memory hungry so this.ID or something? or YOLO no optimisation)
*/