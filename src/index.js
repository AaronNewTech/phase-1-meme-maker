// server port:

// http://127.0.0.1:5500/

let currentMeme;
let navBar = document.getElementById("meme-menu");
let memeData;
// const codingMemesAPI = "https://meme-api.com/gimme/ProgrammerHumor/10/";
const memesAPI = "http://localhost:5500/memes";

function loadMemes() {
  fetch(memesAPI)
    .then((resp) => resp.json())

    .then((APIData) => {
      memeData = APIData;
      // console.log(memeData);
      memeData.forEach((memeData) => navMenu(memeData));

      memeDetails(APIData[0]);
      // console.log(APIData[0].image);
    });
}
loadMemes();

function navMenu(memeData) {
  const menuImg = document.createElement("img");

  // console.log(memeData);
  menuImg.src = memeData.image;

  navBar.append(menuImg);

  menuImg.addEventListener("click", () => {
    memeDetails(memeData);
  });
}


function memeDetails(data) {
  currentMeme = memeData;
  const name = document.getElementById("name");
  name.textContent = data.name;

  const image = document.querySelector(".detail-image");
  image.src = data.image;

  const topText = document.querySelector(".top-comment");
  topText.textContent = data.top_comment;
  console.log(topText);
  const bottomComment = document.querySelector(".bottom-comment");
  bottomComment.textContent = data.bottom_comment;

  // const rating = document.getElementById("rating-display");
  // rating.textContent = data.rating;
}

// function memeDetails(memeData) {
//   currentMeme = memeData;

//   const image = document.querySelector(".detail-image");
//   image.src = currentMeme.image;
//   // console.log(memeData)
//   let title = document.getElementById("title");
//   title.textContent = memeData.title;
// console.log(title);
//}

//function to add new meme
const addNewMeme = () => {
  const newMeme = document.getElementById("new-meme");
  newMeme.addEventListener("submit", (e) => {
    e.preventDefault();
    const newName = document.getElementById("new-name");
    const newImg = document.getElementById("new-image");
    const newTopText = document.getElementById("new-top-comment");
    const newBottomText = document.getElementById("new-bottom-comment");

    //new object holder for submitted information
    const newData = {
      name: newName,
      top_comment: newTopText,
      bottom_comment: newBottomText,
      image: newImage,
    };
    //re-fetch local server to add object data to
    fetch(memesAPI,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(newData)})
          .then(resp=>resp.json())
          .then(responseData=>{
            console.log("Response:",responseData)
          })
          .catch(error=>
            console.error("Error:",error))
  });
};
