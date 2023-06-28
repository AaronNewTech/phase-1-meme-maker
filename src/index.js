// server port:

// http://127.0.0.1:5500/

let currentMeme;
let navBar = document.getElementById("meme-menu");
let memeData;
let menuImg;

const randomCodingMemesAPI = "https://meme-api.com/gimme/ProgrammerHumor/10/";

const randomSportsMemesAPI = "https://meme-api.com/gimme/SportsMemes/10";

const randomGamingMemesAPI = "https://meme-api.com/gimme/gamingmemes/10";

const randomMovieMemesAPI = "https://meme-api.com/gimme/moviememes/10";

const memesAPI = "http://localhost:3000/memes";
const imageLibrary = "http://localhost:3000/meme_library";
const userMemes = "http://localhost:3000/user_memes";

async function loadMemes() {
  await fetch(memesAPI)
    .then((resp) => resp.json())

    .then((APIData) => {
      memeData = APIData;
      // console.log(memeData);
      memeData.forEach((memeData) => navMenu(memeData));

      memeDetails(APIData[0]);
      // console.log(APIData[0].image);
      addNewMeme();
      likeButton();
    });
}
loadMemes();

const navMenu = (memeData) => {
  menuImg = document.createElement("img");

  menuImg.src = memeData.url;

  navBar.append(menuImg);

  menuImg.addEventListener("click", () => {
    memeDetails(memeData);
  });
};

const memeDetails = (data) => {
  currentMeme = data;
  const name = document.getElementById("title");
  name.textContent = data.title;

  const image = document.querySelector(".detail-image");
  image.src = data.url;

  const topText = document.querySelector(".top-comment");
  topText.textContent = data.top_comment;
  // console.log(topText);
  const bottomComment = document.querySelector(".bottom-comment");
  bottomComment.textContent = data.bottom_comment;

  const memeLiked = document.getElementById("like");
  memeLiked.textContent = data.liked ? "Unlike" : "Like";
};

//function to add new meme
const addNewMeme = () => {
  const newMeme = document.getElementById("new-meme");
  newMeme.addEventListener("submit", (e) => {
    e.preventDefault();
    const newName = document.getElementById("new-name").value;
    const newImg = document.getElementById("new-image").value;
    const newTopText = document.getElementById("new-top-comment").value;
    const newBottomText = document.getElementById("new-bottom-comment").value;

    //new object holder for submitted information
    const newData = {
      name: newName,
      top_comment: newTopText,
      bottom_comment: newBottomText,
      image: newImg,
    };

    //re-fetch local server to add object data to
    fetch(memesAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((resp) => resp.json())
      .then((responseData) => {
        console.log("Response:", responseData);
      })
      .catch((error) => console.error("Error:", error));

    memeDetails(newData);

    navMenu(newData);
  });
};

addNewMeme();

const selectMemeImage = () => {
  const button = document.getElementById("image-library");

  button.addEventListener("click", () => {
    // when button is clicked the user can add meme top comment and bottom comment to images from database
    while (navBar.firstChild) {
      navBar.removeChild(navBar.firstChild);
    }
    fetch(imageLibrary)
      .then((resp) => resp.json())

      .then((memeLib) => {
        memeData = memeLib;

        memeData.forEach((memeData) => navMenu(memeData));
        memeDetails(memeData[0]);

        addNewMeme();
      });
  });
};

selectMemeImage();

const homeButton = () => {
  const button = document.getElementById("home");

  button.addEventListener("click", () => {
    while (navBar.firstChild) {
      navBar.removeChild(navBar.firstChild);
    }
    loadMemes();
  });
};
homeButton();

const likeButton = (memeData) => {
  // currentMeme = memeData;
  const likeButton = document.getElementById("like");
  likeButton.addEventListener("click", () => {
    currentMeme.liked = !currentMeme.liked;
    likeButton.textContent = currentMeme.liked ? "Unlike" : "Like";
    console.log("Like status:", likeButton);
  });
};

async function randomCodingMemes() {
  const button = document.getElementById("coding-memes");

  button.addEventListener("click", () => {
    // when button is clicked the user can add meme top comment and bottom comment to images from database
    while (navBar.firstChild) {
      navBar.removeChild(navBar.firstChild);
    }
    fetch(randomCodingMemesAPI)
      .then((resp) => resp.json())

      .then((codingMemes) => {
        memeData = codingMemes.memes;
        console.log(memeData[0].url);

        memeData.forEach((memeData) => navMenu(memeData));
        memeDetails(memeData[0]);
      });
  });
}
randomCodingMemes();

async function randomSportsMemes() {
  const button = document.getElementById("sports-memes");

  button.addEventListener("click", () => {
    // when button is clicked the user can add meme top comment and bottom comment to images from database
    while (navBar.firstChild) {
      navBar.removeChild(navBar.firstChild);
    }
    fetch(randomSportsMemesAPI)
      .then((resp) => resp.json())

      .then((sportsMemes) => {
        memeData = sportsMemes.memes;
        console.log(memeData[0].url);

        memeData.forEach((memeData) => navMenu(memeData));
        memeDetails(memeData[0]);
      });
  });
}
randomSportsMemes();

async function randomMovieMemes() {
  const button = document.getElementById("movie-memes");

  button.addEventListener("click", () => {
    // when button is clicked the user can add meme top comment and bottom comment to images from database
    while (navBar.firstChild) {
      navBar.removeChild(navBar.firstChild);
    }
    fetch(randomMovieMemesAPI)
      .then((resp) => resp.json())

      .then((movieMemes) => {
        memeData = movieMemes.memes;
        console.log(memeData[0].url);

        memeData.forEach((memeData) => navMenu(memeData));
        memeDetails(memeData[0]);
      });
  });
}
randomMovieMemes();

async function randomGamingMemes() {
  const button = document.getElementById("gaming-memes");

  button.addEventListener("click", () => {
    // when button is clicked the user can add meme top comment and bottom comment to images from database
    while (navBar.firstChild) {
      navBar.removeChild(navBar.firstChild);
    }
    fetch(randomGamingMemesAPI)
      .then((resp) => resp.json())

      .then((gmaingMemes) => {
        memeData = gmaingMemes.memes;
        console.log(memeData[0].url);

        memeData.forEach((memeData) => navMenu(memeData));
        memeDetails(memeData[0]);
      });
  });
}
randomGamingMemes();
// test
