// server port:

// http://127.0.0.1:5500/

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

async function loadMemes() {
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
  const title = document.getElementById("title");
  title.textContent = data.title;

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
const addNewMeme = (data) => {
  currentMeme = data;
  const newMeme = document.getElementById("new-meme");
  newMeme.addEventListener("submit", (e) => {
    e.preventDefault();
    let newName = document.getElementById("new-name").value;
    let newImg = document.getElementById("new-image").value;
    const newTopText = document.getElementById("new-top-comment").value;
    const newBottomText = document.getElementById("new-bottom-comment").value;
    

    if (newImg == "") {
      
      newImg = currentMeme.url
    }

    if (newName == "") {
      newName = currentMeme.title
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

    // memeDetails(newData);

    // navMenu(newData);
  });
};

addNewMeme();

const selectMemeImage = () => {
  const button = document.getElementById("image-library");

  button.addEventListener("click", () => {
    let details = document.getElementById("meme-detail");
    details.style.display = "initial";
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

        // addNewMeme();
        // const deleteDiv = document.getElementById("delete");
        // const deleteButton = document.createElement("button");
        // deleteButton.textContent = "Delete";
        // deleteButton.setAttribute("id", "delete-button");

        // console.log(deleteButton);
        // deleteDiv.append(deleteButton);
        // clickDeleteButton();
      });
  });
};

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

const createdMemes = () => {
  const button = document.getElementById("created-memes");
  // currentMemeID = userMemesAPI
  
  button.addEventListener("click", () => {
    let details = document.getElementById("meme-detail");
    details.style.display = "initial";
    // when button is clicked the user can add meme top comment and bottom comment to images from database
    while (navBar.firstChild) {
      navBar.removeChild(navBar.firstChild);
    }
    fetch(userMemesAPI)
      .then((resp) => resp.json())

      .then((userMemes) => {
        memeData = userMemes;

        memeData.forEach((memeData) => navMenu(memeData));
        memeDetails(memeData[0]);
        console.log(userMemes)
        // addNewMeme();
        // const deleteDiv = document.getElementById("delete");
        // const deleteButton = document.createElement("button");
        // deleteButton.textContent = "Delete";
        // deleteButton.setAttribute("id", "delete-button");

        // console.log(deleteButton);
        // deleteDiv.append(deleteButton);
        // clickDeleteButton();
      });
  });
};
createdMemes()

const likeButton = (memeData) => {
  // currentMeme = memeData;
  const likeButton = document.getElementById("like");
  likeButton.addEventListener("click", () => {
    currentMeme.liked = !currentMeme.liked;
    likeButton.textContent = currentMeme.liked ? "Unlike" : "Like";
    console.log("Like status:", likeButton);

    currentMemeID = currentMeme.id + 100

    const newData = {
        id: currentMemeID,
        title: currentMeme.title,
        top_comment: currentMeme.top_comment,
        bottom_comment: currentMeme.bottom_comment,
        url: currentMeme.url,
      };
  
  console.log(currentMemeID)
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
        .catch((error) => console.error("Error:", error));
    }
    if (currentMeme.liked === false){
      
      fetch('http://localhost:3000/liked_memes', {
        method: "DELETE",
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
    }//
  }); 
};

function clickDeleteButton(data) {

  currentMemeID = data.id
  const deleteButtons = document.getElementById("delete-button");
  // const cry = document.getElementById('cry')
  deleteButtons.addEventListener("click", () => {
    const cry = document.createElement("audio");
    cry.src =
      "https://github.com/AaronNewTech/phase-1-meme-maker/blob/main/sounds/bestcryever.mp3?raw=true";
    cry.play();


  });
}

// function clickCreateButton() {
//   const createButton = document.getElementById("new-meme");
//   // const cry = document.getElementById('cry')
//   createButton.addEventListener("submit", (e) => {
//     // e.preventDefault();
//     const wow = document.createElement("audio");
//     wow.src =
//       "https://github.com/AaronNewTech/phase-1-meme-maker/blob/main/sounds/greenscreen-wow.mp3?raw=true";
//     wow.play();
//   });
// }
// clickCreateButton();

const likedMemesList = () => {
  const button = document.getElementById("liked-memes");
  // currentMemeID = userMemesAPI
  
  button.addEventListener("click", () => {
    let details = document.getElementById("meme-detail");
    details.style.display = "initial";
    // when button is clicked the user can add meme top comment and bottom comment to images from database
    while (navBar.firstChild) {
      navBar.removeChild(navBar.firstChild);
    }
    fetch(likedMemesAPI)
      .then((resp) => resp.json())

      .then((likedMemes) => {
        memeData = likedMemes;

        memeData.forEach((memeData) => navMenu(memeData));
        memeDetails(memeData[0]);
        console.log(likedMemes)
        // addNewMeme();
        // const deleteDiv = document.getElementById("delete");
        // const deleteButton = document.createElement("button");
        // deleteButton.textContent = "Delete";
        // deleteButton.setAttribute("id", "delete-button");

        // console.log(deleteButton);
        // deleteDiv.append(deleteButton);
        // clickDeleteButton();
      });
  });
};
likedMemesList()

async function randomCodingMemes() {
  const button = document.getElementById("coding-memes");

  button.addEventListener("click", () => {
    let details = document.getElementById("meme-detail");
    details.style.display = "initial";
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
    let details = document.getElementById("meme-detail");
    details.style.display = "initial";
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
    let details = document.getElementById("meme-detail");
    details.style.display = "initial";
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
    let details = document.getElementById("meme-detail");
    details.style.display = "initial";
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


const hoverFunctions = ()=>{
  const homeButtonHover = document.getElementById("home");
  homeButtonHover.addEventListener("mouseover",(event)=>{
    event.target.style.color = "red";
  },
  homeButtonHover.addEventListener("mouseout",(event)=>{
    event.target.style.color ="";
  }))
  
  const createMemeHover = document.getElementById("image-library");
  createMemeHover.addEventListener("mouseover",(event)=>{
    event.target.style.color = "red";
  },
  createMemeHover.addEventListener("mouseout",(event)=>{
    event.target.style.color ="";
  }))
  
  const likedMemesHover = document.getElementById("liked-memes");
  likedMemesHover.addEventListener("mouseover",(event)=>{
    event.target.style.color = "red";
  },
  likedMemesHover.addEventListener("mouseout",(event)=>{
    event.target.style.color ="";
  }))

  const createdMemesListHover = document.getElementById("created-memes");
  createdMemesListHover.addEventListener("mouseover",(event)=>{
    event.target.style.color = "red";
  },
  createdMemesListHover.addEventListener("mouseout",(event)=>{
    event.target.style.color ="";
  }))
  
  const browseMemesHover = document.getElementById("dropbtn");
  browseMemesHover.addEventListener("mouseover",(event)=>{
    event.target.style.color = "red";
  },
  browseMemesHover.addEventListener("mouseout",(event)=>{
    event.target.style.color ="";
  }))
  
  const codeMemesHover = document.getElementById("coding-memes");
  codeMemesHover.addEventListener("mouseover",(event)=>{
    event.target.style.color = "red";
  },
  codeMemesHover.addEventListener("mouseout",(event)=>{
    event.target.style.color ="";
  }))
  
  const sportsMemesHover = document.getElementById("sports-memes");
  sportsMemesHover.addEventListener("mouseover",(event)=>{
    event.target.style.color = "red";
  },
  sportsMemesHover.addEventListener("mouseout",(event)=>{
    event.target.style.color ="";
  }))
  
  const movieMemesHover = document.getElementById("movie-memes");
  movieMemesHover.addEventListener("mouseover",(event)=>{
    event.target.style.color = "red";
  },
  movieMemesHover.addEventListener("mouseout",(event)=>{
    event.target.style.color ="";
  }))
  
  const gamingMemesHover = document.getElementById("gaming-memes");
  gamingMemesHover.addEventListener("mouseover",(event)=>{
    event.target.style.color = "red";
  },
  gamingMemesHover.addEventListener("mouseout",(event)=>{
    event.target.style.color ="";
  }))}
  
  hoverFunctions()