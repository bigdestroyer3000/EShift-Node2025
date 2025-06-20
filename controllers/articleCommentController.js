const db = require('../config/db');

exports.showArticleComments = async (req, res) => {
    const articleId = (req.params.id);
    const result = await db.query("SELECT * FROM article_comment WHERE id = $1", [articleId]);
    //res.render('main_page', { articles: result.rows });
}

exports.addArticleComment = async (req, res)=>{
    const { article, author, message } = req.body;
    await db.query(`INSERT INTO article_comment (article, name, content) VALUES ($1, $2, $3)`, [article, author, message]);
    res.redirect("/articles/"+article);
};