const mongoose = require('mongoose');

const budgetItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Use a regular expression to check for the hexadecimal format.
                return /^#([0-9A-Fa-f]{6})$/.test(v);
            },
            message: 'Color must be in the hexadecimal format (e.g., #ED4523).'
        }
    }
});

const budgetSchema = new mongoose.Schema({
    myBudget: {
        type: [budgetItemSchema], // An array of budget items using the budgetItemSchema
        required: true
    }
}, { collection: 'data' });

module.exports = mongoose.model('data', budgetSchema);