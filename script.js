const arrayContainer = document.getElementById("array-container");
const algorithmSelector = document.getElementById("algorithm");
const generateButton = document.getElementById("generate");
const sortButton = document.getElementById("sort");
const speedInput = document.getElementById("speed");

let array = [];
let speed = 100;

generateButton.addEventListener("click", generateArray);
sortButton.addEventListener("click", startSorting);
speedInput.addEventListener("input", (e) => (speed = 510 - e.target.value));

function generateArray() {
    arrayContainer.innerHTML = "";
    array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 300) + 10);
    array.forEach((value) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;
        bar.style.width = "20px";
        arrayContainer.appendChild(bar);
    });
}

async function startSorting() {
    const algorithm = algorithmSelector.value;
    if (algorithm === "bubble") await bubbleSort();
    else if (algorithm === "selection") await selectionSort();
    else if (algorithm === "insertion") await insertionSort();
    else if (algorithm === "quick") await quickSort(0, array.length - 1);
}

async function bubbleSort() {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add("active");
            bars[j + 1].classList.add("active");
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }
            await delay();
            bars[j].classList.remove("active");
            bars[j + 1].classList.remove("active");
        }
        bars[array.length - i - 1].classList.add("completed");
    }
}

async function selectionSort() {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            bars[j].classList.add("active");
            if (array[j] < array[minIdx]) minIdx = j;
            await delay();
            bars[j].classList.remove("active");
        }
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        bars[i].style.height = `${array[i]}px`;
        bars[minIdx].style.height = `${array[minIdx]}px`;
        bars[i].classList.add("completed");
    }
}

async function insertionSort() {
    const bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].classList.add("active");
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j]}px`;
            j--;
            await delay();
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;
        bars[i].classList.remove("active");
    }
}

async function quickSort(start, end) {
    if (start >= end) return;
    const bars = document.getElementsByClassName("bar");
    let pivotIndex = await partition(start, end, bars);
    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);
}

async function partition(start, end, bars) {
    let pivot = array[end];
    bars[end].classList.add("active");
    let i = start - 1;
    for (let j = start; j < end; j++) {
        bars[j].classList.add("active");
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = `${array[i]}px`;
            bars[j].style.height = `${array[j]}px`;
        }
        await delay();
        bars[j].classList.remove("active");
    }
    [array[i + 1], array[end]] = [array[end], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1]}px`;
    bars[end].classList.remove("active");
    return i + 1;
}

function delay() {
    return new Promise((resolve) => setTimeout(resolve, speed));
}
