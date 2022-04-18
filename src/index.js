const URL_BASE = `https://vocal-malasada-2e72d0.netlify.app/`;

/**
 * Get the date as "writen"
 * @param {string} date - In format yyyy-mm-dd
 * @example
 * const dateAsText = getDateWithText("2022-01-01"); // --> January 1, 2022
 */
function getDateWithText(date, languague = "en-US") {
  return new Intl.DateTimeFormat(languague, {
    dateStyle: "long",
  }).format(new Date(`${date}`));
}

/**
 * Get random item from array
 * @param {any[]} array - Array of elements
 * @returns {any} Element from that array
 */
function getRandomItemFromArray(array) {
  /**
   * Random value from 0-1
   * @example
   * const seed = Math.random(); // --> 0.353
   */
  const seed = Math.random();

  /**
   * If element has 10 elements, the value it's scalated from 0-10 according the seed
   * @example
   * const scalatedSeed = 0.353 * 10; // --> 3.53
   *
   */
  const scalatedSeed = seed * array.length;

  const randomIndexPositionArray = Math.floor(scalatedSeed);

  return array[randomIndexPositionArray];
}

(async function () {
  try {
    const resApi = await fetch("https://amiiboapi.com/api/amiibo/?showusage");

    /**
     * @type {{amiibo:import("../types").AmiiboI[]}}
     */
    const { amiibo } = await resApi.json();

    const randomAmiibos = getRandomAmiibos(amiibo, 20);

    /**
     * @type {import("../types").ParsedAmiiboI[]}
     */
    const parsedAmiibos = randomAmiibos.map((figureAmiibo) => {
      return {
        ...figureAmiibo,
        flagReleases: {
          au:
            figureAmiibo.release.au !== null
              ? `${URL_BASE}/images/australia.png`
              : null,
          eu:
            figureAmiibo.release.eu !== null
              ? `${URL_BASE}/images/european-union.png`
              : null,
          jp:
            figureAmiibo.release.jp !== null
              ? `${URL_BASE}/images/japan.png`
              : null,
          na:
            figureAmiibo.release.na !== null
              ? `${URL_BASE}/images/united-states-of-america.png`
              : null,
        },
      };
    });

    const htmlDomArticles = parsedAmiibos.reduce((stringHtml, amiibo) => {
      const randomNintendoSwitchUssage = getRandomItemFromArray(
        amiibo.gamesSwitch
      );

      const random3dsUssage = getRandomItemFromArray(amiibo.games3DS);

      const randomWiiuUssage = getRandomItemFromArray(amiibo.gamesWiiU);

      return (stringHtml += `
        <article>
            <img
              src="${amiibo.image}"
              alt="${amiibo.character}"
            />
    
            <div class="character">
              <span>${amiibo.character}</span>
              <span>${amiibo.amiiboSeries}</span>
            </div>


            ${
              randomNintendoSwitchUssage === undefined
                ? ""
                : `<div class="ussage">
            <div>
              <img src="${URL_BASE}/images/nintendo-switch.png" alt="nintendo-switch" />
              <span> Nintendo Switch - ${randomNintendoSwitchUssage.gameName} </span>
            </div>
  
            <p>
            ${randomNintendoSwitchUssage.amiiboUsage[0].Usage}
            </p>
          </div>`
            }

            ${
              random3dsUssage === undefined
                ? ""
                : `<div class="ussage">
            <div>
              <img src="${URL_BASE}/images/nintendo-ds.png" alt="nintendo-ds" />
              <span> Nintendo 3DS - ${random3dsUssage.gameName} </span>
            </div>
  
            <p>
            ${random3dsUssage.amiiboUsage[0].Usage}
            </p>
          </div>`
            }

            ${
              randomWiiuUssage === undefined
                ? ""
                : `<div class="ussage">
            <div>
              <img src="${URL_BASE}/images/wii-u.png" alt="wii-u" />
              <span> Nintendo 3DS - ${randomWiiuUssage.gameName} </span>
            </div>
  
            <p>
            ${randomWiiuUssage.amiiboUsage[0].Usage}
            </p>
          </div>`
            }
            
            <b>Releases</b>

            <div class="releases">
            ${
              amiibo.flagReleases.au
                ? `
                  <div class="release">
                    <img src="${amiibo.flagReleases.au}" alt="australia-flag" />
                    <span>${getDateWithText(amiibo.release.au)}</span>
                  </div>
                `
                : ""
            }
    
            ${
              amiibo.flagReleases.eu
                ? `
                  <div class="release">
                    <img src="${
                      amiibo.flagReleases.eu
                    }" alt="europe-union-flag" />
                    <span>${getDateWithText(amiibo.release.eu)}</span>
                  </div>
                `
                : ""
            }
    
            ${
              amiibo.flagReleases.jp
                ? `
                  <div class="release">
                    <img src="${amiibo.flagReleases.jp}" alt="japan-flag" />
                    <span>${getDateWithText(amiibo.release.jp)}</span>
                  </div>
                `
                : ""
            }
    
            ${
              amiibo.flagReleases.na
                ? `
                  <div class="release">
                    <img src="${
                      amiibo.flagReleases.na
                    }" alt="north-america-flag" />
                    <span>${getDateWithText(amiibo.release.na)}</span>
                  </div>
                `
                : ""
            }
            </div>
            
          </article>
        
        
        `);
    }, "");

    const mainTag = document.getElementById("main");

    mainTag.innerHTML = htmlDomArticles;
  } catch (error) {
    console.log(error);
  }

  /**
   * Get random amiibos among the full list
   * @param {object[]} amiibos - List of amiibos got from server
   * @param {number} limit - Limiti of random amiibos to get from that list
   * @returns {object[]}
   */
  function getRandomAmiibos(amiibos, limit) {
    let amiiboList = [];

    for (let i = 0; i < limit; i++) {
      const randomAmiibo = getRandomItemFromArray(amiibos);
      amiiboList.push(randomAmiibo);
    }

    return amiiboList;
  }
})();
