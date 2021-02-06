const getMealList = () =>{
    let searchInput = document.getElementById('searchInput').value;
    let parentNode = document.getElementById('showItems');
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(response => response.json())
    .then(data => {
        if(data.meals){
            data.meals.forEach(meal => {
                console.log(meal.idMeal);
                console.log(meal.strMeal);
                const mealItemDiv = document.createElement('div');
                
                let cardHtml = `
                <div class="card" style="width: 18rem;">
                    <img src = "${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                    </div>
                  </div>
              
                `
                mealItemDiv.innerHTML = cardHtml;
                parentNode.appendChild(mealItemDiv);




            });
        }
    })
}
document.getElementById('searchButton').addEventListener('click', function(){
    getMealList();
})

