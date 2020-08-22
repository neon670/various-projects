const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const itemLists = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays =  [];

// Drag Functionality
let dragItem;
let currentColumn;
let dragging = false;


// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}


// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  arrayNames.forEach((arrayName, i) => {
    localStorage.setItem(`${arrayName}Items`,JSON.stringify(listArrays[i]));
  });


}

// filter arrays
function filterArray(array){
  console.log(array);
  const filteredArray = array.filter(item => item !== null);
  console.log(filteredArray);
  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {

  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.contentEditable ='true';
  listEl.setAttribute('ondragstart', 'drag(event)');
  listEl.id = index;
  listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);

  columnEl.appendChild(listEl);

}

// Update Columns in DOM
function updateDOM() {
  // Check localStorage
  if(!updatedOnLoad){
    getSavedColumns();
  }
  // Backlog Column
  backlogList.textContent = '';
  backlogListArray.forEach((backlogItem, i) => {
    createItemEl(backlogList, 0, backlogItem, i);
  });
  backlogListArray = filterArray(backlogListArray);
  // Progress Column
  progressList.textContent = '';
  progressListArray.forEach((progressItem, i) => {
    createItemEl(progressList, 1, progressItem, i);
  });
  backlogListArray = filterArray(backlogListArray);
  // Complete Column
  completeList.textContent = '';
  completeListArray.forEach((completeItem, i) => {
    createItemEl(completeList, 2, completeItem, i);
  });
  backlogListArray = filterArray(backlogListArray);
  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray.forEach((onHoldItem, i) => {
    createItemEl(onHoldList, 3, onHoldItem, i);
  });
  backlogListArray = filterArray(backlogListArray);

  updatedOnLoad = true;
  updateSavedColumns();
}

// update Item or Delete
function updateItem(id, column){
  const selectedArray = listArrays[column];
  console.log(selectedArray);
  const selectedColumnEl = itemLists[column].children;
  console.log(selectedColumnEl[id].textContent);
  if(!dragging){
    if(!selectedColumnEl[id].textContent){
      delete selectedArray[id];
    }else{
      selectedArray[id] = selectedColumnEl[id].textContent;
    }
    updateDOM();
  }
}

function addToColumn(column){
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent = '';
  updateDOM();

}


function showInputBox(column){
  addBtns[column].style.visibilty = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}

function hideInputBox(column){
  addBtns[column].style.visibilty = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
}

function rebuildArrays(){

  backlogListArray = Array.from(backlogList.children).map(i => i.textContent)

  progressListArray = Array.from(progressList.children).map(i => i.textContent)

  completeListArray = Array.from(completeList.children).map(i => i.textContent)

  onHoldListArray = Array.from(onHoldList.children).map(i => i.textContent)

}

// on drag
function drag(e){
  draggedItem = e.target;
  dragging = true;
  console.log('drage',draggedItem);
}

function dragEnter(column){
  itemLists[column].classList.add('over');
  currentColumn = column;
}

// allowing item to drop
function allowDrop(e){
  e.preventDefault();

}

// dropping item in column
function drop(e){
  e.preventDefault();
  itemLists.forEach((column) => {
    column.classList.remove('over');
  });
  const parent = itemLists[currentColumn];
  parent.appendChild(draggedItem);
  dragging = false;
  rebuildArrays();
}



// on load
updateDOM();
