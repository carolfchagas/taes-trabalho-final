const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const userRoutes = require('./routes/user.routes');
const academiaRoutes = require('./routes/academia.routes');
const personalTrainerRoutes = require('./routes/personal_trainer.routes');
const mensagemRoutes = require('./routes/mensagem.routes');
const pagamentoRoutes = require('./routes/pagamento.routes');
const treinoRoutes = require('./routes/treino.routes');
const atividadeRoutes = require('./routes/atividade.routes');
const registroAtividadesRoutes = require('./routes/registroAtividades.routes');
const app = express();
const authRoutes = require('./routes/auth.routes');

const cors = require('cors');

// Habilitar CORS para todas as rotas
app.use(cors());

// Middleware
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/personal-trainers', personalTrainerRoutes);
app.use('/api/academias', academiaRoutes);
app.use('/api/mensagens', mensagemRoutes);
app.use('/api/pagamentos', pagamentoRoutes);
app.use('/api/treinos', treinoRoutes);
app.use('/api/atividades', atividadeRoutes);
app.use('/api/registroAtividades', registroAtividadesRoutes);
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

