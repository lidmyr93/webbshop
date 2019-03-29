$(document).ready(function(){
    displayCars();
});//Ready

function displayCars(){
    let url = "cars.json";

    $.getJSON(url, function(response){
        
        let cars = response.cars;
        $.each(cars, function(key,value){
            console.log(value.name);
            /* "model"
            "info"
            "img" 
            "price" */

            $('#carholder').append(`<div class="card flex-row flex-wrap">
                                        <div class="card-header border-0">
                                            <img class="car-image" src="${value.img}" alt="${value.model}">
                                        </div>
                                        <div class="card-block pl-5">
                                            <h4 class="card-title">${value.model}</h4>
                                            <p class="card-text">${value.info}</p>
                                            <p class="card-text">Pris : ${value.price} kr</p>
                                            <a href="#" class="btn btn-primary">Köp</a>
                                        </div>
                
                                    </div>`);
        });
        
    })
};