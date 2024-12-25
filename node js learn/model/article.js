const mongoose = require('mongoose');

// تعريف المخطط (Schema)
const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
});

// تصدير النموذج (Model)
module.exports = mongoose.model('Article', articleSchema);
