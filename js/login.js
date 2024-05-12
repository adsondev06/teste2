// Função para verificar se o usuário está logado
function checkLogin() {
    const savedUsername = localStorage.getItem('username');
    const savedExpirationDate = localStorage.getItem('expirationDate');
    if (savedUsername && savedExpirationDate) {
        const currentTime = new Date().getTime();
        if (currentTime < savedExpirationDate) {
            // Se o usuário estiver logado e o tempo de expiração não tiver sido alcançado, redirecionar para a shopping.html
            window.location.href = 'shopping.html';
        } else {
            // Se o tempo de expiração tiver sido alcançado, remover os dados de login
            localStorage.removeItem('username');
            localStorage.removeItem('expirationDate');
        }
    }
}

// Verificar sempre que a página é carregada
checkLogin();

// Evento de envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('username').value;

    // Salvar o nome do usuário no localStorage
    localStorage.setItem('username', usernameInput);

    // Definir o tempo de expiração para 6 horas (em milissegundos)
    const expirationTime = 6 * 60 * 60 * 1000; // 6 horas
    const expirationDate = new Date().getTime() + expirationTime;

    // Salvar o tempo de expiração no localStorage
    localStorage.setItem('expirationDate', expirationDate);

    // Redirecionar para a shopping.html
    window.location.href = 'shopping.html';
});
