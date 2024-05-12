// Captura os elementos do HTML
const barcodeResults = document.getElementById('barcode-results');
const codeCount = document.getElementById('count');
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
        setInterval(readBarcode, 1500); // Escaneia a cada 1.5 segundos
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
                    if (!detectedBarcodes.includes(barcode.rawValue)) {
                        detectedBarcodes.push(barcode.rawValue);
                        const resultDiv = document.createElement('div');
                        const lastFourDigits = barcode.rawValue.slice(-4);
                        const formattedBarcode = barcode.rawValue.replace(lastFourDigits, `<span class="bold">${lastFourDigits}</span>`);
                        resultDiv.innerHTML = "Lido com sucesso: " + formattedBarcode;
                        resultDiv.classList.add('success');
                        barcodeResults.appendChild(resultDiv);
                        codeCount.textContent = detectedBarcodes.length;
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
            codeCounter++;
            if (codeCounter === 2) {
                barcodeResults.style.overflowY = 'scroll';
            }
        } else {
            displayMessage('Valor inválido ou já inserido.', 'error');
        }
        this.value = '';
    }
});

// Inicia o leitor de código de barras ao carregar o documento HTML
document.addEventListener('DOMContentLoaded', function() {
    startBarcodeReader();
});


document.addEventListener('DOMContentLoaded', function() {
    // Obtém o valor do parâmetro 'shopping' da URL
    const urlParams = new URLSearchParams(window.location.search);
    const shoppingText = urlParams.get('shopping');
    
    // Preenche o input com o valor obtido
    document.getElementById('shoppingselect').value = shoppingText;
});
