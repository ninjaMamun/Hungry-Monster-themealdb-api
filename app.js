const getMealList = () =>{ 
    let searchInput = document.getElementById('searchInput').value;
    let parentNode = document.getElementById('showItems');
    let NotFoundParentNode = document.getElementById('notfound');
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response => response.json())
    .then(data => {
        if(data.meals){ // return true when searched with valid keyword
            data.meals.forEach(meal => {
                console.log(meal.idMeal);
                console.log(meal.strMeal);
                const mealItemDiv = document.createElement('div');
                mealItemDiv.className = 'col-md-3 item-columns';
                
                let cardHtml = `
                <div class="card rounded-3 border-0">
                    <img src = "${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title food-title text-center">${meal.strMeal}</h5>
                    </div>
                  </div>
              
                `;
                mealItemDiv.innerHTML = cardHtml;
                parentNode.appendChild(mealItemDiv);

            });
        }else{ //when wrong input parameter is entered
            const mealItemDiv = document.createElement('div');
            mealItemDiv.className = 'col-md-3 item-columns';
            const notFoundCard = `
            <div class="card" style="width: 18rem;">
            <img src="./images/undraw_empty_xct9.svg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Not Found!</h5>
                <p class="card-text">Please Try Again With Correct Keyword!</p>
            </div>
            </div>
             `;
             mealItemDiv.innerHTML = notFoundCard;
             NotFoundParentNode.appendChild(mealItemDiv);

        }
    })
}


const getIngredients = id => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.json())
    .then(data => {

        const myMeal = data.meals[0] ;
        const keys = Object.keys(myMeal);
        // console.log(keys‌);



        keys.forEach(key => {
            
            if (key.startsWith('strIngredient') && myMeal[key] != "" && myMeal[key] != null ) {
                // console.log("Duksi Vai AMI");
                console.log(myMeal[key]);
            }
        });

        // const myMeal = data.meals;
        // for(let i = 0; i < myMeal.length; i++){
        //     let mealItem = myMeal[i];
        //     if(mealItem.startsWith("strIngredients")){
        //         console.log(mealItem);
        //     }
        // }



    })
}

getIngredients(52771);

document.getElementById('searchButton').addEventListener('click', function(){
    let parentNode = document.getElementById('showItems');
    parentNode.innerText = ""; // removes previous items
    getMealList();

})

