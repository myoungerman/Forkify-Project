import { searchForRecipeAW } from './models/Search';
import { displaySearchResults } from './views/searchView';
import { previousBtn } from './views/searchView';
import { nextBtn } from './views/searchView';
import { switchPage } from './views/searchView';

document.querySelector('.search__btn').addEventListener('click', (event) => {
    event.preventDefault();
    searchForRecipeAW().then(data => {
        displaySearchResults(data);
    });
});

document.querySelector('.results__pages').addEventListener('click', () => {
    if (event.target.className == 'btn-inline results__btn--next') {
        switchPage('next');
    }
    if (event.target.className == 'btn-inline results__btn--prev') {
        switchPage('prev');
    }
});