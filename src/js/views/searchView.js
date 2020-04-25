export { displaySearchResults };

let nextPageBtn = document.querySelector('.results__pages');
nextPageBtn.style.display = "none";

function displaySearchResults (data) {
    let count = 0;
    const numRecipeResults = data.recipes.length;
    let numOfListItems = 0;

    document.querySelector('.results__btn--next').style.display = "block";
    nextPageBtn.querySelector('.results__btn--next').querySelector('span').textContent = 'Page 2';

    for (count = 0; count < numRecipeResults; count++) {
        let currRecipe = data.recipes[count];
        let currListItem = 0;

        document.querySelector('.resultsPageNumber').insertAdjacentHTML('beforeend', '<li><a class="results__link results__link--active" href="123"><figure class="results__fig"><img src="" alt="Test"></figure><div class="results__data"><h4 class="results__name">Recipe Name</h4><p class="results__author">Recipe Author</p></div></a></li>');
        numOfListItems = document.querySelector('.resultsPageNumber').querySelectorAll('li');
        currListItem = numOfListItems[count]; 

        currListItem.querySelector('.results__link').href = currRecipe.recipe_id;
        currListItem.querySelector('img').src = currRecipe.image_url;
        currListItem.querySelector('.results__name').textContent = currRecipe.title;
        currListItem.querySelector('.results__author').textContent = currRecipe.publisher;
    }

    let currPage = 0;
    let parentDiv = 0;

    for (let i = 0; i < numRecipeResults; i += 10) {
        numOfListItems[i].insertAdjacentHTML('beforebegin', `<div class="page${currPage}"></div>`);
        currPage += 1;
    }

    for (let j = 0; j < numRecipeResults; j++) {
        document.querySelector(`.page${parentDiv}`).append(numOfListItems[j]);
        if ((j + 1) % 10 === 0) {
            parentDiv += 1;
        }
    }
}