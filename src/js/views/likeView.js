export { addRecipeToLikeList };
export { showLikeList };
export { recreateLikeList };

function addRecipeToLikeList(key) {
    let likesList = document.querySelector('.likes__list');
    let recipeString = localStorage.getItem(key);
    
    likesList.insertAdjacentHTML('beforeend', recipeString);
}

function showLikeList() {
    let likeList = document.querySelector('.likes__list');

    likeList.style.display = 'block';
}

function recreateLikeList(storedRecipes) {
    // insert each el of the array into the like list
    let likesList = document.querySelector('.likes__list');

    for (let i = 0; i < storedRecipes.length; i++) {
        let recipeString = storedRecipes[i];
        
        likesList.insertAdjacentHTML('beforeend', recipeString);
    }
}