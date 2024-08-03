const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const btn = document.querySelector(".btn");
const formBtn = itemForm.querySelector("button");

let isEditModeOn = false;
let itemAlreadyExistsCheck = true;

function checkUI() {
  itemInput.value = "";
  const items = itemList.querySelectorAll("li");
  if (items === 0) {
    clearBtn.style.display = none;
    itemFilter.style.display = none;
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";
}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    item.remove();
    //Todo remove from local storage
    checkUI();
  }
}

function setItemToEdit(item) {
  isEditModeOn = true;
  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
}

function onClickItem(e) {
  console.log(e.target);
  if (e.target.parentElement.classList.contains("remove-item")) {
    console.log("removing item");
    removeItem(e.target.parentElement.parentElement);
  } else {
    // Set the item to edit flag on

    setItemToEdit(e.target);
  }
}

function checkIfItemExists(itemString) {
  const allItems = itemList.querySelectorAll("li");
  const allItemsArray = Array.from(allItems);
  let ans = false;
  allItemsArray.forEach((li) => {
    if (
      li.firstChild.textContent === itemString
    ) {
      ans = true;
    } else {
      ans =  false;
    }
  });
  return ans;
}

function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon);
    return button;

}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
  }

function addItemtoDOM(itemString) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(itemString));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);

}

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("This is empty");
    return;
  }
  if (isEditModeOn === true) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditModeOn = false;
  } else {
    if (itemAlreadyExistsCheck && checkIfItemExists(newItem)) {
      alert("That item already exists");
      return;
    }
  }
  addItemtoDOM(newItem);
  checkUI();
  //input
}

function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);  
    }
    document.getElementById("filter").value = "";
    itemFilter.style.display = 'none';
    clearBtn.style.display = 'none';
}

function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const searchTerm = e.target.value.toLowerCase();
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(searchTerm) != -1){
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';    
        }
    })
}

function init() {
  itemList.addEventListener("click", onClickItem);
  itemForm.addEventListener("submit", onAddItemSubmit);
  //document.addEventListener('DOMContentLoaded', displayItems);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
}

init();
