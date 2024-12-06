// Seleciona as imagens e ícones do carrossel
const images = document.querySelectorAll('.carrossel img');
const icons = document.querySelectorAll('.carrossel-icones .icone');

let currentIndex = 0; // Para manter o controle do índice da imagem ativa
let autoSlideInterval; // Variável para o intervalo de troca automática

// Função para ativar a imagem e o ícone corretos
function activateSlide(index) {
    // Remove as classes ativas
    images.forEach(img => img.classList.remove('ativo'));
    icons.forEach(icn => icn.classList.remove('ativo'));

    // Ativa a imagem e o ícone corretos
    images[index].classList.add('ativo');
    icons[index].classList.add('ativo');
}

// Adiciona eventos nos ícones
icons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        // Interrompe o slide automático quando o ícone for clicado
        clearInterval(autoSlideInterval);

        // Ativa o slide clicado
        activateSlide(index);

        // Reinicia o carrossel automático após a seleção
        startAutoSlide();
    });
});

// Função para iniciar o carrossel automático
function startAutoSlide() {
    // Intervalo de troca de imagem a cada 3 segundos (3000ms)
    autoSlideInterval = setInterval(() => {
        // Atualiza o índice para a próxima imagem
        currentIndex = (currentIndex + 1) % images.length;

        // Ativa o próximo slide
        activateSlide(currentIndex);
    }, 1700); 
}

// Inicia o carrossel automático assim que a página é carregada
startAutoSlide();
