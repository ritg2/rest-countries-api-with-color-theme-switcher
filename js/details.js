const details = document.querySelector(".details");
const mode = document.querySelector(".mode");

let storedIsDark = JSON.parse(sessionStorage.getItem("isDark"));

let isDark = storedIsDark ? storedIsDark : false;

mode.addEventListener("click", () => {
  isDark = !isDark;
  sessionStorage.setItem("isDark", JSON.stringify(isDark));
  toggleMode();
});

function toggleMode() {
  let moon = document.querySelector(".fa-moon");
  if (isDark) {
    document.querySelector("body").classList.add("body-dark");
    document
      .querySelectorAll(".element")
      .forEach((element) => element.classList.add("dark-element"));
    moon.classList.remove("fa-regular");
    moon.classList.add("fa-solid");
  } else {
    document.querySelector("body").classList.remove("body-dark");
    document
      .querySelectorAll(".element")
      .forEach((element) => element.classList.remove("dark-element"));
    moon.classList.remove("fa-solid");
    moon.classList.add("fa-regular");
  }
}

// const urlParams = new URLSearchParams(window.location.search);
// const data = urlParams.get("data");

// console.log(data)

let queryString = location.search.substring(1);

fetch("https://restcountries.com/v3.1/name/" + queryString)
  .then((response) => response.json())
  .then((data) => renderDetails(data))
  .catch((error) => console.log(error));

// async function getcountyDetails() {
//   let response1 = await fetch(
//     "https://restcountries.com/v3.1/name/" + queryString
//   );
//   let data1 = await response1.json();
//   let response2 = await fetch(
//     "https://restcountries.com/v3.1/name/" + queryString
//   );

//   let data2 = await response2.json();

//   return [data1, data2];
// }

getcountyDetails()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

function renderDetails(data1) {
  console.log(data1);
  details.innerHTML = `<div>
    <img
      src="${data1[0].flags.svg}"
      alt=""
    />
  </div>
  <div class="country-stat">
    <h2>Country</h2>
    <p class="stat"><b>Native Name: </b>${data1[0].name.official}</p>
    <p class="stat"><b>Population: </b>${data1[0].population.toLocaleString()}</p>
    <p class="stat"><b>Region: </b>${data1[0].region}</p>
    <p class="stat"><b>Sub Region: </b>${data1[0].subregion}</p>
    <p class="stat"><b>Capital: </b>${data1[0].capital}</p>
  </div>
  <div class="tlc">
    <p class="stat"><b>Top Level Domain: </b></p>
    <p class="stat"><b>Currency: </b>euro</p>
    <p class="stat"><b>Languages: </b>Lorem, ipsum, dolor.</p>
  </div>
  <div>
    <p class="bc"><b>Border Countries:</b></p>
    <div class="btn-wrap">
      <div class="button element">
        <p>france</p>
      </div>
      <div class="button element">
        <p>Germany</p>
      </div>
      <div class="button element">
        <p>Netherlands</p>
      </div>
    </div>
  </div>`;
  toggleMode();
}
