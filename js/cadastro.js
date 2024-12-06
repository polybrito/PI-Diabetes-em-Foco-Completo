// Seleciona os elementos do formulário
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('e-mail');
const celularInput = document.getElementById('celular');
const dataInput = document.getElementById('data');
const termosCheckbox = document.getElementById('Termos');
const cadastrarButton = document.getElementById('button2');

// Função para validar o campo de texto
const validarTexto = (input, campo) => {
    if (!input.value.trim()) {
        alert(`Por favor, preencha o campo ${campo}.`);
        return false;
    }
    return true;
};

// Função para validar o e-mail
const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value.trim())) {
        alert('Por favor, insira um e-mail válido.');
        return false;
    }
    return true;
};

// Função para validar o celular
const validarCelular = (celular) => {
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!regex.test(celular.value.trim())) {
        alert('Por favor, insira um número de celular válido no formato (XX) XXXXX-XXXX.');
        return false;
    }
    return true;
};

// Função para validar a seleção de opções
const validarOpcao = (name, mensagem) => {
    const opcoes = document.getElementsByName(name);
    for (let opcao of opcoes) {
        if (opcao.checked) {
            return true;
        }
    }
    alert(mensagem);
    return false;
};

// Função para validar o checkbox de termos
const validarTermos = () => {
    if (!termosCheckbox.checked) {
        alert('Você deve aceitar os termos de privacidade.');
        return false;
    }
    return true;
};

// Adiciona o evento de clique ao botão de cadastro
cadastrarButton.addEventListener('click', (event) => {
    event.preventDefault(); // Impede o envio do formulário antes da validação

    const nomeValido = validarTexto(nomeInput, 'Nome Completo');
    const emailValido = validarEmail(emailInput);
    const celularValido = validarCelular(celularInput);
    const dataValida = validarTexto(dataInput, 'Data de Nascimento');
    const generoValido = validarOpcao('genero', 'Por favor, selecione um gênero.');
    const diabetesValido = validarOpcao('Diabetes', 'Por favor, selecione um tipo de diabetes.');
    const motivosValido = validarOpcao('Motivospara', 'Por favor, selecione pelo menos um motivo.');

    if (nomeValido && emailValido && celularValido && dataValida && generoValido && diabetesValido && motivosValido) {
        alert('Cadastro realizado com sucesso!');
        // Aqui você pode adicionar lógica para enviar os dados para o servidor
        window.location = "./areaUsuario.html"
    }
});
