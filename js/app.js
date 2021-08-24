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
let rounds = 25;

// ------------------------- Constructor Function ------------------------ //
  // I think this makes objects named items
function Items(name, image) {
  this.name = name;
  this.image = image;
  this.timesShown = 0;
  this.votes = 0;
}

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

function randomItems () {
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
    } if (event.target === items2ImgElem) {
      items2.votes++;
    } else {
      items3.votes++;
    }
    if (rounds === 0) {
      bSectionElem.removeEventListener('click', clickHandler);
      cSectionElem.removeEventListener('click', clickHandler);
      dSectionElem.removeEventListener('click', clickHandler);

      renderResults();
    }

    randomItems();
  }
}

function renderResults() {
  const ulElem = document.getElementById('items-clicks');
  ulElem.innerHTML = '';
  for (let items of Items.allItems) {
    const liElem = document.createElement('li');
    liElem.textContent = `${items.name}: ${items.votes}`;
    ulElem.appendChild(liElem);
     
  }
}


// ------------------------- Listeners ------------------------ //

bSectionElem.addEventListener('click', clickHandler);
cSectionElem.addEventListener('click', clickHandler);
dSectionElem.addEventListener('click', clickHandler);

// ------------------------- Call Functions -------------------------- //
  // This is how you make the items objects I think
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

randomItems();