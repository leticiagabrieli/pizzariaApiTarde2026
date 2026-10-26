//src/routes/clienteRoutes.env 
import express from 'express';
import * as produtoController from '../controllers/produtoController.js';
import validate from '../middlewares/validate.js';
import { produtoCreateSchema, produtoUpdateSchema } from '../controllers/produtoController.js';

// // 1. Importa o middleware de login. Descomentar para carregar
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// A rota de criação de cliente (registro) continua pública
router.post('/', validate(produtoCreateSchema), produtoController.adicionarproduto);// Rota final: POST /api/clientes

//2. Aplica o proteção do login em todas as rotas abaixo desta linha
router.use(authMiddleware);

// O caminho base '/api/clientes' já foi definido no index.js
// Agora definimos apenas as partes relativas: '/', etc.
router.get('/', produtoController.listarproduto); // Rota final: GET /api/clientes

router.put('/:idProduto', validate(produtoUpdateSchema), produtoController.atualizarproduto); // Rota final: PUT /api/clientes/:cpf

router.delete('/:idProduto', produtoController.deletarproduto); // Rota final: DELETE /api/clientes/:cpf
export default router;