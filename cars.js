$(document).ready(function(){
    displayCars();
    displayOrderedcars()
});//Ready

let carholder = $('#carholder');

function displayCars(){
    let url = "cars.json";
    
    $.getJSON(url, function(response){
        
        let cars = response.cars;
        let btnId = 0;
        $.each(cars, function(key,value){
            /* console.log(value.name); */
            /* "model"
            "info"
            "img" 
            "price" */
            btnId++;
            carholder.append(`<div class="card flex-row flex-wrap">
            <div class="card-header border-0">
            <img class="car-image" src="${value.img}" alt="${value.model}">
            </div>
            <div class="card-block pl-5">
            <h4 class="card-title">${value.model}</h4>
            <p class="card-text">${value.info}</p>
            <p class="card-text">Pris : ${value.price} kr</p>
            <a id="car${btnId}" href="#" class="btn btn-primary">Köp</a>
            </div>
            </div>`);
        });//each
        
        
        let carBtn = carholder.children("div").children(":last-child").children(":last-child");
        
        carBtn.on('click', saveCar);
    })//getJson
    
}; //displayCars

function saveCar(){
    let img = $(this).parentsUntil(carholder).children("div").children("img").attr("src");
    let title = $(this).parentsUntil(carholder).children("div").children("h4").text();
    let price = $(this).parentsUntil(carholder).children("div").children("p").last().text();

    let infoArray = [img,title,price];
    let jsonInfoArray = JSON.stringify(infoArray);
    localStorage.setItem('order1', jsonInfoArray);
};



// funktion för att visa produkten i varukorgen

function displayOrderedcars(){
    let orderedCars = localStorage.getItem('order1');
    orderedCars = JSON.parse(orderedCars);
    let varukorg = $("#varukorg-car");
    console.log(orderedCars[3]);
    if(orderedCars !== null){
        
            varukorg.append(`<div class="card flex-row flex-wrap">
                            <div class="card-header border-0">
                                <img class="car-image" src="${orderedCars[0]}" alt="">
                            </div>
                            <div class="card-block pl-5">
                                <h4 class="card-title">${orderedCars[1]}</h4>
                                <p class="card-text">${orderedCars[2]}</p>
                                <a id="car" href="#" class="btn btn-danger">Ta bort</a>
                            </div>
                        </div>`);
         
        
    }//if
        else{
           //nocar
        }//else
    
};//displayorderedcars

