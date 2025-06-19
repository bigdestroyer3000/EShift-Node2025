const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const exhbs = require('express-handlebars');
const path = require('path');
const multer  = require('multer')
const upload = multer();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postman',
    host: 'localhost',
    database: 'EShiftNodeCourse2025',
    password: 'qwerty',
    port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    if(err) {
        console.error('Error connecting to the database', err.stack);
    } else {
        console.log('Connected to the database:', res.rows);
    }
});

app.engine('hbs', exhbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('main_page');
})
app.get('/login', (req, res)=>{
   res.render('login');
});
app.post('/login',  upload.any(), (req, res)=>{
    console.log(req.body.email);
    console.log(req.body.pass);
    res.send('ok');
});
app.get('/reg', (req, res)=>{
    res.render('reg');
});
app.post('/reg',  upload.any(), (req, res)=>{
    console.log(req.body.fullName);
    console.log(req.body.login);
    console.log(req.body.password);
    res.send('ok');
});



app.get('/hello', (req, res)=>{
    res.send("TEST");
})
app.get('/addArticle', (req, res)=>{
    res.render('add_article');
});
app.post('/addArticle', upload.any(), async (req, res)=>{

    const { title, content, author } = req.body;

    try {
        await pool.query('INSERT INTO articles (title, content, author) VALUES ($1, $2, $3)', [title, content, author]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    res.send('ok');
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})