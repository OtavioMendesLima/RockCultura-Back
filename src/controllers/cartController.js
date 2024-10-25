const cartService = require('../services/cartService');

const cartController = {
    addToCart: (req, res) => {
        const { usuario_id, produto_id, quantidade } = req.body;
        
        cartService.addToCart(usuario_id, produto_id, quantidade, (err, result) => {
            if (err) return res.status(500).json({ error: 'Erro ao adicionar ao carrinho.' });
            res.status(201).json({ message: 'Produto adicionado ao carrinho com sucesso!' });
        });
    },

    removeFromCart: (req, res) => {
        const { usuario_id, produto_id, quantidade } = req.body;
        
        cartService.removeFromCart(usuario_id, produto_id, quantidade, (err, result) => {
            if (err) return res.status(500).json({ error: 'Erro ao remover do carrinho.' });
            res.status(200).json({ message: 'Produto removido do carrinho com sucesso!' });
        });
    },

    getCart: (req, res) => {
        const { usuario_id } = req.params;
        
        cartService.getCart(usuario_id, (err, cart) => {
            if (err) return res.status(500).json({ error: 'Erro ao buscar o carrinho.' });
            res.json(cart);
        });
    }
};

module.exports = cartController;
