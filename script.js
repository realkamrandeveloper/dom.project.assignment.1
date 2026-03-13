// Assignment 1

const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
    "Elon Musk",
    "Larry Page",
    "Sergey Brin",
    "Jeff Bezos",
    "Mark Zuckerberg",
    "Larry Ellison",
    "Bernard Arnault",
    "Jim Walton",
    "Warren Buffett",
    "Rob Walton"
];

const listItems = [];
let dragStartIndex;

createList();

function createList() {
    [...richestPeople]
        .map((a) => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("over");
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `<span class="number">${index + 1}</span>
        <div class="dragabble" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fa-solid fa-grip-lines"></i>
        </div>
        `;
            listItems.push(listItem);
            draggable_list.appendChild(listItem);
        });
    addEventListener();
}

function dragStart() {
    dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
    this.classList.add("over");
}

function dragOver(e) {
    e.preventDefault();
}

function dragLeave() {
    this.classList.remove("over");
}

function dragDrop() {
    const dropEndIndex = this.getAttribute("data-index");
    swapItems(dragStartIndex, dropEndIndex);
    this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
    // یوزر کی ضرورت کے مطابق نام اور نمبر دونوں کو ایک ساتھ تبدیل کیا گیا ہے
    const liOne = listItems[fromIndex];
    const liTwo = listItems[toIndex];
    
    const itemOneNum = liOne.querySelector(".number");
    const itemOneDrag = liOne.querySelector(".dragabble");
    
    const itemTwoNum = liTwo.querySelector(".number");
    const itemTwoDrag = liTwo.querySelector(".dragabble");

    liOne.appendChild(itemTwoNum);
    liOne.appendChild(itemTwoDrag);
    
    liTwo.appendChild(itemOneNum);
    liTwo.appendChild(itemOneDrag);
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector(".dragabble").innerText.trim();

        if (personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        }
        else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

function addEventListener() {
    const dragabbles = document.querySelectorAll(".dragabble");
    const dragListItems = document.querySelectorAll(".draggable-list li");

    dragabbles.forEach(dragabble => {
        dragabble.addEventListener("dragstart", dragStart);
    });

    dragListItems.forEach((item) => {
        item.addEventListener("dragover", dragOver);
        item.addEventListener("drop", dragDrop);
        item.addEventListener("dragenter", dragEnter);
        item.addEventListener("dragleave", dragLeave);
    });
}

check.addEventListener("click", checkOrder);