class Food{
    constructor(){
        this.secretKey = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '508af0ffaemsh56f037494935f2ep1d647djsn51aeb521beb8',
                'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
            }
        };
    }
    
    async getFood(food){
        const response = await fetch(`https://edamam-recipe-search.p.rapidapi.com/search?q=${food}`, this.secretKey);
        const responseData = await response.json();
        return responseData;
    }
}