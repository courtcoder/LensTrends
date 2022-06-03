// modal code
var introModalEl = document.querySelector("#introModal");
var mainPageEl = document.querySelector("#main-page");
var continueBtnEl = document.querySelector("#continue-btn");
var inputBarEl = document.querySelector("#input-bar");
var submitBntEl = document.querySelector("#submit-name");

//variables
var photosContainer = document.getElementById("photos-container");

// get answers Array from local storage
var pastUsers = [];
var newUser;
var LSpastUsers = JSON.parse(localStorage.getItem("pastUsers"));
if (LSpastUsers) {
  pastUsers = LSpastUsers;
  newUser = false;
} else {
  pastUsers = [];
  newUser = true;
}
var userName;
var startCats = [];

// will show modal
window.onload = function () {
  introModalEl.classList = "display";
  mainPageEl.classList = "noDisplay";
  if (newUser) {
  } else {
    modalPopulate();
  }
};

var modalPopulate = function () {
  // say welcome userName
  //populate radio buttons
  // change title
  console.log(pastUsers);
  document.getElementById("nameTitle").innerHTML =
    "Welcome back " + pastUsers[0];
  document.querySelector("#name-bar").innerHTML = "";
  for (var a = 1; a < pastUsers.length; a++) {
    var answerFill = document.querySelector(
      'input[name="preference' + a + '"]'
    );
    console.log(answerFill);
    if (pastUsers[a] === true) {
      answerFill.checked = true;
    }
  }
  //add a I'm not pastUsers[0] bar to clear ls and reload
};

function gatherInput() {
  //grab this
  if (newUser) {
    const setName = inputBarEl.value;
    pastUsers[0] = setName;
  }
  //get checkbox answers //if checked then true, else false
  // console.log(musicCB.checked);

  var catsOptions = ["music", "animals", "sports", "movies"];
  for (var c = 0; c < catsOptions.length; c++) {
    cc = c + 1;
    console.log(cc);
    var checkedTF = document.querySelector(
      '[name="preference' + cc + '"]'
    ).checked;
    console.log(checkedTF.checked);
    if (checkedTF) {
      startCats.push(catsOptions[c]);
      pastUsers[cc] = true;
      console.log(startCats);
    } else {
      pastUsers[cc] = false;
    }
  }

  localStorage.setItem("pastUsers", JSON.stringify(pastUsers));
  // console.log(setName);
  //get categories
}

// //  FETCH IMAGES FROM PEXEL
var API_KEY = "563492ad6f9170000100000152ffb040725b4fec8924b778c7fa6b04";
var url = "https://api.pexels.com/v1/search";
// var category = "";

function showMainPage() {
  gatherInput();
  introModalEl.classList = "noDisplay";
  mainPageEl.classList = "display";
  startPullImages();
}

var startPullImages = function () {
  photosContainer.innerHTML = "";
  if (startCats.length > 0) {
    for (var i = 0; i < startCats.length; i++) {
      pullImages(startCats[i]);
    }
  } else {
    //change to whatever the generic category is from the options
    pullImages(general);
  }
};

function pullImages(category) {
  // startCats holds array of image categories from modal

  // ACCESS TO URL
  var queryParams = "?query=" + category;
  var finalURL = url + queryParams;
  console.log(finalURL);
  fetch(finalURL, {
    headers: {
      Authorization: API_KEY,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // data.photos
      // photosContainer.innerHTML = "";
      for (let i = 0; i < data.photos.length; i++) {
        const photo = data.photos[i];
        console.log(photo);
        var imageElement = document.createElement("img");
        imageElement.src = photo.src.large;
        imageElement.classList.add("photo");
        console.log(photo.src.original);
        photosContainer.appendChild(imageElement);
      }
    });
}

// var musicCatBtn = document.querySelector("#music-btn");
// musicCatBtn.addEventListener("click", setCat);
// var booksCatBtn = document.querySelector("#books-btn");
// booksCatBtn.addEventListener("click", setCat);
// var travelCatBtn = document.querySelector("#travel-btn");
// travelCatBtn.addEventListener("click", setCat);
// var sportsCatBtn = document.querySelector("#sports-btn");
// sportsCatBtn = addEventListener("click", setCat);
// var natureCatBtn = document.querySelector("#nature-btn");
// natureCatBtn = addEventListener("click", setCat);
// var photosContainer = document.querySelector("#photos-container");

function setCat(evt) {
  category = evt.target.value;
  pullImages(category);
}

// add a clear results button
var clearPhotos = function () {
  photosContainer.innerHTML = "";
};
document
  .getElementById("clearOutPhotos-btn")
  .addEventListener("click", clearPhotos);

continueBtnEl.addEventListener("click", showMainPage);
// submitBntEl.addEventListener("submit", nameInput);

// add a clear modal/ls button
var clearStorage = function () {
  photosContainer.innerHTML = "";
  localStorage.clear();
  location.reload();
};
document.getElementById("not-me").addEventListener("click", clearStorage);
