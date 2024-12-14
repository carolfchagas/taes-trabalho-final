# taes-trabalho-final

Aqui está o arquivo todo em Markdown corretamente formatado:

```markdown
# Portal Vida Saudável

Bem-vindo ao repositório do Portal Vida Saudável! Este é um sistema para gerenciamento de treinos, atividades físicas e acompanhamento personalizado.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Contribuição](#contribuição)

---

## Visão Geral

O **Portal Vida Saudável** é uma aplicação web desenvolvida para conectar alunos e personal trainers, oferecendo funcionalidades como:

- Cadastro e login de usuários.
- Gerenciamento de treinos e atividades.
- Registro e histórico de atividades realizadas.
- Lista de personal trainers disponíveis.

---

## Tecnologias Utilizadas

### Back-end

- **Node.js**
- **Express**
- **MySQL**
- **Swagger** (para documentação da API)

### Front-end

- **HTML5**
- **CSS3**
- **JavaScript**

---

## Pré-requisitos

Certifique-se de que você tem os seguintes itens instalados no seu sistema:

1. **Node.js** (versão 14 ou superior)
2. **MySQL** (versão 5.7 ou superior)
3. **Git**

---

## Como Rodar o Projeto

1. **Clone este repositório**:
   ```bash
   git clone https://github.com/seu-usuario/portal-vida-saudavel.git
   cd portal-vida-saudavel
   ```

2. **Configure o banco de dados**:
   - Crie o banco de dados utilizando o script `database.sql` disponível no repositório.
   - Atualize o arquivo `config/db.config.js` com as credenciais do seu banco de dados.

3. **Instale as dependências**:
   ```bash
   npm install
   ```

4. **Inicie o servidor**:
   ```bash
   npm start
   ```
   O servidor estará disponível em `http://localhost:3000`.

5. **Acesse o front-end**:
   - Abra o arquivo `index.html` no navegador ou configure um servidor local para servir os arquivos HTML.

---

## Funcionalidades

- **Login e Cadastro**:
  - Usuários podem se cadastrar como **Aluno** ou **Personal Trainer**.
  
- **Gerenciamento de Treinos**:
  - Alunos podem visualizar seus treinos ativos.
  - Registro de atividades concluídas.

- **Histórico de Atividades**:
  - Visualização do histórico de atividades realizadas, organizadas por data.

- **Lista de Personal Trainers**:
  - Alunos podem visualizar uma lista de personal trainers disponíveis.

- **Atualização de Perfil**:
  - Usuários podem editar informações do perfil, exceto email e tipo.

---

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir **issues** ou enviar um **pull request**.

1. Faça um fork deste repositório.
2. Crie uma branch para a sua funcionalidade:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```
4. Envie sua branch:
   ```bash
   git push origin minha-feature
   ```
5. Abra um pull request no GitHub.

---

**Desenvolvido com por ANA CAROLINA FREITAS DAS CHAGAS**