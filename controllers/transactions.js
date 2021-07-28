const Transaction = require('../Models/Transaction');

// @desc Get all transactions
// @route GET request to /api/v1/transactions
// @access public
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        return res.status(500).json({
            sucess: false,
            error: 'server error'
        })
    }
};

// @desc  Add a Transaction
// @route POST request to /api/v1/transactions
// @access public
exports.addTransaction = async (req, res, next) => {
    const {text, amount} = req.body;
    
    try {
        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            sucess: true,
            data: transaction
        });
    } catch (err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                sucess: false,
                error: 'server error'
            });
        }
    }
};

// @desc Delete a transactions
// @route DELETE request to /api/v1/transactions/:id
// @access public
exports.deleteTransaction = async (req, res, next) => {
    try {
        const requiredTransaction = await Transaction.findById(req.params.id);

        if(!requiredTransaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }

        await requiredTransaction.remove();

        return res.status(200).json({
            succes: true,
            data: {message: 'required transaction has been deleted'}
        });

    } catch (err) {
        return res.status(500).json({
            sucess: false,
            error: 'server error'
        });
    }
};