// modal code
var introModalEl = document.querySelector("#introModal");
var mainPageEl = document.querySelector("#main-page");
var continueBtnEl = document.querySelector("#continue-btn");
var inputBarEl = document.querySelector("#input-bar");
var submitBntEl = document.querySelector("#submit-name");

//variables
var photosContainer = document.getElementById("photos-container");

// // search button
const searchbtn = document.querySelector(".searchbtn");
const input = document.querySelector("input");
inputBarEl.addEventListener("input", (e) => {
  e.preventDefault();
  query = e.target.value;
});

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

//list all category options for checkbox/buttons
var catsOptions = ["music", "animals", "sports", "movies"];
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
  createCatBtns();
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
        imageElement.setAttribute("id", photo.id);
        imageElement.setAttribute("name", photo.photographer);
        imageElement.setAttribute("value", photo.alt);
        imageElement.classList.add("photo");
        console.log(photo.src.original);
        photosContainer.appendChild(imageElement);
      }
    });
}

var createCatBtns = function () {
  var cbCont = document.getElementById("category-btns-container");

  for (var i = 0; i < catsOptions.length; i++) {
    var catBtn = document.createElement("button");
    catBtn.classList = "button btn1 change-category-btn ";
    catBtn.setAttribute("id", catsOptions[i] + "-btn");
    catBtn.setAttribute("value", catsOptions[i]);
    catBtn.innerHTML = catsOptions[i];
    cbCont.appendChild(catBtn);
  }
};

photosContainer.addEventListener("click", function (event) {
  q = [event.target.id];
  console.log(q);
  var photoPick = document.getElementById(q);
  console.log(photoPick);
  console.log(photoPick.getAttribute("src"));
  var infoURLtext = photoPick.getAttribute("src");
  var infocreatorText = photoPick.getAttribute("name");
  var infoAltText = photoPick.getAttribute("value");
  var infoContainer = document.getElementById("selected-photo-info");
  infoContainer.innerHTML = "";
  var infoURL = document.createElement("div");
  var infoAlt = document.createElement("div");
  var infoCreator = document.createElement("div");
  //add classes for styling
  infoURL.classList = "image-info";
  infoAlt.classList = "image-info";
  infoCreator.classList = "image-info";
  infoCreator.setAttribute("id", "infoURL");
  infoURL.setAttribute("id", "infoURL");
  infoAlt.setAttribute("id", "infoAlt");
  infoURL.setAttribute("style", "color:white");
  infoAlt.setAttribute("style", "color:white");
  infoCreator.setAttribute("style", "color:white");
  infoURL.innerHTML = "Source URL: " + infoURLtext;
  infoAlt.innerHTML = "Alt Text: " + infoAltText;
  infoCreator.innerHTML = "Photographer: " + infocreatorText;
  infoContainer.append(infoURL);
  infoContainer.append(infoAlt);
  infoContainer.append(infoCreator);
});

var setCat = function (evt) {
  if (evt.target.classList.contains("change-category-btn")) {
    category = evt.target.value;
    pullImages(category);
  }
};

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
