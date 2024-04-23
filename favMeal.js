const container = document.getElementById("content");
const keys= localStorage.getItem("myData");
const newdata= JSON.parse(keys);
console.log(newdata.length);

// This is the main function. On calling this function we will show records
function show()
{
    container.innerHTML="";
newdata.forEach(element => {
    const res= `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${element["id"]}`;
    // console.log(res);
    fetch(res)
    .then(response=> response.json())
    .then(data =>{
        // console.log(data.meals[0]);
        addItem(data.meals[0])
    })
});
// This function will be used to add items in div. Which will later display on the form
function addItem(data)
{
    
    const temp_p = document.createElement("p");
    const temp_lbl = document.createElement("label");
    const deleteBtn = document.createElement("button");

    temp_p.innerHTML = data["strMeal"];
    deleteBtn.innerHTML = "Delete";
    temp_lbl.appendChild(temp_p);
    temp_lbl.appendChild(deleteBtn);
    container.appendChild(temp_lbl);
    temp_p.classList.add('p_tag');
    // this event listner is for deleteBtn
    deleteBtn.addEventListener('click',()=>{
        let i=0;
        console.log("delete clicked")
        console.log(newdata)
        console.log(data["id"])
        newdata.forEach(ele => {
            console.log(ele["id"])
            if (ele["id"] == data["idMeal"])
            {
                console.log('ale',i)
                newdata.splice(i, 1);
                localStorage.setItem('myData', JSON.stringify(newdata));
                show()
            }
            i+=1
        })
    })
}
}
show()