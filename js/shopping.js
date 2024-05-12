document.addEventListener("DOMContentLoaded", function() {
    // Verifica se existe um nome de usuário armazenado no LocalStorage
    const username = localStorage.getItem('username');
    
    // Se existir, preenche o campo de seunome com os dados do LocalStorage
    if (username) {
        document.getElementById('seunome').value = username;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    $('.select2').select2();
});

document.getElementById('shoppingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Captura o valor selecionado no select
    const selectedOption = document.getElementById('shoppingSelect').value;
    
    // Redireciona para a próxima página com o parâmetro na URL
    window.location.href = `codigos.html?shopping=${selectedOption}`;
});


