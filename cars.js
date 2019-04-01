$(document).ready(function(){
    displayCars();
    displayOrderedcars();
    CheckForm();
});//Ready
let orderedCars = localStorage.getItem('order1');
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
/* FUnkar för en bil nu, behöver göra om funktionen att den pushar in infoArray till en annan array på nytt index*/
function saveCar(){
    let img = $(this).parentsUntil(carholder).children("div").children("img").attr("src");
    let title = $(this).parentsUntil(carholder).children("div").children("h4").text();
    let price = $(this).parentsUntil(carholder).children("div").children("p").last().text();
    let infoArray = [img,title,price];
    let jsonInfoArray = JSON.stringify(infoArray);
    localStorage.setItem('order1', jsonInfoArray);
}
/* Detta steg är en början på VG-Delen att man kan köpa flera bilar */
/* let newArray = [];
function saveCar(){
    let img = $(this).parentsUntil(carholder).children("div").children("img").attr("src");
    let title = $(this).parentsUntil(carholder).children("div").children("h4").text();
    let price = $(this).parentsUntil(carholder).children("div").children("p").last().text();
    //infoArray kommer ha info om bilen du tryckt på temporärt
    let infoArray = [img,title,price];
    console.log(infoArray);
    //newArray kommer att innehålla arrayer som skapas temporärt av infoArray
    newArray.push(infoArray);
    console.log(newArray);
    let jsonInfoArray = JSON.stringify(newArray);
    localStorage.setItem('order1', jsonInfoArray);
}; */



// funktion för att visa produkten i varukorgen , OBS denna måste göras om i VG-Delen

function displayOrderedcars(){
    
    orderedCars = JSON.parse(orderedCars);
   
    let varukorg = $("#varukorg-car");
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
         
        return orderedCars;
    }//if
        else{
           //nocar
           varukorg.append(`<p> Du har inte köpt nån bil än </p>`)
        }//else
    
};//displayorderedcars

//Function to check the form and validate it
//When form is complete and buy button is pressed the complete buy pop-up comes
function CheckForm() {
    let nCheck
    let tCheck
    let aCheck
    let eCheck
    
    //namevalidation
    $('#namn').keyup(() => {
        let confName = /^[a-öA-Ö]{2,30}$/;
        let name = $('#namn').val()
        if (confName.test(name)) {
            nCheck = true;
            $("#namn").css({"border": "3px solid green"})
        }
        else {
            $("#namn").css({"border": "3px solid red"})
            eCheck = false;
        }
    })
    //Adress validation
    $('#adress').keyup(() => {
        let confAdress = /^[a-öA-Ö0-9\s,'-]{5,100}$/;
        let adress = $('#adress').val()
        if (confAdress.test(adress)) {
            aCheck = true;
            $("#adress").css({"border": "3px solid green"})
        }
        else {
            $("#adress").css({"border": "3px solid red"})
            eCheck = false;
        }
    })
    //Phone validation
    $('#telefon').keyup(() => {
        let confTel = /^[0-9]{8,12}$/;
        let telefon = $('#telefon').val()

        if (confTel.test(Number(telefon))) {
            tCheck = true;
            $("#telefon").css({"border": "3px solid green"})
        }
        else {
            $("#telefon").css({"border": "3px solid red"})
            eCheck = false;
        }
    })
    //email validation
    $('#mail').keyup(() => {
        let confEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

        let email = $('#mail').val()
        if (confEmail.test(email)) {
            eCheck = true;
            $("#mail").css({"border": "3px solid green"})
        }
        else {
            $("#mail").css({"border": "3px solid red"})
            eCheck = false;
        }
    })

    //Checks if all the fields have been correctly submitted, if so the button get enabled
    $("#form").keyup(() => {
        if (tCheck == true && nCheck == true && aCheck == true && eCheck == true) {
            $("#final-buy").removeAttr("disabled")
        } else {
            $("#final-buy").attr("disabled", "true");
        }
    })
    // Shows the pop-up for a complete buy
    $("#final-buy").click(() => {
        $('.show').show(500)
        $('.show-text').append(`Tack för ditt köp av din nya ${orderedCars[1]} !!`)
        console.log(orderedCars);
        
    })
    // Closes the pop-up
    $('.close').click(()=>{$(".show").hide(500)})

};

