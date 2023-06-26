const filter = document.querySelector(".filter-by");
const filterOptions = document.querySelector(".filter-options");
const countries = document.querySelector(".countries");
const mode = document.querySelector(".mode");
const search = document.getElementById("search");
const options = document.querySelectorAll(".option");
const searchIcon = document.querySelector(".fa-magnifying-glass");

let countriesArray = [];

let isDark = false;

async function getCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  return data;
}

getCountries()
  .then((data) => {
    countriesArray = data;
    renderCountries(countriesArray);
  })
  .catch((error) => console.log(error.message));

options.forEach((option) => {
  option.addEventListener("click", () => {
    search.value = "";
    let result = countriesArray.filter(
      (country) => country.region === option.textContent
    );
    renderCountries(result);
  });
});

search.addEventListener("input", () => {
  if (!search.value) return;
  let result = countriesArray.filter((country) =>
    country.name.common.toLowerCase().includes(search.value.toLowerCase())
  );
  if (result.length) {
    renderCountries(result);
  } else {
    countries.innerHTML = `<p class="no-result">No result found.</p>`;
  }
});

filter.addEventListener("click", (e) => {
  e.stopPropagation();
  filterOptions.classList.toggle("show");
});

window.onclick = () => {
  if (filterOptions.classList.contains("show")) {
    filterOptions.classList.remove("show");
  }
};

mode.addEventListener("click", () => {
  isDark = !isDark;
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

function renderCountries(array) {
  let pageContent = "";
  for (let i = 0; i < array.length; i++) {
    pageContent += `<a href="#" onclick="onNavigate('/details'); return false;">
    <div class="card"}>
        <img
          src="${array[i].flags.png}"
        />
        <div class="element">
          <h2>${array[i].name.common}</h2>
          <p class="stat"><b>Population: </b>${array[
            i
          ].population.toLocaleString()}</p>
          <p class="stat"><b>Region: </b>${array[i].region}</p>
          <p class="stat"><b>Capital: </b>${array[i].capital}</p>
        </div>
      </div>
      </a>`;
  }

  countries.innerHTML = pageContent;
  toggleMode();
}
