export { storeRecipe };
export { checkStorage };

function storeRecipe() {
    let currRecipeTitle = document.querySelector('.recipe__title').querySelector('span').textContent;
    let recipesInSidebar = document.querySelector('.resultsPageNumber').querySelectorAll('li');

    for (let i = 0; i < recipesInSidebar.length; i++) { // Look in the search results and store the recipe that matches the currently loaded recipe.
        if (currRecipeTitle === recipesInSidebar[i].querySelector('.results__name').textContent) {
            let recipeToStore = recipesInSidebar[i].outerHTML;
            let key = recipesInSidebar[i].querySelector('.results__link').href; 

            localStorage.setItem(key, recipeToStore);
            let htmlAsString = localStorage.getItem(key);
            return htmlAsString;
        }
    }
}

function checkStorage() {
    let storedRecipes = [];

    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let htmlAsString = localStorage.getItem(key);

            storedRecipes.push(htmlAsString);
          }
          return storedRecipes;
    } else {
        return 0;
    }
}