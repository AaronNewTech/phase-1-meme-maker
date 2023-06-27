let currentMeme;
let navBar = document.getElementById("meme-menu");

const codingMemesAPI = "https://meme-api.com/gimme/ProgrammerHumor/10/";
const memesAPI = "https://meme-api.com/gimme/ProgrammerHumor/10";

function loadMemes() {
  fetch(memesAPI)
    .then((imgFlipResp) => imgFlipResp.json())

    .then((APIData) => {
      let memeData = APIData.memes;
      memeData.forEach((memeData) => navMenu(memeData));

      memeDetails(APIData.memes[0]);
      console.log(APIData.memes[0]);
    });
}
loadMemes();

function navMenu(memeData) {
  const menuImg = document.createElement("img");

  console.log(memeData);
  menuImg.src = memeData.url;
  console.log(menuImg);

  navBar.append(menuImg);

  menuImg.addEventListener("click", () => {
    memeDetails(codingMemesAPI);
  });
}

function memeDetails(codingMemesAPI) {
  currentMeme = codingMemesAPI;
  const name = document.querySelector(".name");

  const image = document.querySelector(".detail-image");
  image.src = currentMeme.url;
}
