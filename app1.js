const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

function setCurrentColor(newColor) {
  currentColor = newColor
}

function setCurrentMode(newMode) {
  activateButton(newMode)
  currentMode = newMode
}

function setCurrentSize(newSize) {
  currentSize = newSize
}

const colorPicker = document.getElementById('colorPicker')
const colorBtn = document.getElementById('colorBtn')
const RGB = document.getElementById('RGB')
const reset = document.getElementById('reset')
const sliderandValue = document.getElementById('sliderandValue')
const slider = document.getElementById('slider')
const container = document.getElementById('container')

colorPicker.onchange = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
RGB.onclick = () => setCurrentMode('rainbow')
reset.onclick = () => reloadGrid()
slider.onmousemove = (e) => updateSizeValue(e.target.value)
slider.onchange = (e) => changeSize(e.target.value)

function changeSize(value) {
  setCurrentSize(value)
  updateSizeValue(value)
  reloadGrid()
}

function updateSizeValue(value) {
    
    sliderandValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
  clearGrid()
  setupGrid(currentSize)
}

function clearGrid() {
  container.innerHTML = ''
}

function setupGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div')
    gridElement.addEventListener('mouseover', changeColor)
    container.appendChild(gridElement)
  }
}

function changeColor(e) {
  if (currentMode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `RGB(${randomR}, ${randomG}, ${randomB})`
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'reset') {
    e.target.style.backgroundColor = '#fefefe'
  }
}

function activateButton(newMode) {
  if (currentMode === 'RGB') {
    RGB.classList.remove('active')
  } else if (currentMode === 'color') {
    colorBtn.classList.remove('active')
  }

  if (newMode === 'RGB') {
    RGB.classList.add('active')
  } else if (newMode === 'color') {
    colorBtn.classList.add('active')
  } 
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE)
  activateButton(DEFAULT_MODE)
}