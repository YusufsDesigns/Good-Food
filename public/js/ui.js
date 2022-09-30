class UI{
    constructor(){
        this.collection = document.getElementById('collection');
        this.inputValue = document.getElementById('search-input').value;
    }

    paint(data){
        let output = '';
        data.forEach(hit => {
            output += `
                <div class="collection-item shadow-xl relative cursor-pointer">
                    <div class="overflow-hidden">
                        <img src="${hit.recipe.image}" alt="" class="image w-full h-40 object-cover transition-all ">
                    </div>
                    <div class="px-4 py-2 bg-white">
                    <div class="flex items-center justify-between">
                        <span class="font-bold">${hit.recipe.label}</span>
                        <div class="text-yellow-900 text-sm">${hit.recipe.calories.toFixed(0)} cal
                        </div>
                    </div>
                        <div class="flex items-center justify-between my-2">
                            <span class="text-xs uppercase">Dish Type: ${hit.recipe.dishType}</span>
                            <span class="text-xs uppercase">Meal Type: ${hit.recipe.mealType}</span>
                        </div>
                    </div>
                </div>
            `
        });
        this.collection.innerHTML = output;
    };
    clearInput(){
        document.getElementById('search-input').value = '';
    };
    showError(){

    }
}