let botoes = document.querySelector("button#Textchange")
botoes.addEventListener("click", oCampoEstaVazio)
function oCampoEstaVazio(){
   let mensagemdeerro2 = document.querySelector("#MensagemDeErro2")
   let mensagemdeerro3 = document.querySelector("#MensagemDeErro3")

    let email = document.querySelector("input#Email").value
    let senha = document.querySelector("input#Senha").value
    if(email.length<=0){
        mensagemdeerro2.innerText = 'Insira um email válido'
    }  else{
        mensagemdeerro2.innerText = ''
    } 
    if(senha.length<=0){
        mensagemdeerro3.innerText = 'Insira uma senha'
     } else{
        mensagemdeerro3.innerText = ''
     }
}

function logar() {
    let email = document.querySelector("input#Email").value
    let senha = document.querySelector("input#Senha").value

    if(email === "example@gmail.com" && senha === "123456"){
        window.location = "./areaUsuario.html"
    }
}
    
    
