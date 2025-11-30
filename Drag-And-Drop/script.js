let cardCounter = 1;
const lists = document.querySelectorAll(".list");

document.querySelector(".add-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const inputvalue = document.querySelector("#user-ip").value.trim();
  if (!inputvalue) return;

  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.setAttribute("draggable", "true");
  newCard.id = "card" + cardCounter++;
  newCard.textContent = inputvalue;

  document.querySelector("#list1").appendChild(newCard);

  //add drag listeners to the New card
  newCard.addEventListener("dragstart", dragStart);
  newCard.addEventListener("dragend", dragEnd);

  document.querySelector("#user-ip").value = "";
});

for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);
}

function dragStart(e) {
  // this allows the drop location to know which element is being moved when you release it
  e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
  console.log("Drag ended");
}

function dragOver(e) {
  // this line is important because by default, browser don't allow you to drop elements onto other elements
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);

  this.appendChild(card);
  this.classList.remove("over");
}
