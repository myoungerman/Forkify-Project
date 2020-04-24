export { searchForRecipeAW };

async function searchForRecipeAW() {
    try {
        let query = document.querySelector('.search__field').value;
        const result = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        const data = await result.json();
        return data;
    } catch (error) {
        console.log(`Encountered an error: ${error}`);
    }
}