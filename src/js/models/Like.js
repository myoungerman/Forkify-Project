export { storeRecipe };

function storeRecipe() {
    let currRecipeTitle = document.querySelector('.recipe__title').querySelector('span').textContent;
    let recipesInSidebar = document.querySelector('.resultsPageNumber').querySelectorAll('li');

    for (let i = 0; i < recipesInSidebar.length; i++) { // Store the recipe in the list that matches the currently loaded recipe.
        if (currRecipeTitle === recipesInSidebar[i].querySelector('.results__name').textContent) {
            let recipeToStore = recipesInSidebar[i].outerHTML;
            let key = recipesInSidebar[i].querySelector('.results__link').href; 

            sessionStorage.setItem(key, recipeToStore);
            return key;
        }
    }
}