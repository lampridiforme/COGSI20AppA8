// toggle status of each filter
let dayToggleStatus = [];

// AKJLKSJDFLS WHY HOW DO FRAMEWORKS MAINTAIN STATEKJLKDSJFJDSLF
let selectedRecipeName = "";
let selectedRecipeId = "";
let selectedRecipeUrl = "";
let selectedRecipeImage = "";

// currently selected day for placement
let selectedDay = "";

let mockIngredientDB = [
  {
    recipe: "Canned Cranberry Sauce",
    ingredients: ["cranberry sauce", "pineapple"]
  },
  {
    recipe: "Powerade Turkey",
    ingredients: ["powerade", "turkey"]
  },
  {
    recipe: "Last Year's Leftovers",
    ingredients: ["pasta"]
  },
  {
    recipe: "Rudolph",
    ingredients: ["ground beef", "ketchup", "soy sauce", "antlers"]
  },
  {
    recipe: "Plymoth Cauliflower",
    ingredients: ["cauliflower", "black beans"]
  }

];

function toast(message) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  x.innerHTML = message;

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function addFavoriteMessage() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    x.innerHTML = "Added to Favorites";

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function addPlanMessage() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    x.innerHTML = "Added to Plan + Shopping List";

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function saveRecipeToLocalStorage(recipe) {
  let oldRecipes = JSON.parse(localStorage.getItem('plannedRecipes'));
  if (!oldRecipes)
    oldRecipes = [];

  oldRecipes.push(recipe);

  localStorage.setItem('plannedRecipes', JSON.stringify(oldRecipes));
}

function saveFavoriteToLocalStorage(recipe) {
  let oldFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!oldFavorites)
    oldFavorites = [];

  oldFavorites.push(recipe);

  localStorage.setItem('favoriteRecipes', JSON.stringify(oldFavorites));
}

// NOTE: hard coded to add to Monday for now
// id: id of recipe
// name: name of recipe
// image: url to image
// url: link to recipe
// day: day to place the recipe on (approximation of date)
// date: date associated with recipe
// TODO: needs level of indirection- select day first
function addToPlan(id, name, image, url) {
  console.log('hi');
  // no day selected
  if (selectedDay === "") {
    toast("Select a day first!");
    return;
  }

  let selected_date = selectedDay;
  //let selected_date = window.localStorage.getItem("selected_date");

  let recipeObj = {
    id: id,
    name: name,
    image: image,
    url: url,
    day: selected_date,
    date: "01/01/1990",
  };
  $('#exampleModal').modal('hide');
  addPlanMessage();
  addIngredientsToList(name);
  saveRecipeToLocalStorage(recipeObj);

}

function addToFavorites(id, name, image, url, day) {
  let recipeObj = {
    id: id,
    name: name,
    image: image,
    url: url,
    day: day,
    date: "01/01/1990",
  };
  addFavoriteMessage();
  saveFavoriteToLocalStorage(recipeObj);
}

function getIngredientsFromDB(recipeName) {
  for (let i = 0; i < mockRecipeData.length; i++) {
    if (mockRecipeData[i].name === recipeName) {
      console.log("ingredients found: " + JSON.stringify(mockRecipeData[i].ingredients));
      return mockRecipeData[i].ingredients;
    }
  }
}

function addIngredientsToList(recipeName) {
  let oldIngredients = JSON.parse(localStorage.getItem('toBuy'));
  if (!oldIngredients) oldIngredients = [];

  localStorage.setItem('toBuy', JSON.stringify(oldIngredients.concat(getIngredientsFromDB(recipeName))));

}

function initPage() {
  // for search related filters
  let filters = document.getElementsByClassName('searchfilter');
  for (let i = 0; i < filters.length; i++) {
    // highlight already chosen filters
    let oldFilterStatus = getFilterStatusFromLocalStorage();
    if (oldFilterStatus[filters[i].getAttribute("filtertype")]) {
      console.log(filters[i].getAttribute("filtertype"));
      filters[i].classList.add("bg-warning");
    }
    // assign onclick events for all filters
    filters[i].onclick = () => {
      toggleStatus[i] = !toggleStatus[i];
      (toggleStatus[i]) ? filters[i].classList.add("bg-warning") : filters[i].classList.remove("bg-warning");
      saveFilterStatusToLocalStorage(filters[i].getAttribute("filtertype"), toggleStatus[i]);
    };
    toggleStatus.push(false);
  }

  // for day related filters
  let days = document.getElementsByClassName('dayfilter');
  for (let i = 0; i < days.length; i++) {
    days[i].onclick = () => {
      // deselect all others
      for (let j = 0; j < days.length; j++) {
        days[j].classList.remove("bg-warning");
      }
      dayToggleStatus[i] = true;
      (dayToggleStatus[i]) ? days[i].classList.add("bg-warning") : days[i].classList.remove("bg-warning");
      setDate(days[i].getAttribute("day"));
    };
  }
  
  // for recipe card setup
  let filterList = Object.keys(getFilterStatusFromLocalStorage());
  let filterVals = Object.values(getFilterStatusFromLocalStorage());
  let finalList = [];

  for (let i = 0; i < filterList.length; i++) {
    if (filterVals[i])
      finalList.push(filterList[i]);
  }
  console.log(finalList);
  let queryResults = getRecipesFromDB(mockRecipeData, getLastSearchTerm(), finalList);
  for (let i = 0; i < queryResults.length; i++) {
    document.getElementById('recipes').append(createRecipeCard(queryResults[i], (i === queryResults.length - 1)));
  }

  // set searchbar to contain last query
  document.getElementById('searchbar').value = getLastSearchTerm();
}

function setDate(current_date) {
  selectedDay = current_date;
  console.log(selectedDay);
  //alert(current_date);
  //window.localStorage.setItem("selected_date", current_date);
}

// NOTE: note necessary
function clearDate() {
  localStorage.setItem("selected_date", "");
}

// set currently selected recipe
function setSelectedRecipe(id, name, imgurl, url) {
  selectedRecipeName = name;
  selectedRecipeImage = imgurl;
  selectedRecipeId = id;
  selectedRecipeUrl = url;
  console.log(name + " " + id + " " + imgurl + " " + url);
}

// get results of a query/filter
// db assumed to be in style of mockRecipes
// TODO: split into two methods
function getRecipesFromDB(db, searchTerm, filters) {
  let result = [];
  // for all db entries
  for (let i = 0; i < db.length; i++) {
    // got search term?
    if (db[i].name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
      let filterCount = 0; // number of filters we need contained by this recipe
      // got all filters?
      for (let j = 0; j < filters.length; j++) {
        console.log("index of " + filters[j] + " inside " + JSON.stringify(db[i].tags) + ": " + db[i].tags.indexOf(filters[j]));
        if (db[i].tags.indexOf(filters[j]) !== -1) {
          filterCount += 1;
        }
      }
      if (filterCount >= filters.length) {
        console.log("total filter count: " + filterCount);
        result.push(db[i]);
      }
      filterCount = 0;
    }
  }

  return result;
}

// generate UI element for an entry found by the search query
// special last div case: must pad 80px on bottom or else navbar will clip into the box
function createRecipeCard(recipeObj, isLast) {
  console.log('is last? ' + isLast);
  let recipeCard = document.createElement('div');
  recipeCard.innerHTML = (!isLast) ?
      "<div class=\"recipecard\">" +
        "<div class=\"recipeinfo bg-light\">" + 
          "<div class=\"\">" +
            "<div class=\"align-middle\" style=\"display: inline-block;\">" +
              recipeObj.name +
              "<div class=\"addbutton bg-light m-2\" data-toggle=\"modal\" data-target=\"#exampleModal\" onclick=\"" +
                "setSelectedRecipe(" + recipeObj.id + 
                ",'" + recipeObj.name + "'" + 
                ",'" + recipeObj.image  + "'" + 
                ",'" + recipeObj.url + "'" + 
                ")\">+</div>" +
              "<div class=\"gobutton bg-light m-2\" onclick=\"goToRecipePage('" + recipeObj.url + "')\">Go To Recipe</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
        "<div class=\"\" style=\"background: linear-gradient(rgba(248,249,250, 1.0), rgba(248,249,250, 0.2), rgba(248,249,250, 0.1), rgba(248,249,250, 0.01), rgba(0, 0, 0, 0)" +
  "), url('" + recipeObj.image + "'); background-size: cover; width: 100%; height: 90%;\">" +
        "</div>" +
      "</div>" :
      "<div class=\"recipecard\">" +
        "<div class=\"recipeinfo bg-light\">" + 
          "<div class=\"\">" +
            "<div class=\"align-middle\" style=\"display: inline-block;\">" +
              recipeObj.name +
              "<div class=\"addbutton bg-light m-2\" data-toggle=\"modal\" data-target=\"#exampleModal\" onclick=\"" +
                "setSelectedRecipe(" + recipeObj.id + 
                ",'" + recipeObj.name + "'" + 
                ",'" + recipeObj.image  + "'" + 
                ",'" + recipeObj.url + "'" + 
                ")\">+</div>" +
              "<div class=\"gobutton bg-light m-2\" onclick=\"goToRecipePage('" + recipeObj.url + "')\">Go To Recipe</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
        "<div class=\"\" style=\"background: linear-gradient(rgba(248,249,250, 1.0), rgba(248,249,250, 0.2), rgba(248,249,250, 0.1), rgba(248,249,250, 0.01), rgba(0, 0, 0, 0)" +
  "), url('" + recipeObj.image + "'); background-size: cover; width: 100%; height: 90%; margin-bottom: 80px;\">" +
        "</div>" +
      "</div>"
      ;

  return recipeCard;
}

// return search term from localStorage, instead of grabbing it from the URL like a decent developer
function getLastSearchTerm() {
  let searchTerm = localStorage.getItem('searchTerm');
  return (searchTerm) ? searchTerm : "";
}

function goToRecipePage(url) {
  localStorage.setItem('recipeURL', url);
  console.log("set recipeURL to: " + url);
  goto("./recipeResult.html");
}

let getSelectedName = () => selectedRecipeName;
let getSelectedId = () => selectedRecipeId;
let getSelectedImage = () => selectedRecipeImage;

initPage();