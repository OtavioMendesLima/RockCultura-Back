const db = require('../database/mysql');

const cartService = {
    addToCart: (usuario_id, produto_id, quantidade, callback) => {
        // Inserir no carrinho
        const queryAddToCart = 'INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)';
        
        db.query(queryAddToCart, [usuario_id, produto_id, quantidade], (err, result) => {
            if (err) return callback(err);

            // Remover do estoque
            const queryUpdateStock = 'UPDATE produtos SET estoque = estoque - ? WHERE id = ? AND estoque >= ?';
            
            db.query(queryUpdateStock, [quantidade, produto_id, quantidade], (errStock) => {
                if (errStock) return callback(errStock);
                callback(null, result);
            });
        });
    },

    removeFromCart: (usuario_id, produto_id, quantidade, callback) => {
        // Remover do carrinho
        const queryRemoveFromCart = 'DELETE FROM carrinho WHERE usuario_id = ? AND produto_id = ? LIMIT 1';
        
        db.query(queryRemoveFromCart, [usuario_id, produto_id], (err, result) => {
            if (err) return callback(err);

            // Adicionar de volta ao estoque
            const queryUpdateStock = 'UPDATE produtos SET estoque = estoque + ? WHERE id = ?';
            
            db.query(queryUpdateStock, [quantidade, produto_id], (errStock) => {
                if (errStock) return callback(errStock);
                callback(null, result);
            });
        });
    },

    getCart: (usuario_id, callback) => {
        const query = 'SELECT * FROM carrinho WHERE usuario_id = ? AND ativo = TRUE';
        db.query(query, [usuario_id], callback);
    }
};

module.exports = cartService;
