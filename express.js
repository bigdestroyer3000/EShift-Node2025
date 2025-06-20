const express = require('express')
const app = express()
const exhbs = require('express-handlebars');
const path = require('path');
const multer  = require('multer')
const upload = multer();
const articleController = require('./controllers/articleController');
const articleCommentController = require('./controllers/articleCommentController');

app.engine('hbs', exhbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', articleController.showMainPage);
app.get('/articles/{:id}', articleController.showSingleArticle);
app.get('/editArticle/{:id}', articleController.showEditArticle);
app.post('/editArticle', upload.any(), articleController.editArticle);

app.get('/deleteArticle/{:id}', articleController.deleteArticle);
app.post('/addArticle', upload.any(), articleController.addArticle);
app.get('/addArticle', (req, res)=>{res.render('add_article');});
app.post('/addArticleComment', upload.any(), articleCommentController.addArticleComment);



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

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})