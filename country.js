const containerFirst = document.querySelector('.container_first')

const countriesList = [...worldCountries]

//======== Generating default divs=========

function generateDivs(worldCountries) {

    containerFirst.innerHTML = ''

    for (let i = 0; i < worldCountries.length; i++) {

        const div = document.createElement('div')
        const p = document.createElement('p')
        p.textContent = worldCountries[i]
        div.setAttribute('class', 'container_first_item')
        div.setAttribute('id', 'container_first_content--' + i)
        div.appendChild(p)
        containerFirst.appendChild(div)
    }
}
generateDivs(worldCountries)
    //generateDivs(worldCountries) //===================calling the default function


// =========Printing the Number of countries ================

const counlent = document.querySelector('.counlent')
counlent.textContent = `Total number of countries ${worldCountries.length}`
counlent.style.fontSize = '2.1rem'


//========= search with start letter ===============

const startWithletter = () => {

    containerFirst.innerHTML = ''
    let letters = document.querySelector('.input_field').value
    const filteredCountry = worldCountries.filter(countries => countries.toLowerCase().startsWith(letters.toLowerCase()))
    generateDivs(filteredCountry)

    //=============printing the length of the countries=======
    const firstLetter = document.querySelector('.firstLetter')
    const length = document.querySelector('.length')
    const start = document.querySelector('.start')
    firstLetter.style.color = 'red'
    firstLetter.style.fontWeight = 'bold'
    firstLetter.style.fontSize = '30px'
    length.style.color = 'blue'
    length.style.fontWeight = 'bold'
    length.style.fontSize = '30px'
    start.textContent = 'Countries Starting with'
    firstLetter.textContent = `${letters}`
    length.textContent = `${filteredCountry.length}`

    return filteredCountry
}
startWithletter()

//========= Listener for startwith ===============
let flag

function callToStart() {
    let startnwith = document.querySelector('btn_btn--capital')
    startnwith.addEventListener('click', function() {
        flag = 1
        let m = document.querySelector('.input_field').value
        let char = /^[a-zA-Z]+$/;
        //===========================================================================
        if (String(m).search(char)) {

            containerFirst.textContent = 'Please Enter a valid Input';
            return true;
        } else {

            false
        }
        startWithletter(m)
    })
}
callToStart()



//========= search with any letter ===============

const countriesInclude = () => {

    containerFirst.innerHTML = ''

    letters = document.querySelector('.input_field').value
    const filteredCountry = worldCountries.filter(countries => countries.toLowerCase().indexOf(letters.toLowerCase()) > -1)
    generateDivs(filteredCountry) //===================calling the default function

    //=============printing the length of the countries=======
    const firstLetter = document.querySelector('.firstLetter')
    const length = document.querySelector('.length')
    const include = document.querySelector('#include')
    firstLetter.style.color = 'red'
    firstLetter.style.fontWeight = 'bold'
    firstLetter.style.fontSize = '30px'
    length.style.color = 'blue'
    length.style.fontWeight = 'bold'
    length.style.fontSize = '30px'
    firstLetter.textContent = `${letters}`
    include.textContent = 'Countries That Include'
    length.textContent = `${filteredCountry.length}`

    return filteredCountry
}
countriesInclude()

//========= Listener for include ===============

function callToInclude() {
    let includeAny = document.querySelector('.btn_btn--include')
    includeAny.addEventListener('click', function() {

        flag = 2
        let m = document.querySelector('.input_field').value
        let char = /^[a-zA-Z]+$/;
        //===========================================================================
        if (String(m).search(char)) {

            containerFirst.textContent = 'Please Enter a valid input';
            return true;
        } else if (isNaN(m)) {
            containerFirst.textContent = 'Enter number greater than 5!';
        } else {
            false
        }
        countriesInclude(m)
    })
}
callToInclude()


// =========== sorting the function in reverse =====================
const sort = document.querySelector('.btn_btn--sort')
sort.addEventListener('click', function() {
    worldCountries.reverse()
    if (flag === 1) {
        startWithletter().reverse()
    } else {
        countriesInclude().reverse()
    }
})


// =========== Listener for keydown ===============================
let input = document.querySelector('.input_field')
input.addEventListener("keyup", function() {
    startWithletter()
    countriesInclude()
});


document.querySelector('.input_field').onkeydown = function(event) {
    if (event.keyCode == 13) {
        document.querySelector('btn_btn--capital').click()
        document.querySelector('.btn_btn--include').click()
    }
};

//================Toggle buttons==================================

/*let descending = 'a'

function toggleSort() {

    let image = document.querySelector('.button_img--size');
    if (descending == 'a') {
        image.src = './image/za.png'
        descending = 'z'
    } else {
        image.src = './image/az.png'
        descending = 'a'
    }
}
toggleSort()

let btndown = document.querySelector('.btn_btn--sort')
btndown.addEventListener('click', toggleSort)*/
//===================================================

/* CSS styles */

//=========Transition====================================

function focusFunction(trans) {
    trans.style.transition = "all 7s"; // Standard syntax
}
//========================================================

//=== Adding active class to the current button =====

let btnContainer = document.querySelector('.button');
let btns = btnContainer.querySelectorAll('#btn');

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {
        let current = document.getElementsByClassName('active');
        if (current.length > 0) {
            current[0].className = current[0].className.replace(' active', '');
        }
        this.className += ' active';
    });
}