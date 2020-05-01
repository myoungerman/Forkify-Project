import { searchForRecipeAW } from './models/Search';
import { displaySearchResults } from './views/searchView';
import { switchPage } from './views/searchView';
import { loadRecipeAW } from './models/Recipe';
import { displayRecipeDetails } from './views/recipeView';

// Clicking Search
document.querySelector('.search__btn').addEventListener('click', (event) => {
    event.preventDefault();
    searchForRecipeAW().then(data => {
        displaySearchResults(data);
    });
});

// Clicking to move forward or backward a page of recipe search results
document.querySelector('.results__pages').addEventListener('click', () => {
    if (event.target.className == 'btn-inline results__btn--next') { switchPage('next'); }
    if (event.target.className == 'btn-inline results__btn--prev') { switchPage('prev'); }
});

// Clicking a recipe in the search results
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

// Clicking Add to Shopping List
document.querySelector('body').addEventListener('click', (event) => {
    let addtoListBtn = document.querySelector('.btn-small, recipe__btn');
    if (addtoListBtn.contains(event.target)) {  } // get the current li of the recipe, then pass it to List
});