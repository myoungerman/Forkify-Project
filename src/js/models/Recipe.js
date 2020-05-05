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
    let arrOfIngredients = recipeObj.recipe.ingredients;
    let unitOfMeasurement = ['cup', 'tablespoon', 'teaspoon', 'ounce', 'pound', 'lb', 'quart', 'gallon', 'gram'];
    let parsedIngredients = [];

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

                if ((ingredientQuantity.indexOf('(') && ingredientQuantity.indexOf(')')) != -1) { // Remove any parentheseses and text in them.
                    let firstParenthesis = ingredientQuantity.indexOf('(');
                    let secondParenthesis = ingredientQuantity.indexOf(')');
                    let stringInParentheses = ingredientQuantity.substring(firstParenthesis, (secondParenthesis + 1));

                    ingredientQuantity = ingredientQuantity.replace(stringInParentheses, '');
                }
                let numsInString = ingredientQuantity.split(' '); // Split the quantity at each space, returning each individual number.
                numsInString = numsInString.filter(el => el != '');

                for (let j = 0; j < numsInString.length; j++) { // Cast the elements as numbers.
                    numsInString[j] = parseFloat(numsInString[j]);
                }
                ingredientQuantity = numsInString.reduce(sumOfArray); // Combine all of the numbers in the string.

                if (ingredientName.charAt(0) === 's') { ingredientName = ingredientName.replace('s ', ''); } // Remove the dangling 's ' if one exists.
                break; // Once a keyword is found, move to the next ingredient string.
            } else {
                ingredientQuantity = 1;
                ingredientUnitOfMeasurement = '';
                ingredientName = arrOfIngredients[i];
            }
        }
        let ingredientObj = {
            quantity: ingredientQuantity,
            unitOfMeasurement: ingredientUnitOfMeasurement,
            name: ingredientName
        }
        parsedIngredients.push(ingredientObj);
    }
    return parsedIngredients;
}

function sumOfArray(total, num) {
    return total + num;
}