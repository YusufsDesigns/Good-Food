// Get Variables from the DOM
const form = document.getElementById('form');
const foodType = document.getElementById('food-type');
const addBtn = document.querySelector('.add-btn');
const modal = document.querySelector('.modal');
const collection = document.getElementById('collection');
const closeBtn = document.querySelectorAll('.close-btn');
const searchBtn = document.querySelector('.search-btn');
const calcBtn = document.getElementById('calc-btn');
const calcModal = document.querySelector('.calc-modal');
const listModal = document.querySelector('.list-modal');
const listBoxLink = document.querySelector('.list-box-link');
const listBoxIcon = document.querySelector('.list-box-icon');
const servingsInput = document.getElementById('servings');

// instantiate Food Class
const food = new Food;
// instantiate UI class
const ui = new UI;

// Form event handler
form.addEventListener('submit', (e) => {
    fetchFoodContents(e);

    e.preventDefault();
});

// Search event handler
searchBtn.addEventListener('click', (e) => {
    fetchFoodContents(e);
})

// Add to list event handler
collection.addEventListener('click', (e) => {
    showModal(e);
});

// Close add modal event handler
closeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.getElementById('servings').value = '';
        document.querySelector('.total-calories').innerHTML = '';
        calcBtn.value = 'Calculate';
        calcBtn.id = 'calc-btn';
        calcBtn.disabled = false;
    })
});

// Calculate total amount of calories
calcBtn.addEventListener('click', (e) => {
    calculateTotalCalories(e)

    e.preventDefault();
});

// Change button to calc on input 
servingsInput.addEventListener('input', (e) => {
    calcBtn.value = 'Calculate';
    calcBtn.id = 'calc-btn';
    calcBtn.disabled = false;
})

// Data structure for List items
const data = {
    items : [],
    grandTotalCalories : 0
}

// Add items to list modal
modal.addEventListener('mousedown', (e) => {
    if (e.target.id === 'add-to-total'){
        const Item = function(name, calories, servings){
            this.name = name;
            this.calories = calories;
            this.servings = servings;
        }

        const foodName = e.target.parentElement.previousElementSibling.childNodes[1].textContent;
        const calories = calculateTotalCalories(e).totalCalories;
        const servings = calculateTotalCalories(e).servings;

        item = new Item(foodName, calories, servings);

        data.items.push(item);

        calculateGrandTotalCalories();

        calcBtn.value = 'Total added'
        calcBtn.disabled = true; 

        ui.listModal(data.items)

        // Add number of items to list box link & icon
        document.querySelectorAll('.totals').forEach(total => {
            total.textContent = data.items.length;
        })
    }
});

// Open List Modal with list link
listBoxLink.addEventListener('click', () => {
    calcModal.classList.toggle('hidden');
    listModal.classList.toggle('hidden');
});

// Open List Modal with book icon
listBoxIcon.addEventListener('click', () => {
    modal.classList.remove('hidden');
    calcModal.classList.add('hidden');
    listModal.classList.remove('hidden');
});

// Delete list item
listModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-item')){
        const calories = parseFloat(e.target.previousElementSibling.textContent);
        data.items.forEach((item, index) => {
            if(item.calories === calories){
                data.items.splice(index, 1);
            }
        });
        const listItem = e.target.parentElement.parentElement;
        ui.deleteListItem(listItem);

        // Update grandTotalCalories
        calculateGrandTotalCalories();

        // Add number of items to list box link & icon
        document.querySelectorAll('.totals').forEach(total => {
            total.textContent = data.items.length;
        })
    }
})


// fetch food contents
function fetchFoodContents(e){
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
            if(food.more === false){
                ui.showError('Not Available');
            } else{
                console.log(food);
                // Display food type
                foodType.textContent = food.q;
    
                // Show food items in the UI
                ui.paint(food.hits);
            }
        })
        .catch(err => {
            ui.showError(err);
        })
    }
};

// Show modal
function showModal(e){
    if(e.target.parentElement.classList.contains('add-btn')){
        modal.classList.remove('hidden');
        calcModal.classList.remove('hidden');
        listModal.classList.add('hidden');
        // Get food name
        const foodName = e.target.parentElement.parentElement.previousElementSibling.textContent;
        // Get food contents
        const foodContents = e.target.parentElement.previousElementSibling.textContent;
        // Insert foodName & contents into modal
        document.querySelector('.food-name').textContent = foodName;
        document.querySelector('.food-contents').textContent = foodContents;
    }
}

// Calculate total calories of food with servings
function calculateTotalCalories(e){
    // Get food items calories
    const foodContents = e.target.parentElement.previousElementSibling.childNodes[3].textContent;
    const calories = parseFloat(foodContents);
    // Get amount of servings
    const servings = document.getElementById('servings').value;
    // Calculate total calories
    const totalCalories = calories * servings;
    // Instert total number of calories in modal
    document.querySelector('.total-calories').innerHTML = `
        <span class="my-8">Total calories: ${totalCalories}</span>
    `;
    calcBtn.value = '+ Add to total';
    calcBtn.id = 'add-to-total';

    return {
        totalCalories,
        servings
    };
}


    // calculate grandTotalCalories
    function calculateGrandTotalCalories(){
        let total = 0;
        data.items.forEach((item) => {
            total += item.calories;
        });
        data.grandTotalCalories = total;

        document.querySelector('.grand-total').textContent = total;
    }