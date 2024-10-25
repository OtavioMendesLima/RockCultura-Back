const db = require('../database/mysql');

const productService = {
    // Método para adicionar produto
    addProduct: (nome, preco, material, descricao, imagem_url, estoque, tamanho, callback) => {
        const query = 'INSERT INTO produtos (nome, preco, material, descricao, imagem_url, estoque, tamanho) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [nome, preco, material, descricao, imagem_url, estoque, tamanho], callback);
    },
    
    // Método para obter todos os produtos ativos
    getProducts: (callback) => {
        const query = 'SELECT * FROM produtos WHERE ativo = TRUE';
        db.query(query, callback);
    },
    
    // Método para fazer soft delete de um produto
    softDeleteProduct: (id, callback) => {
        const query = 'UPDATE produtos SET ativo = FALSE WHERE id = ?';
        db.query(query, [id], callback);
    },
    
    // Método para restaurar um produto (ativá-lo novamente)
    restoreProduct: (id, callback) => {
        const query = 'UPDATE produtos SET ativo = TRUE WHERE id = ?';
        db.query(query, [id], callback);
    },
    
    // Método para buscar produtos por nome
    buscarProdutosPorNome: (nome, callback) => {
        const query = 'SELECT * FROM produtos WHERE nome LIKE ? AND ativo = TRUE';
        db.query(query, [`%${nome}%`], callback);
    },
    
    // Método para buscar produtos por material
    buscarProdutosPorMaterial: (material, callback) => {
        const query = 'SELECT * FROM produtos WHERE material LIKE ? AND ativo = TRUE';
        db.query(query, [`%${material}%`], callback);
    },

    // Método para buscar produtos por tamanho
    buscarProdutosPorTamanho: (tamanho, callback) => {
        const query = 'SELECT * FROM produtos WHERE tamanho = ? AND ativo = TRUE';
        db.query(query, [tamanho], callback);
    }
};

module.exports = productService;
