const inputBox = document.getElementById("inputs");
const Result = document.getElementById("searchResult");
const favBtn = document.getElementById("btnFav");

// This is we will use for mainMeal page
let selectedID = 0;
const myVariable = "Hello, World!";
localStorage.setItem('myVariable', myVariable);
inputBox.addEventListener('input', showSearch);

// On call of this function it will display the records based on input
function showSearch()
{
    console.log('input:-' + inputBox.value);
    const resource= `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputBox.value}`;
    fetch(resource)
    .then(response => response.json())
    .then(data => {
        Result.innerHTML = '';
        data.meals.forEach(ele =>{
            searchHelper(ele)
        })
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

}

// This Function will be used to show the records on main form
function searchHelper(val)
{
    const tempLabel = document.createElement("label");
    const temp_P = document.createElement("p");
    const addFav = document.createElement("button");
    addFav.innerHTML = "Add to Favorite";
    temp_P.innerHTML = val['strMeal'];
    addFav.addEventListener('click',function() {
        appendFav(val['idMeal'],val['strMeal'])
    });
    tempLabel.appendChild(temp_P);
    tempLabel.appendChild(addFav);
    Result.appendChild(tempLabel);
    temp_P.classList.add('temp_p');
    addFav.classList.add('temp_btn');
    temp_P.addEventListener('click',function() {
        document.location.href = "./mainMeal.html";
        console.log(val["idMeal"]);
        selectedID = val["idMeal"];
        localStorage.setItem('selectedID',selectedID);
    })

}
let data=[]
// Add to Favourite Event
function appendFav(id, mealName) {

    const newData = {"id":id}
    let storedData = getData('myData') || []; // Get existing data or initialize as an empty array
    console.log(storedData)
    storedData.push(newData); // Add new data
    setData('myData', storedData);
        
    }
    // Function to set value
    function setData(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Function to get data from localStorage
    function getData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

// Adding Event listner on click of Favourite Button    
favBtn.addEventListener('click',function() {
    document.location.href = "./favMeal.html";
});




