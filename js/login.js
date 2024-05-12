  // Função para verificar se o usuário está logado
  function checkLogin() {
    const username = localStorage.getItem('username');
    const expirationDate = localStorage.getItem('expirationDate');
    if (username && expirationDate) {
        const currentTime = new Date().getTime();
        if (currentTime < expirationDate) {
            // Se o usuário estiver logado e o tempo de expiração não tiver sido alcançado, redirecionar para o indexform.html
            window.location.href = 'codigos.html';
        } else {
            // Limpar os dados de login do localStorage se o tempo de expiração tiver sido alcançado
            localStorage.removeItem('username');
            localStorage.removeItem('expirationDate');
            // Redirecionar para a página de login
            window.location.href = 'index.html';
        }
    }
}

// Verificar sempre que a página é carregada
checkLogin();

// Evento de envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    
    // Salvar o nome do usuário no localStorage
    localStorage.setItem('username', username);

    // Definir o tempo de expiração para 8 horas (em milissegundos)
    const expirationTime = 6 * 60 * 60 * 1000; // 8 horas
    const expirationDate = new Date().getTime() + expirationTime;

    // Salvar o tempo de expiração no localStorage
    localStorage.setItem('expirationDate', expirationDate);

    // Redirecionar para o indexform.html
    window.location.href = 'codigos.html';
});