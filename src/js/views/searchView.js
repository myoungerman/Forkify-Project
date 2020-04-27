export { displaySearchResults };
export { previousBtn };
export { nextBtn };
export { switchPage };

let currResultsPage = 0;
let previousBtn = document.querySelector('.results__btn--prev');
let nextBtn = document.querySelector('.results__btn--next');
let numDivs = 0;

previousBtn.style.display = 'none';
nextBtn.style.display = 'none';

function displaySearchResults (data) {
    let count = 0;
    const numRecipeResults = data.recipes.length;
    let numOfListItems = 0;

    for (count = 0; count < numRecipeResults; count++) {
        let currRecipe = data.recipes[count];
        let currListItem = 0;

        document.querySelector('.resultsPageNumber').insertAdjacentHTML('beforeend', '<li><a class="results__link" href="123"><figure class="results__fig"><img src="" alt="Test"></figure><div class="results__data"><h4 class="results__name">Recipe Name</h4><p class="results__author">Recipe Author</p></div></a></li>');
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

    numDivs = document.querySelectorAll('[class^="page"]');

    for (let k = 1; k < numDivs.length; k++) {
        numDivs[k].style.display = 'none';
    }

    nextBtn.style.display = 'block';
    nextBtn.querySelector('span').textContent = 'Page 2';
}

function switchPage(pageToLoad) {
     if (pageToLoad === 'next') { // Load the next page.
        document.querySelector(`.page${currResultsPage}`).style.display = 'none';
        currResultsPage += 1;
        document.querySelector(`.page${currResultsPage}`).style.display = 'block';
        previousBtn.style.display = 'block';
        previousBtn.querySelector('span').textContent = `Page ${currResultsPage}`;
        nextBtn.querySelector('span').textContent = `Page ${currResultsPage + 2}`;

        if (currResultsPage == (numDivs.length - 1)) { // Hide the next button if this is the last page.
            nextBtn.style.display = 'none';
        } 
    } else { // Load the previous page.
        document.querySelector(`.page${currResultsPage}`).style.display = 'none';
        currResultsPage -= 1;
        document.querySelector(`.page${currResultsPage}`).style.display = 'block';
        previousBtn.querySelector('span').textContent = `Page ${currResultsPage}`;
        nextBtn.querySelector('span').textContent = `Page ${currResultsPage + 2}`;

        if (currResultsPage == (numDivs.length - 2)) { // Show the next button if another page exists.
            nextBtn.style.display = 'block';
        } 
        if (currResultsPage == 0) { // Hide the previous button if this is the first page.
            previousBtn.style.display = 'none';
        }
    }
}