
// Captura os elementos do HTML
const barcodeResults = document.getElementById('barcode-results');
const codeCount = document.getElementById('count');
const successSound = document.getElementById('successSound');
const errorSound = document.getElementById('errorSound');
const codeInput = document.getElementById('codeInput');
let detectedBarcodes = [];
let codeCounter = 0;
let errorDisplayed = false;

// Inicia a leitura do código de barras
async function startBarcodeReader() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        const video = document.getElementById('video');
        video.srcObject = stream;
        await video.play();
        setInterval(readBarcode, 1500); // Escaneia a cada 3 segundos
    } catch (error) {
        console.error('Erro ao iniciar a leitura do código de barras:', error);
        displayMessage('Erro ao iniciar a leitura do código de barras.', 'error');
    }
}

// Função para ler o código de barras
async function readBarcode() {
    try {
        const barcodeDetector = new BarcodeDetector();
        const barcodes = await barcodeDetector.detect(video);

        if (barcodes.length > 0) {
            barcodes.forEach(barcode => {
                if (barcode.rawValue.length === 10) {
                    if (detectedBarcodes.includes(barcode.rawValue)) {
                        if (!errorDisplayed) {
                            displayMessage('Código de barras já lido.', 'error');
                            playErrorSound();
                            errorDisplayed = true;
                        }
                    } else {
                        if (errorDisplayed) {
                            clearError();
                        }
                        detectedBarcodes.push(barcode.rawValue);
                        const resultDiv = document.createElement('div');
                        const lastFourDigits = barcode.rawValue.slice(-4);
                        const formattedBarcode = barcode.rawValue.replace(lastFourDigits, `<span class="bold">${lastFourDigits}</span>`);
                        resultDiv.innerHTML = "Lido com sucesso: " + formattedBarcode;
                        resultDiv.classList.add('success');
                        barcodeResults.appendChild(resultDiv);
                        codeCount.textContent = detectedBarcodes.length;
                        playSuccessSound();
                        codeCounter++;
                        if (codeCounter === 3) {
                            barcodeResults.style.overflowY = 'scroll';
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error('Erro ao detectar código de barras:', error);
        displayMessage('Erro ao detectar código de barras.', 'error');
    }
}

// Função para enviar os códigos lidos
function sendCodes() {
    const textarea = document.getElementById('codigos');
    textarea.value = detectedBarcodes.join('\n'); // Adiciona os códigos lidos ao textarea do formulário
}

// Função para reproduzir o som de sucesso
function playSuccessSound() {
    successSound.play();
}

// Função para reproduzir o som de erro
function playErrorSound() {
    errorSound.play();
}

// Função para exibir uma mensagem na seção de resultados
function displayMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.classList.add(type);
    barcodeResults.appendChild(messageDiv);
    barcodeResults.scrollTop = barcodeResults.scrollHeight;
}

// Função para limpar a mensagem de erro
function clearError() {
    const errorDiv = document.querySelector('.error');
    if (errorDiv) {
        errorDiv.remove();
        errorDisplayed = false;
    }
}

function toggleForm() {
    var overlay = document.getElementById("form-overlay");
    overlay.style.display = overlay.style.display === "none" ? "block" : "none";
}


// Função para buscar o valor do localStorage e definir no input "seunome"
document.addEventListener('DOMContentLoaded', function() {
    var nomeInput = document.getElementById('seunome');
    var nomePadrao = localStorage.getItem('username');
    if (nomePadrao) {
        nomeInput.value = nomePadrao;
    }
});

// Função para recarregar a página
function reloadPage() {
    window.location.reload();
}

// Event listener para adicionar códigos digitados manualmente
codeInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const inputValue = this.value.trim();
        if (inputValue.length > 0 && !detectedBarcodes.includes(inputValue)) {
            detectedBarcodes.push(inputValue);
            const resultDiv = document.createElement('div');
            resultDiv.textContent = "Digitado manualmente: " + inputValue;
            resultDiv.classList.add('success');
            barcodeResults.appendChild(resultDiv);
            codeCount.textContent = detectedBarcodes.length;
            playSuccessSound();
            codeCounter++;
            if (codeCounter === 2) {
                barcodeResults.style.overflowY = 'scroll';
            }
        } else {
            displayMessage('Valor inválido ou já inserido.', 'error');
            playErrorSound();
        }
        this.value = '';
    }
});

//daqui pra baix
document.addEventListener("DOMContentLoaded", function() {
    // Verifica se existe um nome de usuário armazenado no LocalStorage
    const username = localStorage.getItem('username');
    
    // Se existir, preenche o campo de username com os dados do LocalStorage
    if (username) {
        document.getElementById('username').value = username;
    }
    
    // Inicializa o select2
    $('.select2').select2();
    
    // Adiciona o evento de submit ao formulário
    document.getElementById('shoppingForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Captura o valor selecionado no select
        const selectedOption = document.getElementById('shoppingSelect').value;
        
        // Verifica se o elemento foi encontrado antes de acessar sua propriedade value
        if (selectedOption) {
            const codigos = document.getElementById('codeInput').value;
            const username = document.getElementById('username').value;
            
            // Envia os dados para o servidor
            enviarDados(username, selectedOption, codigos);
        } else {
            console.error("Elemento shoppingSelect não encontrado.");
        }
    });
});

// Função para enviar os dados para o servidor
function enviarDados(username, selectedOption, codigos) {
    // Cria um objeto FormData
    const formData = new FormData();
    formData.append('username', username);
    formData.append('shoppingselect', selectedOption);
    formData.append('codigo', codigos);

    // Configura a requisição AJAX
    const request = new XMLHttpRequest();
    request.open('POST', 'URL_DO_SEU_SCRIPT_GOOGLE_APPS_SCRIPT', true);

    // Define a função de callback para lidar com a resposta do servidor
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Limpa o campo de entrada de códigos após o envio bem-sucedido
            document.getElementById('codeInput').value = '';
            // Exibe uma mensagem de sucesso para o usuário
            alert("Códigos enviados com sucesso!");
        } else {
            // Exibe uma mensagem de erro caso ocorra algum problema no servidor
            alert("Ocorreu um erro ao enviar os códigos. Por favor, tente novamente mais tarde.");
        }
    };

    // Envia a requisição AJAX com os dados do formulário
    request.send(formData);
}


// Inicia o leitor de código de barras ao carregar o documento HTML
document.addEventListener('DOMContentLoaded', function() {
    startBarcodeReader();
});