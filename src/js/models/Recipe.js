export { loadRecipeAW };

async function loadRecipeAW (recipeID) {
    // while the fetch is pending, display a loading spinner in the RecipeView module
    try {
        let result = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeID}`);
        let recipeObj = await result.json();
        console.log(recipeObj);
        return recipeObj;
    } catch(error) {
        console.log(`Error: ${error}`);
    }

}