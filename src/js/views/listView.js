export { getListOfIngredients };
export { updateShoppingList };

function getListOfIngredients() {
    let ingredientsList = document.querySelector('.recipe__ingredient-list').querySelectorAll('li');
    return ingredientsList;
}

function updateShoppingList(ingredientsList) {
    // add each item to the shopping list div
    let shoppingList = document.querySelector('.shopping__list');

    for (let i = 0; i < ingredientsList.length; i++) {
        let clone = ingredientsList[i].cloneNode(true);
        shoppingList.appendChild(clone);
    }
}