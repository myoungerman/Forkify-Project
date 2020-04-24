import { searchForRecipeAW } from './models/Search';
import { displaySearchResults } from './views/searchView';

document.querySelector('.search__btn').addEventListener('click', (event) => {
    event.preventDefault();
    searchForRecipeAW().then(data => {
        displaySearchResults(data);
    });
});