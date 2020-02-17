let searchByName = document.querySelector('.btn_btn--startwithname')
let searchByCapital = document.querySelector('.btn_btn--capital')
let searchByPopulation = document.querySelector('.btn_btn--population')
let flags
let check
let countries = []


//const url = 'https://restcountries.eu/rest/v2/all'
const url = 'https://restcountries.eu/rest/v2/all?fields=flag;name;capital;population;languages;currencies'

const containerFirst = document.querySelector('.container_first')

containerFirst.innerHTML = ''

fetch(url)
    .then(response => response.json())
    .then(countriesList => {
        countries = [...countriesList]
        countries.reverse()

        //========= Call default Div generator ===============
        generateDivs(countries)


        //========= Listener for name ===============
        searchByName.addEventListener('click', function() {
                callName(countries)
                    //  chart(filteredCountry)

            })
            //========= Listener for capital ===============
        searchByCapital.addEventListener('click', function() {
            callCapital(countries)
                //  chart(filteredCountry)
        })

        //========= Listener for population ===============
        searchByPopulation.addEventListener('click', function() {
            if (check == true) {
                callPopulation(countries)
            } else {
                callPopulationReverse(countries)
            }
        })

        // =========== Listener for keydown ===============================

        //let input = document.querySelector('.input_field')
        //  input.addEventListener('keyup', function() {
        // both(countries)
        // name(countries)
        // languages(countries)
        //population(countries)
        //  });

        // =========== Listener for keyup ===============================
        let input = document.querySelector('.input_field')
        input.addEventListener('keyup', function() {
            name(countries)
            capital(countries)
            languages(countries)
        });

        // =========== sorting the function in reverse =====================

        const sort = document.querySelector('.btn_btn--sort')
            /* sort.addEventListener('click', function() {
                     countries.reverse()
                     if (flags == 1) {
                         return name(countries).reverse()
                     } else {
                         return capital(countries).reverse()
                     }

                     countries.reverse()
                 })*/
        sort.addEventListener('click', function() {
            countries.reverse()
            if (flags == 1) {
                name(countries).reverse()
            } else {
                capital(countries).reverse()
            }
        })

        // =========Printing the Number of countries ================

        const counlent = document.querySelector('.counlent')
        counlent.style.fontFamily = 'Trebuchet MS'
        counlent.textContent = `There are ${countries.length} Countries at present!`
        counlent.style.fontSize = '1.5rem'
    }).
catch(function(err) {
    console.log('Loading...')
});


//======== Generating default divs=========

function generateDivs(countries) {

    containerFirst.innerHTML = ''

    for (let i = 0; i < countries.length; i++) {

        const div = document.createElement('div')
        const flagDiv = document.createElement('div')
        const textDiv = document.createElement('div')
        const flag = document.createElement('img')
        flag.setAttribute('class', 'flagImg')
        const countryName = document.createElement('p')
        const capital = document.createElement('p')
        const population = document.createElement('p')
        const currency = document.createElement('p')
        const languages = document.createElement('p')

        flag.src = countries[i].flag
        flag.alt = `Flag of ${countries[i].flag}`
        countryName.textContent = `Name: ${countries[i].name}`
        capital.textContent = `Capital: ${countries[i].capital}`
        population.textContent = `Population: ${countries[i].population.toLocaleString('en-US')}`
        languages.textContent = `Languages: ${countries[i].languages.map(l => `${l.name}`)}`
        currency.textContent = `Currency: ${countries[i].currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(' ,')}`
        
        div.setAttribute('class', 'container_first_item')
        div.style.transition = 'all 1s'
        div.setAttribute('id', 'container_first_item--' + i)
        flagDiv.setAttribute('class', 'flagProp')
        flagDiv.setAttribute('id', 'flagProp')
        textDiv.setAttribute('class', 'textProp')
        textDiv.setAttribute('id', 'textProp')
        flagDiv.appendChild(flag)
        textDiv.appendChild(countryName)
        textDiv.appendChild(capital)
        textDiv.appendChild(population)
        textDiv.appendChild(currency)
        textDiv.appendChild(languages)
        div.appendChild(flagDiv)
        div.appendChild(textDiv)
        containerFirst.appendChild(div)
  
    }
}

//=============== Search by Language ==========================

const languages = (countries) => {
  
    containerFirst.innerHTML = ''
    letters = document.querySelector('.input_field').value

   const sortedLanguage = countries.sort(function(a, b){
   let x = a.languages
   let y = b.languages
       if (x < y) 
       return 1
       if (x == y) 
       return 0
       if (x > y) 
       return -1  
   })

   const filteredCountry = sortedLanguage.filter(lang => (`${lang.languages.map(l => `${l.name}`)}`).toLowerCase().indexOf(letters.toLowerCase()) > -1);
   generateDivs(filteredCountry);

 
    //=============printing the length of the countries=======

    const firstLetter = document.querySelector('.firstLetter')
    const length = document.querySelector('.length')
    const include = document.querySelector('#include')
    const are = document.querySelector('.are')
    firstLetter.style.color = 'red'
    firstLetter.style.fontWeight = 'bold'
    firstLetter.style.fontSize = '30px'
    length.style.color = 'blue'
    length.style.fontWeight = 'bold'
    length.style.fontSize = '30px'
    firstLetter.textContent = `${letters}`
    include.textContent = 'Countries That Include'
    are.style.fontFamily = 'Trebuchet MS'
    are.style.fontSize = '25px'
    are.textContent = 'are'

    length.textContent = `${filteredCountry.length}`

}

//========= Listener for language ===============

function callLanguages(countries) {

    let m = document.querySelector('.input_field').value
    let char = /^[a-zA-Z]+$/;
    if (String(m).search(char)) {

        containerFirst.textContent = 'Please Enter a valid input';
        return true;
    } else if (isNaN(m)) {
        containerFirst.textContent = 'Enter number greater than 5!';
    } else {
        false
    }
   languages(countries)
}

//========= search by name ===============

const name = (countries) => {

    containerFirst.innerHTML = ''

    letters = document.querySelector('.input_field').value
    const filteredCountry = countries.filter(countries => countries.name.toLowerCase().indexOf(letters.toLowerCase()) > -1)
    generateDivs(filteredCountry)
    chart(filteredCountry) 

//=============printing the length of the countries=======
    const firstLetter = document.querySelector('.firstLetter')
    const length = document.querySelector('.length')
    const start = document.querySelector('.start')
    const are = document.querySelector('.are')
    firstLetter.style.color = 'red'
    firstLetter.style.fontWeight = 'bold'
    firstLetter.style.fontSize = '30px'
    length.style.color = 'blue'
    length.style.fontWeight = 'bold'
    length.style.fontSize = '30px'
    start.textContent = 'Names with'
    are.textContent = 'are'
    are.style.fontSize = '25px'
    are.style.fontFamily = 'Trebuchet MS'
    start.style.fontFamily = 'Trebuchet MS'
    start.style.fontSize = '25px'
    firstLetter.textContent = `${letters}`
    length.textContent = `${filteredCountry.length}`    
}

//========= Listener for name ===============
function callName(countries) {
    flags = 1
    let m = document.querySelector('.input_field').value
    let char = /^[a-zA-Z]+$/;
    //===========================================================================
    if (String(m).search(char)) {
        containerFirst.textContent = 'Please Enter a valid Input';
        return true;
    } else {
        false
    }
   name(countries)  
}

//========= search for capital ===============
const capital = (countries) => {

    containerFirst.innerHTML = ''

    letters = document.querySelector('.input_field').value

    const filteredCountry = countries.filter(countries => countries.capital.toLowerCase().includes(letters.toLowerCase()))
  
    generateDivs(filteredCountry) 
    chart(filteredCountry) 

//=============printing the length of the countries=======
    const firstLetter = document.querySelector('.firstLetter')
    const length = document.querySelector('.length')
    const include = document.querySelector('#include')
    const are = document.querySelector('.are')
    firstLetter.style.color = 'red'
    firstLetter.style.fontWeight = 'bold'
    firstLetter.style.fontSize = '30px'
    length.style.color = 'blue'
    length.style.fontWeight = 'bold'
    length.style.fontSize = '30px'
    firstLetter.textContent = `${letters}`
    include.textContent = 'Capitals with'
    are.style.fontFamily = 'Trebuchet MS'
    are.style.fontSize = '25px'
    are.textContent = 'are'

    length.textContent = `${filteredCountry.length}`  
}

//========= Listener for capital ===============

function callCapital(countries) {

    flags = 2
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
   capital(countries)
 
}

//========= search by population ===============

const population = (countries) => {

    containerFirst.innerHTML = ''

 const sortedCounteries = countries.sort((a, b) => {
    if (a.population < b.population) return 1
    if (a.population == b.population) return 0
    if (a.population > b.population) return -1
 }) 


    if (flags == 2){
        letters = document.querySelector('.input_field').value
    const filteredCountry = sortedCounteries.filter(Count => Count.capital.toLowerCase().includes(letters.toLowerCase()))
     generateDivs(filteredCountry) 
     //chart(filteredCountry)   

    } else if(flags == 1){
        letters = document.querySelector('.input_field').value
    const filteredCountry = sortedCounteries.filter(Count => Count.name.toLowerCase().includes(letters.toLowerCase()))
    generateDivs(filteredCountry)
    //chart(filteredCountry) 

    } else{
      generateDivs(countries)
     
    } 
}

//========= Listener for population ===============
function callPopulation(countries) {      
  check = false
  population(countries)
}

document.querySelector('.input_field').onkeydown = function(event) {
    if (event.keyCode == 13) {
        document.querySelector('.btn_btn--startwithname').click()
        document.querySelector('.btn_btn--capital').click()
        document.querySelector('.btn_btn--population').click()
    }
};

//========= search by populationReverse ===============

const populationReverse = (countries) => {

    containerFirst.innerHTML = ''

    const sortedCounteries = countries.sort((a, b) => {
        if (a.population > b.population) return 1
        if (a.population == b.population) return 0
        if (a.population < b.population) return -1  
    })


    if (flags == 2){
        letters = document.querySelector('.input_field').value
    const filteredCountry = sortedCounteries.filter(Count => Count.capital.toLowerCase().includes(letters.toLowerCase()))
     generateDivs(filteredCountry)

    } else if(flags == 1){
        letters = document.querySelector('.input_field').value
    const filteredCountry = sortedCounteries.filter(Count => Count.name.toLowerCase().includes(letters.toLowerCase()))
    generateDivs(filteredCountry)

    } else{
        generateDivs(countries)
      
    }   
}

//========= Listener for population ===============

function callPopulationReverse(countries) {      
    check = true
    populationReverse(countries)
}


//================Toggle buttons==================================

let descending = 'a'

function toggleSort(countries) {

    let image = document.querySelector('.button_img--size');
    if (descending == 'a') {
        image.src = './image/za.png'
        descending = 'z'
    } else {
        image.src = './image/az.png'
        descending = 'a'
    }
}

let btndown = document.querySelector('.btn_btn--sort')
btndown.addEventListener('click', toggleSort)

//============== Popsort for sorting population ======================

let down = 'a'
function popSort(countries) {
    
    let image = document.querySelector('.popbtn_image');
    if (down == 'a') {
        image.src ='./image/arrow-down.svg'
        down = 'z'
    } else {
        image.src = './image/arrow-up.svg'
      down = 'a'
    }
}

let btnPopulation = document.querySelector('.btn_btn--population')
btnPopulation.addEventListener('click', popSort)


//=========Transition====================================

function focusFunction(trans) {
    trans.style.borderColor = 'rgb(255, 255, 255)'
    trans.style.borderColor = 'rgb(255, 255, 255)'
    trans.style.borderColor = 'grey'
    trans.style.width = '60%'
    trans.style.transition = "all 1s";
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

/*============== Creating the HorizontalChart ==================*/

function chart (countries) {

    const sortedCounteries = countries.sort((a, b) => {
        if (a.population < b.population) return 1
        if (a.population == b.population) return 0
        if (a.population > b.population) return -1
     }) 
    
/* slicing Top 10 Countries */
    let graphPopulation = sortedCounteries.slice(0, 9)
    let chartPop = []
    let chartName = []
    graphPopulation.forEach(element => {
        chartPop.push(element.population)
        chartName.push(element.name)
        
    });

    countriesChart(chartPop, chartName)

}

//===================================
const containerSecond = document.querySelector('.container_second')
const myChart = document.querySelector('.myChart').getContext('2d');

const countriesChart = (chartPop, chartName) =>{ new Chart(myChart, {
    type:'horizontalBar', 
    data:{ 
      labels:chartName,
      datasets:[{
        label: 'population',
        data:chartPop, 
       
        backgroundColor:[
          'rgba(255, 99, 132, 0.6)',
          'rgba(0, 0, 0, .23)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 990, 132, 0.6)',
          'rgba(200, 99, 59, 0.6)',
          'rgba(000, 99, 59, 0.6)',
        ],
        borderWidth:1,
        borderColor:'#777',
        hoverBorderWidth:3,
        hoverBorderColor:'#000'
      }]
    },
    options:{
        title:{
            display:true,
            text:'Most populated Countries by Search Criteria',
            fontSize:25,
            margin: 25
          },
          scales: {
            yAxes: [{
              stacked: true,
              gridLines: {
                display: true,
                color: "rgba(255,99,132,0.2)"
              }
            }],
            xAxes: [{
              gridLines: {
                display: true,
              }
            }]
        },
        legend:{
            display:true,
            position:'top',
            labels:{
              fontColor:'#000'
            }
          },
          layout:{
            padding:{
              left:50,
              right:0,
              bottom:0,
              top:0
            }
        },
      tooltips:{
        enabled:true
      },
      events:['click']
      
    }
  });}