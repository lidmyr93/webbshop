$(document).ready(function () {
    displayCars();
    displayOrderedcars();
    CheckForm();
});//Ready
/* let orderedCars = localStorage.getItem('order1'); */
let carholder = $('#carholder');

function displayCars() {
    let url = "cars.json";

    $.getJSON(url, function (response) {

        let cars = response.cars;
        let btnId = 0;
        $.each(cars, function (key, value) {
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
            <p class="card-text">Antal : <input id="quantity" type="number" min="1" value="1"></p>
            <a id="car${btnId}" href="#" class="btn btn-primary">Köp</a>
            </div>
            </div>`);
        });//each


        let carBtn = carholder.children("div").children(":last-child").children(":last-child");
        carBtn.on('click', saveCar);
    })//getJson

}; 
/* Detta steg är en början på VG-Delen att man kan köpa flera bilar */
// Problem med att refreshar man sidan så skriver nästa anrop över den gamla localstorage
function saveCar() {
    
    let quantity = $(this).parentsUntil(carholder).children("div").children("p").children("input").val();

    //För att kunna spara flera av samma bil
    //Switchfunktionen hemtar hem det värdet som finns sparat i LS beroende på vilket knapp man tryckt på
    //Sen adderar den det värdet med värdet från quantity som användaren lagt in

    let tempNumber = JSON.parse(localStorage.getItem(this.id))
    if (tempNumber == null) {
        localStorage.setItem(this.id, quantity);
    }
    else {
        localStorage.setItem(this.id, JSON.stringify(tempNumber + parseInt(quantity)))
    }
    
   
};


function displayOrderedcars() {
    let varukorg = $("#varukorg-car");
    let orderedCars = localStorage.getItem('order1');
    orderedCars = JSON.parse(orderedCars);
    console.log(orderedCars);
    if (orderedCars !== null) {
        $.each(orderedCars, function (key, value) {
            varukorg.append(`<div class="card flex-row flex-wrap">
                            <div class="card-header border-0">
                                <img class="car-image" src="${value[0]}" alt="">
                            </div>
                            <div class="card-block pl-5">
                                <h4 class="card-title">${value[1]}</h4>
                                <p class="card-text">${value[2]}</p>
                                <a id="${key}" href="#" class="btn btn-danger">Ta bort</a>
                            </div>
                        </div>`);
        });//each
    }//if
    else {
        //nocar
        varukorg.append(`<p> Du har inte köpt nån bil än </p>`)
    }//else

    let deleteBtn = varukorg.children("div").children(":last-child").children('a');
    console.log(deleteBtn);
    deleteBtn.on('click', function () {
        //clickedid matches the id generated by the above function that appends items from localstorage
        //Gets the btns parent element(total card) and hids it
        let clickedId = this.id
        let carContainer = $(this).parents(".card");
        carContainer.hide(500);
        console.log(varukorg);
        varukorg.children().hide();


        // Splice the array with this id , it will return the removed item, save that to a variable to kill off.
        testArray = orderedCars.splice(clickedId, 1);
        console.log(testArray);
        console.log(orderedCars);

        orderedCars = JSON.stringify(orderedCars);
        console.log(orderedCars);
        localStorage.setItem('order1', orderedCars)
        displayOrderedcars();
        // blir dubletter nu, almost there måste fixa displayOrderedcars eller helt enkelt append och skriva över hela varukorgen hära


    });
};//displayorderedcars


//referens till tabort knapp

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
            $("#namn").css({ "border": "3px solid green" })
            $("#namn").nextUntil("input").hide(100)
        }
        else {
            $("#namn").css({ "border": "3px solid red" })
            $("#namn").nextUntil("input").show(100)
            eCheck = false;
        }
    })
    //Adress validation
    $('#adress').keyup(() => {
        let confAdress = /^[a-öA-Ö0-9\s,'-]{5,100}$/;
        let adress = $('#adress').val()
        if (confAdress.test(adress)) {
            aCheck = true;
            $("#adress").css({ "border": "3px solid green" })
            $("#adress").nextUntil("input").hide(100)
        }
        else {
            $("#adress").css({ "border": "3px solid red" })
            $("#adress").nextUntil("input").show(100)
            eCheck = false;
        }
    })
    //Phone validation
    $('#telefon').keyup(() => {
        let confTel = /^[0-9]{8,12}$/;
        let telefon = $('#telefon').val()

        if (confTel.test(Number(telefon))) {
            tCheck = true;
            $("#telefon").css({ "border": "3px solid green" })
            $("#telefon").nextUntil("input").hide(100)

        }
        else {
            $("#telefon").css({ "border": "3px solid red" })
            $("#telefon").nextUntil("input").show(100)
            eCheck = false;
        }
    })
    //email validation
    $('#mail').keyup(() => {
        let confEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

        let email = $('#mail').val()
        if (confEmail.test(email)) {
            eCheck = true;
            $("#mail").css({ "border": "3px solid green" })
            $("#mail").nextUntil("button").hide(100)
        }
        else {
            $("#mail").css({ "border": "3px solid red" })
            $("#mail").nextUntil("button").show(100)
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
    $('.close').click(() => { $(".show").hide(500) })

};

