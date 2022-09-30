class UI{
    constructor(){
        this.collection = document.getElementById('collection');
        this.inputValue = document.getElementById('search-input').value;
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
                            <div class="flex items-center space-x-1 cursor-pointer text-yellow-900 uppercase text-xs">
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
    clearInput(){
        document.getElementById('search-input').value = '';
    };
    showError(){

    }
}