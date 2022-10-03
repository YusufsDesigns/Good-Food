class UI{
    constructor(){
        this.collection = document.getElementById('collection');
        this.inputValue = document.getElementById('search-input').value;
        this.list = document.querySelector('.item-list');
    }

    paint(data){
        let output = '';
        data.forEach(hit => {
            output += `
                <div class="collection-item shadow-xl rounded-md overflow-hidden">
                    <div class="overflow-hidden">
                        <img src="${hit.recipe.image}" alt="" class="image w-full h-40 object-cover">
                    </div>
                    <div class="px-4 py-2 bg-white">
                        <span class="font-bold">${hit.recipe.label}</span>
                        <div class="my-2 flex items-center justify-between">
                            <span class="text-xs uppercase">${hit.recipe.calories.toFixed(0)} calories | ${hit.recipe.dishType}</span>
                            <div class="flex items-center space-x-1 cursor-pointer text-yellow-900 uppercase text-xs add-btn">
                            <span>Add to list</span>
                            <i class="fa-solid fa-circle-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>
            `
        });
        this.collection.innerHTML = output;
    };
    listModal(items){
        let output = '';
        items.forEach(function(item){
            output += `
                <div class="flex items-center justify-between">
                    <div class="flex flex-col items-start">
                        <span class="text-sm">${item.name}</span>
                        <span class="text-xs text-gray-500">${item.servings} serving(s)</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-sm">${item.calories} Cal</span>
                        <i class="fa-solid fa-trash text-yellow-600 cursor-pointer delete-item"></i>
                    </div>
                </div>
            `
        });
        this.list.innerHTML = output;
    };
    deleteListItem(item){
        item.remove();
    }
    clearInput(){
        document.getElementById('search-input').value = '';
    };
    showError(){

    }
}