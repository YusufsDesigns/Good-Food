class UI{
    constructor(){
        this.collection = document.getElementById('collection');
        this.inputValue = document.getElementById('search-input').value;
    }

    paint(data){
        let output = '';
        data.forEach(hit => {
            output += `
                <div class="collection-item shadow-xl">
                    <div class="">
                        <img src="${hit.recipe.image}" alt="" class="w-full h-40 object-cover">
                    </div>
                    <div class="p-4 bg-white">
                        ${hit.recipe.label}
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