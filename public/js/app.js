const form = document.getElementById('form');
const foodType = document.getElementById('food-type');


// instantiate Food Class
const food = new Food;
// instantiate UI class
const ui = new UI;

form.addEventListener('submit', (e) => {
    // Get Food
    const foodItem = document.getElementById('search-input').value;
    console.log(foodItem);

    // Check if input is empty
    if(e.target === ''){
        ui.showError('Add a food item');
    } else{
        // Fetch food from API
        food.getFood(foodItem)
        .then(food => {
            console.log(food);
            // Display food type
            foodType.textContent = food.q;

            // Show food items in the UI
            ui.paint(food.hits);

            ui.clearInput();
        })
        .catch(err => {
            ui.showError(err);
        })
    }

    ui.clearInput();
    
    e.preventDefault();
});

