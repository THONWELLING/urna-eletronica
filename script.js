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
let voteBlank = false
let votes = []

const stepStart = () => {
  let step = etapas[currentStep]

  let htmlNumber = ''
  number = ''
  voteBlank = false

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
      if(candidate.photos[i].small) {
        htmlPhotos += `<div class="upRightImage small"><img src="./assets/img/${candidate.photos[i].url}" alt="" />${candidate.photos[i].subtitle}</div>`
      } else {
        htmlPhotos += `<div class="upRightImage"><img src="./assets/img/${candidate.photos[i].url}" alt="" />${candidate.photos[i].subtitle}</div>`

      }
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
  if(number === '') {
    voteBlank = true

    yourVoteTo.style.display = 'block'
    notices.style.display = 'block'
    numbers.innerHTML = ''
    description.innerHTML = '<div class="bigNotice pisca">Voto Em Branco</div>'
    rightSide.innerHTML = ''
  } else {
    alert('Para Votar Em Branco Tecle Corrige Depois Tecle Branco e Depois Confirma ')
  }
}
const fix = () => {
  stepStart()
}
const confirm = () => {
  let step = etapas[currentStep]
  let confirmedVote = false

  if(voteBlank === true) {
    confirmedVote = true
    votes.push({
      step: etapas[currentStep].title,
      vote: 'Branco'
    })
  } else if(number.length === step.numbers) {
    confirmedVote = true
    votes.push({
      step: etapas[currentStep].title,
      vote: number
    })
  }

  if(confirmedVote) {
    currentStep ++
    if(etapas[currentStep] !== undefined) {
      stepStart()
    } else {
      document.querySelector('.screen').innerHTML ='<div class="gigantNotice pisca">FIM DA VOTAÇÃO</div>'
      console.log(votes)
    }
  }
}
stepStart()