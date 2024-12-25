const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Article = require('./model/article');

// الاتصال بـ MongoDB
mongoose.connect("mongodb+srv://raoufbenadda:pCkivsxI37RuJNgl@first-api.ry1mn.mongodb.net/?retryWrites=true&w=majority&appName=first-api", {})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

// التأكد من وجود ملف الموديل
let Article;
try { 
    Article = require('./model/article.js');
} catch (err) {
    console.warn('Warning: model/article.js not found. If this is required, please add it.');
}


const app = express(); // تعريف التطبيق

// إعداد محرك القوالب ليكون EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // تحديد مجلد views

// تمكين استقبال JSON وبيانات النماذج
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مسارات التطبيق

// مسار GET /hello
app.get('/hello', (req, res) => {
    res.send('hello');
});

// مسار GET /hi
app.get('/hi', (req, res) => {
    res.send('hello in node js project');
});

// مسار GET /number
app.get('/number', (req, res) => {
    const numbers = Array.from({ length: 100 }, (_, i) => i).join(' - '); // توليد الأرقام
    res.render('num.ejs', { numbers: numbers }); // تمرير المتغير "numbers" إلى ملف EJS
});

// مسار GET /findSummation
app.get('/findSummation/:number1/:number2', (req, res) => {
    const num1 = parseFloat(req.params.number1); // تحويل المدخلات إلى أرقام
    const num2 = parseFloat(req.params.number2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send('Please provide valid numbers.');
    }

    const total = num1 + num2; // حساب المجموع
    res.send(`The numbers are: ${num1} and ${num2}. The total is: ${total}`);
});

// مسار GET /sayHello
app.get('/sayHello', (req, res) => {
    const name = req.query.name || 'Guest'; // جلب الاسم من query params
    const age = req.query.age || 'Unknown'; // جلب العمر
    res.json({
        name: name,
        age: age,
        language: "arabic",
    });
});

// مسار POST /addComment
app.post('/addComment', (req, res) => {
    const comment = req.body.comment; // استلام التعليق من body
    if (!comment) {
        return res.status(400).send('Comment is required.');
    }
    res.send(`Comment added: ${comment}`);
});

// مسار PUT /test
app.put('/test', (req, res) => {
    res.send('You are in test PUT');
});

// مسار DELETE /testingDelete
app.delete('/testingDelete', (req, res) => {
    res.send('Delete request');
});


// معالجة الأخطاء العامة
app.use((req, res) => {
    res.status(404).send('Route not found.');
});

// تشغيل الخادم على المنفذ 5000
app.listen(5000, ()=> {
    console.log('Server is running on port 5000');
})


app.post("./articles",  (req, res) => {
    const articleData = req.body; // Read the request data
    res.send(`Article created with data: ${JSON.stringify(articleData)}`);
}) ;
 

// pCkivsxI37RuJNgl >>>>> password mongo db