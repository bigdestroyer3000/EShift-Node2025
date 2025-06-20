const db = require('../config/db');

exports.showMainPage = async (req, res) => {
    let result = await db.query("SELECT * FROM article");
    res.render('main_page', { articles: result.rows });
}

exports.showSingleArticle = async (req, res)=>{
    const articleId = (req.params.id);
    const articles = await db.query("SELECT * FROM article WHERE id = $1", [articleId]);

    const comments = await db.query("\
        SELECT ac.name, ac.content\
        FROM article a\
        JOIN article_comment ac ON ac.article = a.id\
        WHERE a.id = $1",
        [articleId]
    );

    res.render('single_article', {article: articles.rows[0], comments: comments.rows});
}

exports.showEditArticle = async (req, res)=>{
    const articleId = (req.params.id);
    const result = await db.query("SELECT * FROM article WHERE id = $1", [articleId]);
    res.render('edit_article', {article: result.rows[0]})
};

exports.editArticle = async (req, res)=>{
    const { article_id, title, content} = req.body;
    const result = await db.query("UPDATE article SET title = $1, content = $2 WHERE id = $3 RETURNING *", [title, content, article_id]);
    res.redirect("/articles/"+result.rows[0].id);
};

exports.deleteArticle = async (req, res)=>{
    const articleId = (req.params.id);
    await db.query("DELETE FROM article WHERE id = $1", [articleId]);
    res.redirect("/");
};
exports.addArticle = async (req, res)=>{
    const { title, content, author } = req.body;
    await db.query(`INSERT INTO article (title, content, author) VALUES ($1, $2, $3)`, [title, content, author]);
    res.redirect("/");
};