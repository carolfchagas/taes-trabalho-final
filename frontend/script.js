document.addEventListener('DOMContentLoaded', () => {
    const responseMessage = document.getElementById('responseMessage');

    // Cadastro de usuário
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = {
                nome: cadastroForm.nome.value,
                email: cadastroForm.email.value,
                senha: cadastroForm.senha.value,
                tipo: cadastroForm.tipo.value,
                idade: cadastroForm.idade.value,
                sexo: cadastroForm.sexo.value,
                altura: cadastroForm.altura.value,
                peso: cadastroForm.peso.value,
                objetivo: cadastroForm.objetivo.value,
                descricao_objetivo: cadastroForm.descricao_objetivo.value,
            };

            try {
                const response = await fetch('http://localhost:3000/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    responseMessage.textContent = 'Cadastro realizado com sucesso!';
                    responseMessage.style.color = 'green';
                    cadastroForm.reset();
                } else {
                    const error = await response.json();
                    responseMessage.textContent = `Erro: ${error.message}`;
                    responseMessage.style.color = 'red';
                }
            } catch (error) {
                responseMessage.textContent = 'Erro ao conectar com o servidor.';
                responseMessage.style.color = 'red';
            }
        });
    }

    // Navegar para login
    const voltarLoginButton = document.getElementById('voltarLogin');
    if (voltarLoginButton) {
        voltarLoginButton.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // Login de usuário
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = {
                email: loginForm.email.value,
                senha: loginForm.senha.value,
            };

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    responseMessage.textContent = 'Login realizado com sucesso!';
                    responseMessage.style.color = 'green';
                    window.location.href = 'index.html';
                } else {
                    const error = await response.json();
                    responseMessage.textContent = `Erro: ${error.message}`;
                    responseMessage.style.color = 'red';
                }
            } catch (error) {
                responseMessage.textContent = 'Erro ao conectar com o servidor.';
                responseMessage.style.color = 'red';
            }
        });
    }

    // Navegar para cadastro
    const cadastrarButton = document.getElementById('cadastrar');
    if (cadastrarButton) {
        cadastrarButton.addEventListener('click', () => {
            window.location.href = 'cadastro.html';
        });
    }
});

// Verificar autenticação
window.onload = async () => {
    const publicPages = ['login.html', 'cadastro.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (publicPages.includes(currentPage)) return;

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/validate', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
            const userData = await response.json();
            configurePage(userData);

            // Verificar se estamos na página de treinos e carregar dados
            if (currentPage === 'treinoAtivo.html') {
                loadTreinos();
            }
        } else {
            throw new Error('Sessão inválida.');
        }
    } catch (error) {
        console.error('Erro na validação da sessão:', error);
        alert('Sessão inválida. Por favor, faça login novamente.');
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    }
};

// Configurar página com base no tipo de usuário
function configurePage(userData) {
    if (document.getElementById('userName')) {
        document.getElementById('userName').textContent = userData.nome || 'Usuário';
    }

    if (document.querySelector('#userType span')) {
        document.querySelector('#userType span').textContent = userData.tipo;
    }

    if (userData.tipo === 'Aluno') {
        document.getElementById('aluno-navigation')?.classList.remove('hidden');
    } else if (userData.tipo === 'Personal Trainer') {
        document.getElementById('personal-navigation')?.classList.remove('hidden');
    }
}

// Função para carregar os treinos ativos
async function loadTreinos() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    try {
        // Obter os dados do usuário logado para acessar o ID do aluno
        const userResponse = await fetch('http://localhost:3000/api/auth/validate', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!userResponse.ok) {
            throw new Error('Erro ao validar o usuário.');
        }

        const userData = await userResponse.json();

        // Verifica se o tipo de usuário é "Aluno"
        if (userData.tipo !== 'Aluno') {
            alert('Somente alunos podem acessar esta página.');
            window.location.href = 'index.html';
            return;
        }

        // Chamar o endpoint de treinos para o aluno logado
        const treinosResponse = await fetch(`http://localhost:3000/api/treinos/aluno/${userData.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (treinosResponse.ok) {
            const treinos = await treinosResponse.json();
            renderTreinos(treinos);
        } else {
            alert('Erro ao carregar treinos.');
        }
    } catch (error) {
        console.error('Erro ao carregar treinos:', error);
        alert('Erro ao conectar ao servidor.');
    }
}

// Função para renderizar os treinos
// Função para renderizar os treinos
function renderTreinos(treinos) {
    const container = document.getElementById('treino-container');
    container.innerHTML = '';

    treinos.forEach((treino) => {
        const card = document.createElement('div');
        card.className = 'treino-card';

        card.innerHTML = `
            <h3>${treino.nome}</h3>
            <p><strong>Objetivo:</strong> ${treino.objetivo}</p>
            <p><strong>Período:</strong> ${new Date(treino.data_inicio).toLocaleDateString()} - ${new Date(treino.data_fim).toLocaleDateString()}</p>
            <p><strong>Personal Trainer:</strong> ${treino.personal_nome}</p>
            <button class="expand-button" data-id="${treino.id}">Ver Atividades</button>
            <div class="atividades hidden" id="atividades-${treino.id}"></div>
        `;

        // Adiciona o evento de clique no botão "Ver Atividades"
        const expandButton = card.querySelector('.expand-button');
        expandButton.addEventListener('click', () => toggleAtividades(treino.id));

        container.appendChild(card);
    });
}

// Função para carregar atividades associadas ao treino
async function toggleAtividades(treinoId) {
    const atividadesContainer = document.getElementById(`atividades-${treinoId}`);

    // Alterna a exibição da lista de atividades
    if (!atividadesContainer.classList.contains('hidden')) {
        atividadesContainer.classList.add('hidden');
        atividadesContainer.innerHTML = '';
        return;
    }

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:3000/api/atividades/treino/${treinoId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const atividades = await response.json();

            // Renderiza as atividades com checkboxes
            atividadesContainer.innerHTML = `
                ${atividades
                    .map(
                        (atividade) => `
                        <div class="atividade">
                            <input type="checkbox" id="atividade-${atividade.id}" class="atividade-checkbox" value="${atividade.id}">
                            <label for="atividade-${atividade.id}">
                                <strong>${atividade.tipo}:</strong> ${atividade.descricao}
                                ${
                                    atividade.tipo === 'Musculação'
                                        ? `<p><strong>Séries:</strong> ${atividade.series}, <strong>Repetições:</strong> ${atividade.repeticoes}</p>`
                                        : `<p><strong>Tempo:</strong> ${atividade.tempo} minutos, <strong>Intensidade:</strong> ${atividade.intensidade}</p>`
                                }
                                <p><strong>Observações:</strong> ${atividade.observacoes || 'Nenhuma'}</p>
                            </label>
                        </div>
                    `
                    )
                    .join('')}
                <button class="register-button" data-treino-id="${treinoId}">Registrar Atividades</button>
            `;

            atividadesContainer.classList.remove('hidden');

            // Adiciona evento ao botão "Registrar Atividades"
            const registerButton = atividadesContainer.querySelector('.register-button');
            registerButton.addEventListener('click', () => registrarAtividades(treinoId));
        } else {
            alert('Erro ao carregar atividades.');
        }
    } catch (error) {
        console.error('Erro ao carregar atividades:', error);
        alert('Erro ao conectar ao servidor.');
    }
}

// Função para registrar atividades
async function registrarAtividades(treinoId) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para registrar atividades.');
        return;
    }

    const atividadesContainer = document.getElementById(`atividades-${treinoId}`);
    const checkboxes = atividadesContainer.querySelectorAll('.atividade-checkbox:checked');

    if (checkboxes.length === 0) {
        alert('Por favor, selecione pelo menos uma atividade para registrar.');
        return;
    }

    // Mapear as atividades marcadas (IDs)
    const atividadesMarcadas = Array.from(checkboxes).map((checkbox) => checkbox.value);

    try {
        // Obter dados do usuário logado
        const userResponse = await fetch('http://localhost:3000/api/auth/validate', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!userResponse.ok) {
            throw new Error('Erro ao validar o usuário.');
        }

        const userData = await userResponse.json();

        // Criar uma requisição para cada atividade marcada
        const promises = atividadesMarcadas.map((atividadeId) => {
            const dataExecucao = new Date().toISOString().split('T')[0];
            const body = {
                id_atividade: atividadeId,
                id_aluno: userData.id,
                data_execucao: dataExecucao,
                tempo_realizado: 30, // Valor inicial; pode ser ajustado conforme necessário
            };

            console.log('Enviando requisição para registro:', body);

            return fetch('http://localhost:3000/api/registroAtividades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });
        });

        // Processar todas as requisições em paralelo
        const results = await Promise.all(promises);

        // Verificar se houve erros em alguma requisição
        const erros = results.filter((res) => !res.ok);
        if (erros.length > 0) {
            alert('Houve erros ao registrar algumas atividades. Verifique o console para mais detalhes.');
        } else {
            alert('Atividades registradas com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao registrar atividades:', error);
        alert('Erro ao conectar ao servidor.');
    }
}

// Função para carregar o histórico de atividades
async function loadHistoricoAtividades() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    try {
        // Obter os dados do usuário logado
        const userResponse = await fetch('http://localhost:3000/api/auth/validate', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!userResponse.ok) {
            throw new Error('Erro ao validar o usuário.');
        }

        const userData = await userResponse.json();

        // Verifica se o tipo de usuário é "Aluno"
        if (userData.tipo !== 'Aluno') {
            alert('Somente alunos podem acessar esta página.');
            window.location.href = 'index.html';
            return;
        }

        // Chamar o endpoint de histórico de atividades para o aluno logado
        const historicoResponse = await fetch(`http://localhost:3000/api/registroAtividades/aluno/${userData.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (historicoResponse.ok) {
            const historico = await historicoResponse.json();
            renderHistoricoAtividades(historico);
        } else {
            alert('Erro ao carregar o histórico de atividades.');
        }
    } catch (error) {
        console.error('Erro ao carregar o histórico de atividades:', error);
        alert('Erro ao conectar ao servidor.');
    }
}

// Função para renderizar o histórico de atividades
function renderHistoricoAtividades(historico) {
    const container = document.getElementById('historico-container');
    container.innerHTML = '';

    if (historico.length === 0) {
        container.innerHTML = '<p>Nenhuma atividade registrada.</p>';
        return;
    }

    historico.forEach((registro, index) => {
        const card = document.createElement('div');
        card.className = 'atividade-card';

        card.innerHTML = `
            <h3>Atividade: ${registro.atividade_descricao}</h3>
            <p><strong>Data de Execução:</strong> ${new Date(registro.data_execucao).toLocaleDateString()}</p>
            <p><strong>Tempo Realizado:</strong> ${registro.tempo_realizado} minutos</p>
        `;

        container.appendChild(card);

        // Adiciona uma linha separadora, exceto após o último registro
        if (index < historico.length - 1) {
            const separator = document.createElement('hr');
            container.appendChild(separator);
        }
    });
}


// Atualizar lógica de carregamento com base na página
window.onload = async () => {
    const publicPages = ['login.html', 'cadastro.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (publicPages.includes(currentPage)) return;

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/validate', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
            const userData = await response.json();
            configurePage(userData);

            // Carregar conteúdo específico com base na página atual
            if (currentPage === 'treinoAtivo.html') {
                loadTreinos();
            } else if (currentPage === 'historicoAtividades.html') {
                loadHistoricoAtividades();
            }
        } else {
            throw new Error('Sessão inválida.');
        }
    } catch (error) {
        console.error('Erro na validação da sessão:', error);
        alert('Sessão inválida. Por favor, faça login novamente.');
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    }
};

// Função para carregar o perfil do usuário logado
async function loadPerfil() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    try {
        // Validar o usuário logado e obter seu ID
        const validateResponse = await fetch('http://localhost:3000/api/auth/validate', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!validateResponse.ok) {
            throw new Error('Erro ao validar o usuário.');
        }

        const userData = await validateResponse.json();

        // Buscar informações do usuário pelo ID usando o endpoint /users/{id}
        const userResponse = await fetch(`http://localhost:3000/api/users/${userData.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!userResponse.ok) {
            throw new Error('Erro ao buscar informações do usuário.');
        }

        const userDetails = await userResponse.json();

        console.log(userDetails)

        // Preencher o formulário com os dados do usuário
        document.getElementById('nome').value = userDetails.nome || '';
        document.getElementById('email').value = userDetails.email || '';
        document.getElementById('tipo').value = userDetails.tipo || '';
        document.getElementById('idade').value = userDetails.idade || '';
        document.getElementById('sexo').value = userDetails.sexo || '';
        document.getElementById('altura').value = userDetails.altura || '';
        document.getElementById('peso').value = userDetails.peso || '';
        document.getElementById('objetivo').value = userDetails.objetivo || '';
        document.getElementById('descricao_objetivo').value = userDetails.descricao_objetivo || '';
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        alert('Erro ao conectar ao servidor.');
    }
}


// Função para atualizar o perfil do usuário
async function updatePerfil(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        return;
    }

    const formData = {
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        sexo: document.getElementById('sexo').value,
        altura: document.getElementById('altura').value,
        peso: document.getElementById('peso').value,
        objetivo: document.getElementById('objetivo').value,
        descricao_objetivo: document.getElementById('descricao_objetivo').value,
    };

    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Perfil atualizado com sucesso!');
        } else {
            const error = await response.json();
            alert(`Erro ao atualizar perfil: ${error.message}`);
        }
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        alert('Erro ao conectar ao servidor.');
    }
}

// Evento para logout
document.getElementById('logoutButton')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    alert('Logout realizado com sucesso!');
    window.location.href = 'login.html';
});

// Função para redirecionar para outras páginas
function navigateTo(page) {
    window.location.href = page;
}

document.getElementById('perfilForm')?.addEventListener('submit', updatePerfil);