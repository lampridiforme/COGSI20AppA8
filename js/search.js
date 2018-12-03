// Contains common search functionality found on the recipe/recipeResults page

// toggle status of each filter
let toggleStatus = [];

// just a mock function, this really just checks if it should go to the favorites page or not
function search() {
  let searchTerm = document.getElementById('searchbar').value;
  saveSearchTermToLocalStorage(searchTerm);
  goto("./recipeResults.html");
}

function getFilterStatusFromLocalStorage() {
  let oldFilterStatus = JSON.parse(localStorage.getItem("filterstatus"));
  if (!oldFilterStatus) oldFilterStatus = {};

  return oldFilterStatus;
}

// don't really want to maintain this info, each search is fresh
function clearLocalStorageFilterStatus() {
  localStorage.setItem("filterstatus", "{}");
}

function saveFilterStatusToLocalStorage(filterName, filterStatus) {
  let oldFilterStatus = JSON.parse(localStorage.getItem("filterstatus"));
  if (!oldFilterStatus) oldFilterStatus = {};

  oldFilterStatus[filterName] = filterStatus;

  localStorage.setItem("filterstatus", JSON.stringify(oldFilterStatus));
}

function saveSearchTermToLocalStorage(searchTerm) {
  localStorage.setItem('searchTerm', (searchTerm) ? searchTerm : "");
}