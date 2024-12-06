const resultAreaCho = document.querySelector('section#resultadoCho')
const formCho = document.querySelector('form#calcChoForm')
const inputChoIns = document.querySelector('input#choIns')
const buttonCho = document.querySelector('button#sendCho')
const voltarBntCho = document.querySelector('button#voltarBntCho')

const resultAreaCorrecao = document.querySelector('section#resultadoCorrecao')
const formCorrecao = document.querySelector('form#calcCorrecaoForm')
const buttonCorrecao = document.querySelector('button#sendCorrecao')
const voltarBntCorrecao = document.querySelector('button#voltarBntCorrecao')

//indica o index de qual dos dados será atualizado
//index 0: Boas, 1: Altas, 2: baixas
let indexUpdate


const pieChart = document.querySelector('canvas#chart')

//Impede que o formulário atualize a página e volte para o topo
formCho.addEventListener('submit', function(event){
    event.preventDefault()
})

//Impede que o formulário atualize a página e volte para o topo
formCorrecao.addEventListener('submit', function(event){
    event.preventDefault()
})

//formatando input de relação cho insulina
inputChoIns.addEventListener('input', function(){
    let currentValues = inputChoIns.value.replace(/^1:/, '')
    currentValues = currentValues.replace(/[^0-9]/g, '')
    inputChoIns.value = `1:${currentValues}`
})


buttonCho.addEventListener('click', function(){
    if(validForm(formCho)){
        calcCho()
    }
    
})

voltarBntCho.addEventListener('click', function(){
    calcLayout(formCho, resultAreaCho)
})


buttonCorrecao.addEventListener('click', function(){
    if(validForm(formCorrecao)){
        calcCorrecao(formCorrecao)
    }
    
})

voltarBntCorrecao.addEventListener('click', function(){
    calcLayout(formCorrecao, resultAreaCorrecao)
})




// Dados do gráfico
let dataChart = {
    labels: ['Boas', 'Altas', 'Baixas'],
    datasets: [{
        label: 'Glicemias',
        data: [0, 0, 0],
        backgroundColor: [
            '#8cf27e',
            '#ec8989',
            '#8b9fff'
        ],

        borderColor: [
            '#1eca07',
            '#f82c2c',
            '#453cff'
        ]
    }]
}

// criando e mostrando o gráfico
let grafico = new Chart(pieChart, {
    type: 'doughnut',
    data: dataChart,

    options: {
        plugins: {
            title: {
                text: 'Glicemias',
                display: true,

                font: {
                    size: 40
                }
            },

            legend: {
                position: 'left',
                labels: {
                    boxWidth: 40,
                    boxHeight: 40,

                    font: {
                        size: 20
                    }

                },

                
            }
        }
        
    }
    
    }
)


//função de validação de formulário
function validForm(form){
    const inputsForm = form.querySelectorAll('input')
    for(let element of inputsForm){
        if(element.value.length === 0){
            alert('Preencha todos os campos')
            return false
        }   
    }

    return true
}

//função pra voltar pro layout da calculadora
function calcLayout(form, sectionResult){
    const inputsForm = document.querySelectorAll('input')
    for(let element of inputsForm){
        element.value = ''
    }
    sectionResult.style.display = 'none'
    form.style.display = 'flex'
}

//função para calcular insulina da refeição
function calcCho(){
    const pragrafCho = document.querySelector('p#paragrafoCho')
    const inputsCalcCho = formCho.querySelectorAll('input')
    let insulinaDose
    let choIns = Number(inputsCalcCho[0].value.slice(2))
    let glicMeta = Number(inputsCalcCho[1].value)
    let sensIns = Number(inputsCalcCho[2].value)
    let glicRefeicao = Number(inputsCalcCho[3].value)
    let choRefeicao = Number(inputsCalcCho[4].value)
    
    if(glicRefeicao >= 180){
        indexUpdate = 1
    } else if(glicRefeicao < 70){
        indexUpdate = 2
    } else {
        indexUpdate = 0
    }

    dataChart.datasets[0].data[indexUpdate]++
    grafico.update()

    //calculando
    insulinaDose = (((glicRefeicao - glicMeta)/sensIns) + (choRefeicao/choIns)).toFixed(1) > 0 ? (((glicRefeicao - glicMeta)/sensIns) + (choRefeicao/choIns)).toFixed(1) : 0
    
    formCho.style.display = 'none'
    pragrafCho.innerText = `Você deverá aplicar ${insulinaDose} Unidade(s) da sua insulina de ação rápida`
    resultAreaCho.style.display = 'flex'
}

//função para calcular relação carboidrato insulina
function calcCorrecao(){
    const pragrafCorrecao = document.querySelector('p#paragrafoCorrecao')
    const inputsCalcCorrecao = formCorrecao.querySelectorAll('input')
    let relacaoChoIns
    let glicPreRefeicao = Number(inputsCalcCorrecao[0].value)
    let glicPosRefeicao = Number(inputsCalcCorrecao[1].value)
    let choRefeicao = Number(inputsCalcCorrecao[2].value)
    let sensIns = Number(inputsCalcCorrecao[3].value)
    let insRefeicao = Number(inputsCalcCorrecao[4].value)
    /*recado pro futuro: se for tirar algum campo ou add vai ter que add ids a eles e referencia-los pelo mesmo.
    Como os estou referenciando pelos indicies ele depende intrincicamente da ordem*/

    relacaoChoIns = (choRefeicao/(insRefeicao + ((glicPosRefeicao - glicPreRefeicao)/sensIns))).toFixed(0) > 0 ? (choRefeicao/(insRefeicao + ((glicPosRefeicao - glicPreRefeicao)/sensIns))).toFixed(0) : 0

    formCorrecao.style.display = 'none'
    pragrafCorrecao.innerText = `Sua relação carboidrato insulina correta é\n 1:${relacaoChoIns}`
    resultAreaCorrecao.style.display = 'flex'
}

