export { getListOfIngredients };
export { updateShoppingList };
export { deleteShoppingListItem };

let shoppingDiv = document.querySelector('.shopping');

shoppingDiv.style.display = 'none';

function getListOfIngredients() {
    let arrOfIngredients = [];
    let ingredientsList = document.querySelector('.recipe__ingredient-list').querySelectorAll('li');

    for (let i = 0; i < ingredientsList.length; i++) { // Store the quantity, name, and unit of each ingredient in an array.
        let currListItem = ingredientsList[i];
        let quantity = currListItem.querySelector('.recipe__count').textContent;
        let unit = currListItem.querySelector('.recipe__unit').textContent;
        let name = currListItem.querySelector('.recipe__ingredient').textContent;
        let ingredient = {
            quantity: quantity,
            unit: unit,
            name: name
        }

        arrOfIngredients.push(ingredient);
    }
    return arrOfIngredients;
}

function updateShoppingList(ingredientList) {
    let shoppingList = document.querySelector('.shopping__list');

    for (let i = 0; i < ingredientList.length; i++) { // Insert a new shopping list item with the current object's quantity, unit, and name.
        let currListItem = ingredientList[i];
        let quantity = currListItem.quantity;
        let unit = currListItem.unit;
        let name = currListItem.name;

        shoppingList.insertAdjacentHTML('beforeend', `<li class="shopping__item"> <div class="shopping__count"> <input type="number" value="${quantity}" step="100"> <p>${unit}</p> </div> <p class="shopping__description">${name}</p> <button class="shopping__delete btn-tiny"> <svg> <use href="img/icons.svg#icon-circle-with-cross"></use> </svg> </button> </li>`);
    }
}

function deleteShoppingListItem(event) {
    let shoppingListItem = document.querySelector('.shopping__list').querySelectorAll('li');

    for (let i = 0; i < shoppingListItem.length; i++) {
        if (shoppingListItem[i].querySelector('.shopping__delete, btn-tiny').contains(event.target)) { shoppingListItem[i].remove(); }
    }
}