'use strict';

console.log('hello world');

// GOALS
/*
need way to display items
global function for displaying 3 items
item objects | Done
items array | Done
need way to determin which item was selected
items counter | DONE
items randomizer
event listen for click
click handler
logic to update global counter
*/


// ------------------------ Header ------------------------ //
var nav = document.querySelector('.main-nav');
var position = 0;

window.addEventListener('scroll', function(){
  if(window.pageYOffset > 100) {
    nav.classList += ' small';
  } else {
    nav.classList = 'main-nav';
  }
});


// ------------------------ Global Variables ------------------------ //

const items1ImgElem = document.getElementById('items_1_img');
const items1PElem = document.getElementById('items_1_p');
const items2ImgElem = document.getElementById('items_2_img');
const items2PElem = document.getElementById('items_2_p');
const items3ImgElem = document.getElementById('items_3_img');
const items3PElem = document.getElementById('items_3_p');

const bSectionElem = document.getElementById('B');
const cSectionElem = document.getElementById('C');
const dSectionElem = document.getElementById('D');

let items1 = null;
let items2 = null;
let items3 = null;
  // counter
let rounds = 5;

// ------------------------- Constructor Function ------------------------ //
  // I think this makes objects named items
function Items(name, image, timesShown, votes) {
  this.name = name;
  this.image = image;
  if (timesShown === null) {
    this.timesShown = 0;
    this.votes = 0;
  } else {
    this.timesShown = timesShown;
    this.votes = votes;
  }
}

Items.allItems = [];

// ------------------------- Prototype things ------------------------ //
  // I'm pretty sure the items objects are stored in this array
Items.allItems = [];
  // A prototype that renders my items
Items.prototype.renderSingleItems = function(img,p) {
  img.src = this.image;
  p.textContent = this.name;
  this.timesShown++;
}

// ------------------------- Global Functions ------------------------ //
// retrieves from storage
function getResultsFromStorage() {
  const stringifiedResults = localStorage.getItem('Items');
  if(stringifiedResults){
    const parsedItems = JSON.parse(stringifiedResults);
    console.log(parsedItems);

    for(let items of parsedItems){
      const myItems = new Items(items.name, items.image, items.votes, items.timesShown);
      Items.allItems.push(myItems);
    }
  }
}

// stores results
function storeResults() {
  const stringifiedResults = JSON.stringify(Items.allItems);
  localStorage.setItem('Items', stringifiedResults);
}


function randomItems() {
  const unavailableItems = [items1, items2, items3];

  while (unavailableItems.includes(items1)) {
    // get a new items1
    let items1Index = Math.floor(Math.random() * Items.allItems.length);
    items1 = Items.allItems[items1Index];
  }

  // put the new items1 into unavailable items
  unavailableItems.push(items1);
 

  // items2 = Items.allItems[items1Index];
  while (unavailableItems.includes(items2)) {
    // get a new items2
    let items2Index = Math.floor(Math.random() * Items.allItems.length);
    items2 = Items.allItems[items2Index];
  }

  // put the new items2 into unavailable items
  unavailableItems.push(items2);

  while (unavailableItems.includes(items3)) {
    // get a new items3
    let items3Index = Math.floor(Math.random() * Items.allItems.length);
    items3 = Items.allItems[items3Index];
  }

  // render the itemss
  renderItems(items1, items2, items3);
}

/*
function randomItems () {

  const unavailableItems = [items1, items2, items3];

  let items1Index = Math.floor(Math.random() * Items.allItems.length);

  items1 = Items.allItems[items1Index];

  let items2Index;
  while (items2Index === undefined || items2Index === items1Index) {
    items2Index = Math.floor(Math.random() * Items.allItems.length);
  }
  items2 = Items.allItems[items2Index];

  let items3Index;
  while (items3Index === undefined || items3Index === items1Index || items3Index === items2Index) {
    items3Index = Math.floor(Math.random() * Items.allItems.length);
  }
  items3 = Items.allItems[items3Index];
  
  renderItems(items1, items2, items3);
}
*/

function renderItems(items1, items2, items3) {
  items1.renderSingleItems(items1ImgElem, items1PElem);
  items2.renderSingleItems(items2ImgElem, items2PElem);
  items3.renderSingleItems(items3ImgElem, items3PElem);
}

function clickHandler(event) {
  console.log(event.target);

  if (event.target === items1ImgElem || event.target === items2ImgElem || event.target === items3ImgElem) {
    rounds--;

    if (event.target === items1ImgElem) {
      items1.votes++;
    } else if (event.target === items2ImgElem) {
      items2.votes++;
    } else {
      items3.votes++;
    }
    if (rounds === 0) {
      bSectionElem.removeEventListener('click', clickHandler);
      cSectionElem.removeEventListener('click', clickHandler);
      dSectionElem.removeEventListener('click', clickHandler);

      renderResults();
      renderChart();
      storeResults();
    }

    randomItems();
  }
}

function renderChart() {

  const itemsData = [];
  const itemsLabels = [];

  for (let items of Items.allItems) {
    itemsData.push(items.votes);
    itemsLabels.push(items.name);
  }

  var ctx = document.getElementById('itemsChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: itemsLabels,
          datasets: [{
              label: 'Item Votes',
              data: itemsData,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}





function renderResults() {
  const ulElem = document.getElementById('items-clicks');
  ulElem.innerHTML = '';
  for (let items of Items.allItems) {
    const liElem = document.createElement('li');
    liElem.textContent = `${items.name}: ${items.votes} votes out of ${items.timesShown} shown`;
    ulElem.appendChild(liElem);
     
  }
}


// ------------------------- Listeners ------------------------ //

bSectionElem.addEventListener('click', clickHandler);
cSectionElem.addEventListener('click', clickHandler);
dSectionElem.addEventListener('click', clickHandler);

// ------------------------- Call Functions -------------------------- //
  // This is how you make the items objects I think
  if(localStorage.getItem('Items')){
    getResultsFromStorage();
  }
  else{

  Items.allItems.push(new Items('Bag', './img/bag.jpeg'));
  Items.allItems.push(new Items('Banana', './img/banana.jpeg'));
  Items.allItems.push(new Items('Bathroom', './img/bathroom.jpeg'));
  Items.allItems.push(new Items('Boots', './img/boots.jpeg'));
  Items.allItems.push(new Items('Breakfast', './img/breakfast.jpeg'));
  Items.allItems.push(new Items('Bubblegum', './img/bubblegum.jpeg'));
  Items.allItems.push(new Items('Chair', './img/chair.jpeg'));
  Items.allItems.push(new Items('Cthulhu', './img/cthulhu.jpeg'));
  Items.allItems.push(new Items('Dog Duck', './img/dog-duck.jpeg'));
  Items.allItems.push(new Items('Dragon', './img/dragon.jpeg'));
  Items.allItems.push(new Items('Pen', './img/pen.jpeg'));
  Items.allItems.push(new Items('Pet Sweep', './img/pet-sweep.jpeg'));
  Items.allItems.push(new Items('Scissors', './img/scissors.jpeg'));
  Items.allItems.push(new Items('Shark', './img/shark.jpeg'));
  Items.allItems.push(new Items('Sweep', './img/sweep.png'));
  Items.allItems.push(new Items('Tauntaun', './img/tauntaun.jpeg'));
  Items.allItems.push(new Items('Unicorn', './img/unicorn.jpeg'));
  Items.allItems.push(new Items('Water Can', './img/water-can.jpeg'));
  Items.allItems.push(new Items('Wine Glass', './img/wine-glass.jpeg'));
  }

randomItems();

