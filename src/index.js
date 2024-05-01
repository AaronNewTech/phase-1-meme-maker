let currentMeme;
let currentMemeID;
let navBar = document.getElementById("meme-menu");
let memeData;
let menuImg;

const randomCodingMemesAPI = "https://meme-api.com/gimme/ProgrammerHumor/10/";

const randomSportsMemesAPI = "https://meme-api.com/gimme/SportsMemes/10";

const randomGamingMemesAPI = "https://meme-api.com/gimme/gamingmemes/10";

const randomMovieMemesAPI = "https://meme-api.com/gimme/moviememes/10";

const memesAPI = "http://localhost:3000/memes";
const imageLibrary = "http://localhost:3000/meme_library";
const likedMemesAPI = "http://localhost:3000/liked_memes";
const userMemesAPI = "http://localhost:3000/user_memes";

let deleteButtonVisible = (document.getElementById(
  "delete-button"
).style.visibility = "hidden");

async function loadMemes() {
  deleteButtonVisible = document.getElementById(
    "delete-button"
  ).style.visibility = "hidden";
  await fetch(memesAPI)
    .then((resp) => resp.json())

    .then((APIData) => {
      memeData = APIData;

      memeData.forEach((memeData) => navMenu(memeData));

      memeDetails(APIData[0]);

      likeButton();
    });
}
loadMemes();

async function navMenu(memeData) {
  menuImg = document.createElement("img");

  menuImg.src = memeData.url;

  navBar.append(menuImg);

  menuImg.addEventListener("click", () => {
    memeDetails(memeData);
  });
}

const memeDetails = (data) => {
  currentMeme = data;

  currentMemeID = data.id;
  console.log(currentMemeID);

  const title = document.getElementById("title");
  title.textContent = data.title;

  const image = document.querySelector(".detail-image");
  image.src = data.url;

  const topText = document.querySelector(".top-comment");
  topText.textContent = data.top_comment;

  const bottomComment = document.querySelector(".bottom-comment");
  bottomComment.textContent = data.bottom_comment;

  const memeLiked = document.getElementById("like");
  memeLiked.textContent = data.liked ? "Unlike" : "Like";
};

//function to add new meme
async function addNewMeme(data) {
  currentMeme = data;
  const newMeme = document.getElementById("new-meme");
  newMeme.addEventListener("submit", (e) => {
    e.preventDefault();

    let newName = document.getElementById("new-name").value;
    let newImg = document.getElementById("new-image").value;
    const newTopText = document.getElementById("new-top-comment").value;
    const newBottomText = document.getElementById("new-bottom-comment").value;
    currentMemeID = currentMeme.id;
    if (newImg == "") {
      newImg = currentMeme.url;
    }

    if (newName == "") {
      newName = currentMeme.title;
    }

    const wow = document.createElement("audio");
    wow.src =
      "https://github.com/AaronNewTech/phase-1-meme-maker/blob/main/sounds/greenscreen-wow.mp3?raw=true";
    wow.play();
    //new object holder for submitted information
    const newData = {
      title: newName,
      top_comment: newTopText,
      bottom_comment: newBottomText,
      url: newImg,
      liked: true,
    };
    let reset = document.getElementById("new-meme").reset();
    //re-fetch local server to add object data to
    fetch(userMemesAPI, {
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
  });
}

addNewMeme();

async function selectMemeImage() {
  const button = document.getElementById("image-library");

  button.addEventListener("click", () => {
    deleteButtonVisible = document.getElementById(
      "delete-button"
    ).style.visibility = "hidden";
    let details = document.getElementById("meme-detail");
    details.style.display = "initial";

    while (navBar.firstChild) {
      navBar.removeChild(navBar.firstChild);
    }
    fetch(imageLibrary)
      .then((resp) => resp.json())

      .then((memeLib) => {
        memeData = memeLib;

        memeData.forEach((memeData) => navMenu(memeData));
        memeDetails(memeData[0]);
      });
  });
}

selectMemeImage();

const homeButton = () => {
  const button = document.getElementById("home");

  button.addEventListener("click", () => {
    let details = document.getElementById("meme-detail");
    details.style.display = "initial";

    while (navBar.firstChild) {
      navBar.removeChild(navBar.firstChild);
    }
    loadMemes();
  });
};
homeButton();

async function createdMemes() {
  const button = document.getElementById("created-memes");
  // currentMemeID = userMemesAPI

  button.addEventListener("click", () => {
    deleteButtonVisible = document.getElementById(
      "delete-button"
    ).style.visibility = "visible";

    while (navBar.firstChild) {
      navBar.removeChild(navBar.firstChild);
    }
    fetch(userMemesAPI)
      .then((resp) => resp.json())

      .then((userMemes) => {
        memeData = userMemes;

        memeData.forEach((memeData) => navMenu(memeData));
        memeDetails(memeData[0]);
      });
  });
}
createdMemes();

async function likeButton(memeData) {
  const likeButton = document.getElementById("like");
  likeButton.addEventListener("click", () => {
    currentMeme.liked = !currentMeme.liked;
    likeButton.textContent = currentMeme.liked ? "Unlike" : "Like";

    currentMemeID = currentMeme.id;

    const newData = {
      id: currentMemeID,
      title: currentMeme.title,
      top_comment: currentMeme.top_comment,
      bottom_comment: currentMeme.bottom_comment,
      url: currentMeme.url,
      liked: true,
    };

    if (currentMeme.liked === true) {
      //re-fetch local server to add object data to
      fetch(likedMemesAPI, {
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
        .catch((error) => console.log("Error:", error));
    }
    if (currentMeme.liked === false) {
      fetch(`http://localhost:3000/liked_memes/${currentMeme.id}`, {
        method: "DELETE",
      }).then((resp) => resp.json());
    }
  });
}

function clickDeleteButton(data) {
  const deleteSound = document.getElementById("delete-button");

  deleteSound.addEventListener("click", () => {
    const cry = document.createElement("audio");
    cry.src =
      "https://github.com/AaronNewTech/phase-1-meme-maker/blob/main/sounds/bestcryeverdedit.mp3?raw=true";
    cry.play();
    fetch(`http://localhost:3000/user_memes/${currentMeme.id}`, {
      method: "DELETE",
    }).then((resp) => resp.json());
  });
}
clickDeleteButton();
async function likedMemesList() {
  const button = document.getElementById("liked-memes");

  button.addEventListener("click", () => {
    deleteButtonVisible = document.getElementById(
      "delete-button"
    ).style.visibility = "hidden";
    let details = document.getElementById("meme-detail");
    details.style.display = "initial";

    while (navBar.firstChild) {
      navBar.removeChild(navBar.firstChild);
    }
    fetch(likedMemesAPI)
      .then((resp) => resp.json())

      .then((likedMemes) => {
        memeData = likedMemes;

        memeData.forEach((memeData) => navMenu(memeData));
        memeDetails(memeData[0]);
      });
  });
}
likedMemesList();

async function randomCodingMemes() {
  const button = document.getElementById("coding-memes");

  button.addEventListener("click", () => {
    deleteButtonVisible = document.getElementById(
      "delete-button"
    ).style.visibility = "hidden";
    let details = document.getElementById("meme-detail");
    details.style.display = "initial";

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
    deleteButtonVisible = document.getElementById(
      "delete-button"
    ).style.visibility = "hidden";
    let details = document.getElementById("meme-detail");
    details.style.display = "initial";

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
    deleteButtonVisible = document.getElementById(
      "delete-button"
    ).style.visibility = "hidden";
    let details = document.getElementById("meme-detail");
    details.style.display = "initial";

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
    deleteButtonVisible = document.getElementById(
      "delete-button"
    ).style.visibility = "hidden";
    let details = document.getElementById("meme-detail");
    details.style.display = "initial";

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

const hoverFunctions = () => {
  const homeButtonHover = document.getElementById("home");
  homeButtonHover.addEventListener(
    "mouseover",
    (event) => {
      event.target.style.color = "#e8aa20";
    },
    homeButtonHover.addEventListener("mouseout", (event) => {
      event.target.style.color = "";
    })
  );

  const createMemeHover = document.getElementById("image-library");
  createMemeHover.addEventListener(
    "mouseover",
    (event) => {
      event.target.style.color = "#e8aa20";
    },
    createMemeHover.addEventListener("mouseout", (event) => {
      event.target.style.color = "";
    })
  );

  const likedMemesHover = document.getElementById("liked-memes");
  likedMemesHover.addEventListener(
    "mouseover",
    (event) => {
      event.target.style.color = "#e8aa20";
    },
    likedMemesHover.addEventListener("mouseout", (event) => {
      event.target.style.color = "";
    })
  );

  const createdMemesListHover = document.getElementById("created-memes");
  createdMemesListHover.addEventListener(
    "mouseover",
    (event) => {
      event.target.style.color = "#e8aa20";
    },
    createdMemesListHover.addEventListener("mouseout", (event) => {
      event.target.style.color = "";
    })
  );

  const browseMemesHover = document.getElementById("dropbtn");
  browseMemesHover.addEventListener(
    "mouseover",
    (event) => {
      event.target.style.color = "#e8aa20";
    },
    browseMemesHover.addEventListener("mouseout", (event) => {
      event.target.style.color = "";
    })
  );

  const codeMemesHover = document.getElementById("coding-memes");
  codeMemesHover.addEventListener(
    "mouseover",
    (event) => {
      event.target.style.color = "#e8aa20";
    },
    codeMemesHover.addEventListener("mouseout", (event) => {
      event.target.style.color = "";
    })
  );

  const sportsMemesHover = document.getElementById("sports-memes");
  sportsMemesHover.addEventListener(
    "mouseover",
    (event) => {
      event.target.style.color = "#e8aa20";
    },
    sportsMemesHover.addEventListener("mouseout", (event) => {
      event.target.style.color = "";
    })
  );

  const movieMemesHover = document.getElementById("movie-memes");
  movieMemesHover.addEventListener(
    "mouseover",
    (event) => {
      event.target.style.color = "#e8aa20";
    },
    movieMemesHover.addEventListener("mouseout", (event) => {
      event.target.style.color = "";
    })
  );

  const gamingMemesHover = document.getElementById("gaming-memes");
  gamingMemesHover.addEventListener(
    "mouseover",
    (event) => {
      event.target.style.color = "#e8aa20";
    },
    gamingMemesHover.addEventListener("mouseout", (event) => {
      event.target.style.color = "";
    })
  );
};

hoverFunctions();
