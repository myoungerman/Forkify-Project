export { displayRecipeDetails };

const recipe = document.querySelector('.recipe');
let recipeImage = document.querySelector('.recipe__fig').querySelector('.recipe__img');
let recipeTitle = document.querySelector('.recipe__title').querySelector('span');
let recipeCookTime = document.querySelector('.recipe__info-data recipe__info-data--minutes');
let recipeServings = document.querySelector('recipe__info-data recipe__info-data--people');
let recipePublisher = document.querySelector('.recipe__directions').querySelector('.recipe__by');
let recipePublisherSite = document.querySelector('.recipe__directions').querySelector('.recipe__btn');
let firstTimeDisplayingAnyRecipe = true;

recipe.style.display = 'none';

function displayRecipeDetails(recipeObj) {
    let arrOfIngredients = recipeObj.recipe.ingredients;

    recipe.style.display = 'block';
    recipeImage.src = recipeObj.recipe.image_url;

    recipeTitle.textContent = recipeObj.recipe.title;
    recipePublisher.textContent = recipeObj.recipe.publisher;
    recipePublisherSite.href = recipeObj.recipe.source_url;

    if (firstTimeDisplayingAnyRecipe === false) {
        let previousItems = document.querySelector('.recipe__ingredient-list').querySelectorAll('li');
        for (let i = 0; i < previousItems.length; i++) {
            previousItems[i].remove();
        }
    }

    for (let i = 0; i < arrOfIngredients.length; i++) {
        let ingredientString = arrOfIngredients[i];
        document.querySelector('.recipe__ingredient-list').insertAdjacentHTML('beforeend', `<li class="recipe__item"><svg class="recipe__icon"><use href="img/icons.svg#icon-check"></use></svg><div class="recipe__count"></div><div class="recipe__ingredient"><span class="recipe__unit"></span>${ingredientString}</div></li>`);
    }
    firstTimeDisplayingAnyRecipe = false;
}