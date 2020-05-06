import { searchForRecipeAW } from './models/Search';
import { displaySearchResults } from './views/searchView';
import { switchPage } from './views/searchView';
import { loadRecipeAW } from './models/Recipe';
import { parseIngredientString } from './models/Recipe';
import { displayRecipeDetails } from './views/recipeView';
import { getListOfIngredients } from './views/listView';
import { updateShoppingList } from './views/listView';
import { deleteShoppingListItem } from './views/listView';
import { storeRecipe } from './models/Like';
import { addRecipeToLikeList } from './views/likeView';
import { showLikeList } from './views/likeView';
import { checkStorage } from './models/Like';
import { recreateLikeList } from './views/likeView';

onOpen();

// Refreshing the page or opening a duplicate tab
function onOpen() {
    let storedRecipes = checkStorage();
    if (storedRecipes.length != 0) { recreateLikeList(storedRecipes); }
}

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
    let likeList = document.querySelectorAll('li');
    let recipeID = '';

    event.preventDefault();
    for (let i = 0; i < likeList.length; i++) {
        if (likeList[i].contains(event.target)) {
            recipeID = likeList[i].querySelector('.results__link').getAttribute('href');
        }
    }

    loadRecipeAW(recipeID).then(recipeObj => {
        let parsedIngredients = parseIngredientString(recipeObj);
        displayRecipeDetails(recipeObj, parsedIngredients);
    });
});

// Clicking Add to Shopping List
document.querySelector('body').addEventListener('click', (event) => {
    let addtoListBtn = document.querySelector('.btn-small, recipe__btn');
    if (addtoListBtn.contains(event.target)) { 
        let ingredientList = getListOfIngredients();
        updateShoppingList(ingredientList);
     }
});

// Deleting an ingredient from the shopping list
document.querySelector('.container').addEventListener('click', (event) => {
    deleteShoppingListItem(event);
});

// Adding a recipe to the like list
document.querySelector('.container').addEventListener('click', (event) => {
    let heartBtnInRecipe = document.querySelector('.recipe__love');
    if (heartBtnInRecipe.contains(event.target)) {
        let key = storeRecipe();
        addRecipeToLikeList(key);
    }
});

// Displaying the like list
document.querySelector('.container').addEventListener('click', (event) => {
    let heartBtnAtTopOfPage = document.querySelector('.likes__field');

    if (heartBtnAtTopOfPage.contains(event.target)) { showLikeList(); }
});

// Clicking a recipe in the like list
document.querySelector('.likes__list').addEventListener('click', (event) => {
    let likeList = document.querySelector('.likes__list').querySelectorAll('li');
    let recipeID = '';

    event.preventDefault();
    for (let i = 0; i < likeList.length; i++) {
        if (likeList[i].contains(event.target)) {
            recipeID = likeList[i].querySelector('.results__link').getAttribute('href');
        }
    }

    loadRecipeAW(recipeID).then(recipeObj => {
        let parsedIngredients = parseIngredientString(recipeObj);
        displayRecipeDetails(recipeObj, parsedIngredients);
    });
});