//Definição de Variáveis de controle de interface

let yourVoteTo = document.querySelector('.upLeft-1 span')
let position = document.querySelector('.upLeft-2 span')
let description = document.querySelector('.upLeft-4')
let notices = document.querySelector('.down')
let rightSide = document.querySelector('.upRight')
let numbers = document.querySelector('.upLeft-3')

//variaveis de controle de ambiente 

let currentStep = 0
let number = ''

const stepStart = () => {
  let step = etapas[currentStep]

  let htmlNumber = ''
  for(let i=0; i < step.numbers; i++) {
   if(i === 0){
    htmlNumber += '<div class="numbers pisca"></div>'
   } else{
      htmlNumber += '<div class="numbers"></div>'
   }
  }

  yourVoteTo.style.display = 'none'
  position.innerHTML = step.title
  description.innerHTML = ''
  notices.style.display = 'none'
  rightSide.innerHTML = ''
  numbers.innerHTML = htmlNumber
}

const interfaceUpdate = () => {
  let step = etapas[currentStep]
  let candidate = step.candidates.filter((item) => {
    if(item.number === number) {
      return true
    } else {
      return false
    }
  })
  if(candidate.length > 0) {
    candidate = candidate[0]
    yourVoteTo.style.display = 'block'
    notices.style.display = 'block'
    description.innerHTML = `Nome: ${candidate.name}<br />Clã: ${candidate.cla}`

    let htmlPhotos = ''
    for(let i in candidate.photos) {
      htmlPhotos += `<div class="upRightImage"><img src="./assets/img/${candidate.photos[i].url}" alt="" />${candidate.photos[i].subtitle}</div>`
    }
    rightSide.innerHTML = htmlPhotos
  } else {
    yourVoteTo.style.display = 'block'
    notices.style.display = 'block'
    description.innerHTML = '<div class="bigNotice pisca">VOTO NULO</div>'
  }
  console.log('Candidato', candidate)
}

//funções dos botões 

const clicou = (n) => {
  let numb = document.querySelector('.numbers.pisca')
  if(numb !== null) {
    numb.innerHTML = n
    number = `${number}${n}`

    numb.classList.remove('pisca')
    if(numb.nextElementSibling !== null) {
      numb.nextElementSibling.classList.add('pisca')
    } else {
      interfaceUpdate();
    }
  }
}
const white = () => {
  alert('clicou em '+'white')
}
const fix = () => {
  alert('clicou em '+'fix')
}
const confirm = () => {
  alert('clicou em '+'confirm')
}
stepStart()