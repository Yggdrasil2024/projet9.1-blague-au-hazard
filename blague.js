// Le pont JS -> page. À recopier tel quel dans chaque projet S7 à S9.
const sortie = document.querySelector("#sortie");
function afficher(html) {
  //remplacement au lieu d'incrementer
  sortie.innerHTML = html;
}

const url = "https://official-joke-api.appspot.com/random_joke";

const loadingUI = `<article class="loader-container">
                    <span class="loader"></span>
                    <h2>Chargment...</h2>
                </article>`;

const loadJoke = async (url) => {
  afficher(loadingUI);
  let errorMessage = "";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw `${response.status}`;
    }

    const data = await response.json();
    if (!data.setup.includes("?")) {
      loadJoke();
    }
    const jokeCard = `<article class="joke">
                    <h3 class="joke-type">${data.type}</h3>
                    <h2 class="setup">${data.setup}</h2>
                    <p class="push-line-spoiler">${data.punchline}</p>
                    <a class="btn" href="index.html">Une autre</a>
                </article>`;

    afficher(jokeCard);
  } catch (error) {
    errorMessage = `<div class="error">
                    <p>Error: ${error}</p>
                    <a class="btn" href="index.html">reessayez</a>
                </div>`;
    afficher(errorMessage);
  }
};

loadJoke(url);
