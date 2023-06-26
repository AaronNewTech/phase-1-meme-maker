let currentMeme;
let navBar = document.getElementById("meme-menu");

const codingMemesAPI = "http://localhost:3000/memes";
const memesAPI = "https://api.imgflip.com/get_memes";
// fetch("https://api.imgflip.com/get_memes")
//   .then((resp) => resp.json())
//   .then((data) => {
//     data.forEach((data) => navMenu(data));
//     memeDetails(data[0]);
//     // createMeme(data);
//   });

function codingMemes() {
  const codingMemesButton = document.getElementById("coding-memes");
  
  codingMemesButton.addEventListener("click", () => {
    navBar.innerHTML = [];
    fetch(codingMemesAPI)
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach((data) => navMenu(data));
        memeDetails(data[0]);
        // createMeme(data);
      });
  });
}
codingMemes();

fetch(memesAPI)
  .then((imgFlipResp) => imgFlipResp.json())
  
  .then((imgFlipData) => {
    imgFlipData.forEach((imgFlipData) => navMenu(imgFlipData));
    memeDetails(imgFlipData[0]);
    // createMeme(data);
    console.log(imgFlipData)
  });

function navMenu(imgFlipData) {
  const menuImg = document.createElement("img");

  menuImg.src = imgFlipData.image;

  navBar.append(menuImg);

  menuImg.addEventListener("click", () => {
    memeDetails(imgFlipData);
  });
}

function memeDetails(data) {
  currentMeme = data;
  const name = document.querySelector(".name");
  name.textContent = data.name;

  const image = document.querySelector(".detail-image");
  image.src = data.image;

  const topText = document.querySelector(".top-comment");
  topText.textContent = data.top_comment;

  const bottomComment = document.getElementById("bottom-comment");
  bottomComment.textContent = data.bottom_comment;

  const rating = document.getElementById("rating-display");
  rating.textContent = data.rating;
}
