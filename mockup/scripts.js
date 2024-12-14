// scripts.js
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        alert("Login realizado com sucesso!");
        window.location.href = "pagina_inicial.html"; // Redireciona para o treino ativo
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// Biometric Login Simulation
document.getElementById("biometric-login").addEventListener("click", function () {
    alert("Login com biometria não configurado.");
});

// Google Login Simulation
document.getElementById("google-login").addEventListener("click", function () {
    alert("Login com Google em desenvolvimento.");
});

// scripts.js

// Menu Toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
});

// scripts.js

// Menu Toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
});

// Marcar atividade como concluída
document.querySelectorAll(".mark-complete").forEach(button => {
    button.addEventListener("click", function () {
        this.textContent = "Concluído";
        this.disabled = true;
        alert("Atividade marcada como concluída!");
    });
});

// Finalizar treino
document.getElementById("finish-workout").addEventListener("click", function () {
    alert("Parabéns! Treino finalizado.");
    window.location.href = "historico_atividades.html"; // Redireciona para o histórico de atividades
});

// scripts.js

// Ações de contato e contratação
document.querySelectorAll(".contact-trainer").forEach(button => {
    button.addEventListener("click", function () {
        const trainerId = this.dataset.trainerId;
        alert(`Redirecionando para o contato com o treinador ${trainerId}`);
        window.location.href = "contato_personal.html";
    });
});

document.querySelectorAll(".hire-trainer").forEach(button => {
    button.addEventListener("click", function () {
        const trainerId = this.dataset.trainerId;
        alert(`Redirecionando para a contratação do treinador ${trainerId}`);
        window.location.href = "contratacao_personal.html";
    });
});

// scripts.js

// Menu Toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
});

// Formulário de envio de mensagem
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const trainerName = document.getElementById("trainer-name").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (trainerName && subject && message) {
        alert(`Mensagem enviada com sucesso para ${trainerName}!`);
        window.location.href = "historico_mensagens.html";
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// scripts.js

// Menu Toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
});

// Formulário de contratação
document.getElementById("hire-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const trainerName = document.getElementById("trainer-name").value;
    const plan = document.getElementById("plan").value;

    if (trainerName && plan) {
        alert(`Contratação realizada com sucesso!\nTreinador: ${trainerName}\nPlano: ${plan}`);
        window.location.href = "treino_ativo.html";
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// scripts.js

// Menu Toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
});

// Botão de Editar Perfil
document.getElementById("edit-profile").addEventListener("click", function () {
    alert("Funcionalidade de edição de perfil em desenvolvimento.");
});

// scripts.js

// Menu Toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
});

// Formulário de criação de treino
document.getElementById("training-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const studentName = document.getElementById("student-name").value;
    const trainingName = document.getElementById("training-name").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const objective = document.getElementById("objective").value;
    const activities = document.getElementById("activities").value;

    if (studentName && trainingName && startDate && endDate && objective && activities) {
        alert(`Treino criado com sucesso para ${studentName}!`);
        window.location.href = "area_exclusiva_treinador.html";
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// scripts.js

// Menu Toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
});

// Formulário de edição de treino
document.getElementById("edit-training-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const studentName = document.getElementById("student-name").value;
    const trainingName = document.getElementById("training-name").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const objective = document.getElementById("objective").value;
    const activities = document.getElementById("activities").value;

    if (studentName && trainingName && startDate && endDate && objective && activities) {
        alert(`Treino atualizado com sucesso para ${studentName}!`);
        window.location.href = "area_exclusiva_treinador.html";
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// scripts.js

// Menu Toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
});

// Formulário de seleção de aluno
document.getElementById("student-selection-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const studentName = document.getElementById("student-name").value;

    if (studentName) {
        document.getElementById("student-history").classList.remove("hidden");
        document.getElementById("student-name-display").textContent = studentName;
    } else {
        alert("Por favor, selecione um aluno.");
    }
});

