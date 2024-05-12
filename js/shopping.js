document.addEventListener("DOMContentLoaded", function() {
    // Verifica se existe um nome de usuário armazenado no LocalStorage
    const username = localStorage.getItem('username');
    
    // Se existir, preenche o campo de seunome com os dados do LocalStorage
    if (username) {
        document.getElementById('seunome').value = username;
    }
});
