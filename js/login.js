const usernameInput = document.getElementById('username').value;
const savedUsername = localStorage.getItem('username');

if (savedUsername === usernameInput) {
    // Se o nome de usuário inserido for o mesmo que o armazenado, redirecionar para o shopping.html
    window.location.href = 'shopping.html';
} else {
    // Salvar o nome do usuário no localStorage
    localStorage.setItem('username', usernameInput);

    // Definir o tempo de expiração para 6 horas (em milissegundos)
    const expirationTime = 6 * 60 * 60 * 1000; // 6 horas
    const expirationDate = new Date().getTime() + expirationTime;

    // Salvar o tempo de expiração no localStorage
    localStorage.setItem('expirationDate', expirationDate);

    // Redirecionar para o shopping.html
    window.location.href = 'shopping.html';
}
