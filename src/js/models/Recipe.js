export { loadRecipeAW };
export { parseIngredientString };

async function loadRecipeAW (recipeID) {
    // while the fetch is pending, display a loading spinner in the RecipeView module
    try {
        let result = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeID}`);
        let recipeObj = await result.json();
        return recipeObj;
    } catch(error) {
        console.log(`Error: ${error}`);
    }
}

function parseIngredientString(recipeObj) {
    /* 
    Ingredients data should look something like:
    • 8 ounces cream cheese, softened
    • teaspoon dried oregano
    • 1/4 cup chopped green bell pepper

    For each ingredient, search the string for words like cup, teaspoon, etc.
    If a match is found, set that word as the unit of measurement. Set everything after that word in the string as the ingredient name.
    Set everything before that word in the string as the item quantity.
    If the item quantity is '' and there is a unit of measurement, set the quantity to 1.
    If there's a / in the item quantity, get the numbers on either side of the / and divide them. Add that to any other numbers in the string.

    Else set the ingredient name to the string and remove the item quantity and unit of measurement.

    Once I have the quantity, unit of measurement, and ingredient name, store them in a map/object/array?

    Once all strings are parsed, return all of them.
    */
    let arrOfIngredients = recipeObj.recipe.ingredients;
    let unitOfMeasurement = ['cup', 'tablespoon', 'teaspoon', 'ounce', 'pound', 'lb', 'quart', 'gallon', 'gram'];

    for (let i = 0; i < arrOfIngredients.length; i++) {
        let ingredientQuantity = '';
        let ingredientUnitOfMeasurement = '';
        let ingredientName = '';

        for (let el of unitOfMeasurement) { // Search the ingredient string for each keyword.
            if ((arrOfIngredients[i].search(el) || arrOfIngredients[i].search(`${el}s`)) != -1) { // Searches string for the singular and plural of the keyword. 
                let splitString = arrOfIngredients[i].split(el);
                ingredientUnitOfMeasurement = el;
                ingredientQuantity = splitString[0];
                ingredientName = splitString[1];

                if (ingredientQuantity === '') { ingredientQuantity = 1; }
                if (ingredientQuantity.search('/') != -1) { // Convert fractions in the quantity to decimals.
                    let indexOfSlash = ingredientQuantity.search('/');
                    let numBeforeSlash = ingredientQuantity.charAt(indexOfSlash - 1);
                    let numAfterSlash = ingredientQuantity.charAt(indexOfSlash + 1);
                    let quotient = (numBeforeSlash / numAfterSlash).toString();

                    ingredientQuantity = ingredientQuantity.replace(`${numBeforeSlash}/${numAfterSlash}`, `${quotient}`); // Replace the fraction with the decimal equivalent to add all numbers in the string later.
                }
                let numsInString = ingredientQuantity.split(' '); // Split the quantity at each space, returning each individual number.
                ingredientQuantity = numsInString.reduce(sumOfArray); // Combine all of the numbers in the string.

                if (ingredientName.charAt(0) === 's') { ingredientName.replace('s ', ''); } // Remove the dangling 's ' if one exists.
                break; // Once a keyword is found, move to the next ingredient string.
            }
        }
    }
}

function sumOfArray(total, num) {
    return total + num;
}