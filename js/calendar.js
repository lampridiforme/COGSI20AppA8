let editMode = false;

function goto(url) {
  window.location = url;
}

function toggleEditMode() {
  let closebuttons = document.getElementsByClassName('closebutton');
  editMode = !editMode;

  if (editMode) {
    editbutton.classList.add('text-warning');
    for (let i = 0; i < closebuttons.length; i++) {
      closebuttons[i].classList.remove('hideme');
    }

    // remove onclick goto for recipes
    let thumbnails = document.getElementsByClassName('recipeblock');
    console.log(thumbnails);
    for (let i = 0; i < thumbnails.length; i++) { 
      console.log(thumbnails[i]);
      thumbnails[i].onclick = () => console.log('sorry, nothing');
    }
  } 
  else {
    editbutton.classList.remove('text-warning');
    for (let i = 0; i < closebuttons.length; i++) {
      closebuttons[i].classList.add('hideme');
    }

    // add onclick goto for recipes
    let thumbnails = document.getElementsByClassName('recipeblock');
    // based on the recipeid of the item that was clicked, grab the corresponding 
    // entry in the mock database and save the url to localstorage, 
    // then goto recipeResult.html
    for (let i = 0; i < thumbnails.length; i++) { 
      thumbnails[i].onclick = () => {
        console.log("clicked");
        console.log(thumbnails[i]);
        let recipeId = thumbnails[i].getAttribute('recipeid');
        console.log('recipeId: ' + recipeId);
        // find corresponding recipe
        for (let j = 0; j < mockRecipeData.length; j++) {
          if (mockRecipeData[j].id == recipeId) { // loose equality so "0" == 0 
            console.log('found the url: ' + mockRecipeData[j].url);
            localStorage.setItem('recipeURL', mockRecipeData[j].url);
            goto('./recipeResultHome.html');
          }
        }
      }
    };
  }

}

function addToDay(recipe) {
  let newDiv = document.createElement("div");
  // newDiv.innerHTML = "<a href='" + recipe.url + "'>" + recipe.name + "</a>";
  newDiv.style.backgroundImage = "url(\'" + recipe.image + "\')";
  newDiv.style.backgroundSize = "cover";
  // set onclick event to go to the url from the recipe in the DB entry 
  // that matches the current id
  newDiv.onclick = () => {
    for (let i = 0; i < mockRecipeData.length; i++) {
      if (recipe.id == mockRecipeData[i].id) {
        localStorage.setItem('recipeURL', mockRecipeData[i].url);
        break;
      }
    }
    goto("./recipeResultHome.html")
  };
  console.log(recipe.image);
  let newCloseButton = document.createElement("div");
  newCloseButton.innerHTML = "x";
  newCloseButton.classList.add('hideme');
  newCloseButton.classList.add('closebutton');
  // I am breaking SO MANY design rules here!
  newDiv.setAttribute('recipeid', recipe.id);
  newDiv.appendChild(newCloseButton);
  newDiv.classList.add('recipeblock');

  // testing something out
  //newDiv.onclick = () => deleteEntry(newDiv.getAttribute('recipeid');
  newCloseButton.onclick = () => {if (editMode) deleteEntry(recipe.id)};

  switch (recipe.day) {
    case "Sunday": document.getElementById("Sunday").appendChild(newDiv);
      break;
    case "Monday": document.getElementById("Monday").appendChild(newDiv);
      break;
    case "Tuesday": document.getElementById("Tuesday").appendChild(newDiv);
      break;
    case "Wednesday": document.getElementById("Wednesday").appendChild(newDiv);
      break;
    case "Thursday": document.getElementById("Thursday").appendChild(newDiv);
      break;
    case "Friday": document.getElementById("Friday").appendChild(newDiv);
      break;
    case "Saturday": document.getElementById("Saturday").appendChild(newDiv);
      break;
  }
}

function initPage() {
  let plannedRecipes = JSON.parse(localStorage.getItem('plannedRecipes'));
  if (!plannedRecipes) plannedRecipes = [];
  for (let i = 0; i < plannedRecipes.length; i++) {
    addToDay(plannedRecipes[i]);
  }
}

// remove ingredients upon deletion
// TODO
function removeIngredients() {

}

function toast(message) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  x.innerHTML = message;

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

// deletion: grab the recipeid attribute, load from localstorage, find recipe in localstorage that has this id, delete it from the entry, (reload page?)
function deleteEntry(id) {
  console.log('deleting entry with id ' + id);
  let plannedRecipes = JSON.parse(localStorage.getItem('plannedRecipes'));
  for (let i = 0; i < plannedRecipes.length; i++) {
    if (plannedRecipes[i].id === id) {
      plannedRecipes.splice(i, 1);
      i = 0; // fskfjklsdjfklsflsd
    }
  }
  localStorage.setItem('plannedRecipes', JSON.stringify(plannedRecipes));

  // kLFJLKSDJFS
  // find all dom elements that have recipeid matching the given id
  let recipeblocks = document.getElementsByClassName('recipeblock');
  for (let i = 0; i < recipeblocks.length; i++) {
      console.log(recipeblocks[i].getAttribute('recipeid') + ' vs ' + id);
    if (recipeblocks[i].getAttribute('recipeid') == id) { // WHY??????
      recipeblocks[i].outerHTML = ''; // destroy block
      console.log('got here');
    }
  }
}

initPage();