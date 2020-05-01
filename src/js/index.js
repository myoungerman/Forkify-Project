import { searchForRecipeAW } from './models/Search';
import { displaySearchResults } from './views/searchView';
import { previousBtn } from './views/searchView';
import { nextBtn } from './views/searchView';
import { switchPage } from './views/searchView';
import { loadRecipeAW } from './models/Recipe';
import { displayRecipeDetails } from './views/recipeView';

document.querySelector('.search__btn').addEventListener('click', (event) => {
    event.preventDefault();
    searchForRecipeAW().then(data => {
        displaySearchResults(data);
    });
});

document.querySelector('.results__pages').addEventListener('click', () => {
    if (event.target.className == 'btn-inline results__btn--next') { switchPage('next'); }
    if (event.target.className == 'btn-inline results__btn--prev') { switchPage('prev'); }
});

document.querySelector('.resultsPageNumber').addEventListener('click', (event) => {
    let listItems = document.querySelectorAll('li');
    let recipeID = '';

    event.preventDefault();
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].contains(event.target)) {
            recipeID = listItems[i].querySelector('.results__link').getAttribute('href');
        }
    }
    
    loadRecipeAW(recipeID).then(recipeObj => {
        displayRecipeDetails(recipeObj);
    });
});