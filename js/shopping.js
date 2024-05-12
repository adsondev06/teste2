
document.addEventListener("DOMContentLoaded", function() {
    // Verifica se existe um nome de usuário armazenado no LocalStorage
    const username = localStorage.getItem('username');
    
    // Se existir, preenche o campo de seunome com os dados do LocalStorage
    if (username) {
        document.getElementById('seunome').value = username;
    }
    
    // Inicializa o select2
    $('.select2').select2();
    
    // Adiciona o evento de submit ao formulário
    document.getElementById('shoppingForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Captura o valor selecionado no select
        const selectedOption = document.getElementById('shoppingSelect');
        
        // Verifica se o elemento foi encontrado antes de acessar sua propriedade value
        if (selectedOption) {
            const selectedValue = selectedOption.value;
            
            // Redireciona para a próxima página com o parâmetro na URL
            window.location.href = `codigos.html?shopping=${selectedValue}`;
        } else {
            console.error("Elemento shoppingSelect não encontrado.");
        }
    });
});

