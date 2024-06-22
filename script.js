document.getElementById('fetchMealBtn').addEventListener('click', fetchMeal);


//Fetches a random meal from TheMealDB API and displays it
function fetchMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            displayMeal(data.meals[0]);
        })
        .catch(error => {
            console.error('Error fetching meal:', error);
        });
}


// Displays the meal details on the webpage
function displayMeal(meal) {
    const mealDisplay = document.getElementById('mealDisplay');
    mealDisplay.innerHTML = `
        <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
                <h2 class="card-title">${meal.strMeal}</h2>
                <p class="card-text"><strong>Category:</strong> ${meal.strCategory}</p>
                <p class="card-text"><strong>Cuisine:</strong> ${meal.strArea}</p>
                <p class="card-text"><strong>Instructions:</strong> ${meal.strInstructions}</p>
                <h3>Ingredients:</h3>
                <ul class="list-group">
                    ${getIngredients(meal).map(ingredient => `<li class="list-group-item">${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}


// Extracts ingredients and measures from the meal object 

function getIngredients(meal) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }
    return ingredients;
}
