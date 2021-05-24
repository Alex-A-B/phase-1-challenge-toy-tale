let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  cardGetter();
  console.log("DOM just loaded")
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
  cardButton.className = "like-btn";
  cardButton.addEventListener("click", (e) => {
    e.preventDefault();
    likes(e);
    });
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
        console.log("building Cards for you")
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

const userCreatesToy = () => {
  const newToyName = document.querySelector(".add-toy-form input[name='name']");
  const newToyImg = document.querySelector(".add-toy-form input[name='image']");
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
    .catch(function(error) {
      console.log(error.message)
    })
};

// USERCREATESTOY - removed response elements as doesn't seem to require them as page is reloading.

const toySubmit = document.querySelector(".add-toy-form");

toySubmit.addEventListener("submit", (event) => {
  // event.preventDefault(); // doesn't appear to be preventing default as the page is refreshing.
  userCreatesToy();
  // cardGetter();  <-- don't need to run twice I guess... 
  // console.log("I am listening") <-- used to make sure query selector was finding right element.
});




/* 
  Function to create like button which increases #likes 
  - apply eventListener via a [for (const eachLikeButton of LikeButtons) {} ]?
      ***** added it in the cardBuilder function as that iterates over each card from the db.json.
  - Click event which will send a PATCH request to ID# update the likes number "++likesNumber"
  - update via sending GET request (may be memory hungry so this.ID or something? or YOLO no optimisation)
*/

const likes = (e) => {
  let newNum = parseInt(e.target.previousSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    }, 
    body: JSON.stringify({
    "likes": newNum
    })
  })
  .then(function(response) {
    return response.json()
  })
  .catch(function(error) {
    console.log(error.message)
  })
};