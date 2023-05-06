'use strict';

const moviesJSON = './assets/script/movies.json';
const citiesJSON = './assets/script/cities.json';
const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    mode: 'cors'
}

async function getMovies() {
    try {
        const response = await fetch(moviesJSON, options);
        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`)
        }
        const data = await response.json();
        for (let i = 0; i < data.movies.length; i++) {
            let posterImg = data.movies[i].poster;
            let movieName = `${data.movies[i].title}`;
            generatePosters(posterImg, movieName);
        }
    } catch (error) {
        console.log(error.message);
    }
};

getMovies();

function generatePosters(pic, name) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('poster');
    newDiv.innerHTML = `<img src="${pic}"><p>${name}</p>`;
    moviesDisplay.appendChild(newDiv);
}


const moviesTitle = document.querySelector('#movies-title');
const citiesName = document.querySelector('#cities-name');
const moviesDisplay = document.querySelector('.display');
const moviesResults = document.querySelector('.movies');
const citiesResults = document.querySelector('.cities');

moviesTitle.addEventListener('input', async () => {
    if (moviesTitle.value.length > 1) {
        const inputValue = moviesTitle.value.toLowerCase();

        moviesResults.innerHTML = '';

        const response = await fetch(moviesJSON, options);
        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`)
        }
        const data = await response.json();
        const movieTitles = [];
        for (let i = 0; i < data.movies.length; i++) {
            let movieName = data.movies[i].title;
            movieTitles.push(movieName);
        }
        
        const filteredMovies = movieTitles.filter(movie => {
            return movie.toLowerCase().includes(inputValue);
        })

        if (filteredMovies.length > 0) {
            filteredMovies.forEach(movie => {
                const newResult = document.createElement('a');
                newResult.href = '#';
                newResult.textContent = movie;
                newResult.addEventListener('click', () => {
                    moviesTitle.value = newResult.textContent;
                    moviesResults.innerHTML = '';
                })
                moviesResults.appendChild(newResult);
            })
        } else {
            const defaultResult = document.createElement('a');
            defaultResult.href = '#';
            defaultResult.textContent = 'Movie not found';
            moviesResults.appendChild(defaultResult);
        }
    } else {
        moviesResults.innerHTML = '';
    }
});

citiesName.addEventListener('input', async () => {
    if (citiesName.value.length > 1) {
        const inputValue = citiesName.value.toLowerCase();

        citiesResults.innerHTML = '';

        const response = await fetch(citiesJSON, options);
        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`)
        }
        const data = await response.json();
        const cityNames = [];
        for (let i = 0; i < data.cities.length; i++) {
            let cityName = data.cities[i].name;
            cityNames.push(cityName);
        }

        const filteredCities = cityNames.filter(city => {
            return city.toLowerCase().includes(inputValue);
        })

        if (filteredCities.length > 0) {
            filteredCities.forEach(city => {
                const newResult = document.createElement('a');
                newResult.href = '#';
                newResult.textContent = city;
                newResult.addEventListener('click', () => {
                    citiesName.value = newResult.textContent;
                    citiesResults.innerHTML = '';
                })
                citiesResults.appendChild(newResult);
            })
        } else {
            const defaultResult = document.createElement('a');
            defaultResult.href = '#';
            defaultResult.textContent = 'City not found';
            citiesResults.appendChild(defaultResult);
        }
    } else {
        citiesResults.innerHTML = '';
    }
});