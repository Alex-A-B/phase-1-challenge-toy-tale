let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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


/* on load, GET toy objects.
  - createElement <div class="card"> 
  - card elements are:
      - <h2> = toy name - no class req
      - <img> = src="toyimgURL" class="toy-avatar"
      - <p> = "# Likes"
      - <button> = class"like-btn" id="[toy_id}">like

/* create toy card via submit */

/* create like button which increases #likes */