document.addEventListener("DOMContentLoaded", function() {
    // Verifica se existe um nome de usuário armazenado no LocalStorage
    const username = localStorage.getItem('username');
    
    // Se existir, preenche o campo de seunome com os dados do LocalStorage
    if (username) {
        document.getElementById('seunome').value = username;
    }
});

document.getElementById('shoppingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Captura o texto da opção selecionada no select
    const selectedOptionText = document.querySelector('.select2 option:checked').innerText;
    
    // Cria a URL com o texto da opção selecionada como parâmetro
    const nextPageURL = `codigos.html?shopping=${encodeURIComponent(selectedOptionText)}`;
    
    // Redireciona para a próxima página com o parâmetro
    window.location.href = nextPageURL;
});

