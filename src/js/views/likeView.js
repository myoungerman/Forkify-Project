export { addRecipeToLikeList };
export { showLikeList };

function addRecipeToLikeList(key) {
    let likesList = document.querySelector('.likes__list');
    let recipeString = sessionStorage.getItem(key);
    
    likesList.insertAdjacentHTML('beforeend', recipeString);
}

function showLikeList() {
    let likeList = document.querySelector('.likes__list');

    likeList.style.display = 'block';
}