const productService = require('../services/productService');

const productController = {
    // Adicionar um novo produto
    addProduct: (req, res) => {
        const { nome, preco, material, descricao, imagem_url, estoque, tamanho } = req.body;
        productService.addProduct(nome, preco, material, descricao, imagem_url, estoque, tamanho, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao adicionar produto.' });
            }
            res.status(201).json({ message: 'Produto adicionado com sucesso!' });
        });
    },

    // Buscar todos os produtos ativos
    getProducts: (req, res) => {
        productService.getProducts((err, products) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar produtos.' });
            }
            res.json(products);
        });
    },

    // Soft delete (desativar) de um produto
    softDeleteProduct: (req, res) => {
        const { id } = req.params;
        productService.softDeleteProduct(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao deletar produto.' });
            }
            res.json({ message: 'Produto deletado (soft delete) com sucesso.' });
        });
    },

    // Restaurar um produto desativado
    restoreProduct: (req, res) => {
        const { id } = req.params;
        productService.restoreProduct(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao restaurar o produto.' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Produto não encontrado ou já restaurado.' });
            }
            res.status(200).json({ message: 'Produto restaurado com sucesso.' });
        });
    },

    // Buscar produtos por nome
    buscarProdutosPorNome: (req, res) => {
        const { nome } = req.query;
        productService.buscarProdutosPorNome(nome, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar produtos por nome.' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Nenhum produto encontrado com esse nome.' });
            }
            res.status(200).json(result);
        });
    },

    // Buscar produtos por material
    buscarProdutosPorMaterial: (req, res) => {
        const { material } = req.query;
        productService.buscarProdutosPorMaterial(material, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar produtos por material.' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Nenhum produto encontrado com esse material.' });
            }
            res.status(200).json(result);
        });
    },

    // Buscar produtos por tamanho
    buscarProdutosPorTamanho: (req, res) => {
        const { tamanho } = req.query;
        productService.buscarProdutosPorTamanho(tamanho, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar produtos por tamanho.' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Nenhum produto encontrado com esse tamanho.' });
            }
            res.status(200).json(result);
        });
    }
};

module.exports = productController;
