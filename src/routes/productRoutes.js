const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Corrija o nome do controlador

// Rota para adicionar produto
router.post('/add', productController.addProduct);

// Rota para buscar todos os produtos
router.get('/all', productController.getProducts);

// Rota para deletar produto (soft delete)
router.delete('/:id', productController.softDeleteProduct);

// Rota para restaurar produto
router.patch('/restore/:id', productController.restoreProduct);

// Rota para buscar produtos por nome
router.get('/search/name', productController.buscarProdutosPorNome); 

// Rota para buscar produtos por material
router.get('/search/material', productController.buscarProdutosPorMaterial);

// Rota para buscar produtos por tamanho
router.get('/search/size', productController.buscarProdutosPorTamanho);

module.exports = router;
