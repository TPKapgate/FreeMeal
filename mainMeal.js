// We are using getItem function to get value of selectedID
const selectedID = localStorage.getItem('selectedID');
const dishName = document.getElementById('name');
const imageDiv = document.getElementById('image');
const revDiv = document.getElementById('receipe');
const receipeContent = document.getElementById('receipeContent');
const origin = document.getElementById('origin');

// this we are creating custom URl to get url based on id
const resource = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedID}`;

console.log(resource);
fetch(resource)
.then(response => response.json())
.then(data => {
    data.meals.forEach(ele =>{
        console.log('ele:- '+  ele['strMeal']);
        dishName.innerHTML = ele['strMeal'];
        const img = document.createElement('img');
        img.src = ele['strMealThumb'];
        img.style.height='300px';
        img.style.width='300px';
        imageDiv.appendChild(img);
        receipeContent.innerHTML = ele['strInstructions'] 
        origin.innerHTML = `Origin:- ${ele["strArea"]}`      
    })
})
.catch(error => {
    // Handle any errors
    console.error('Error fetching data:', error);
});

console.log(selectedID);