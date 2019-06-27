const { connection } = require('../db/connection');

exports.fetchArticles = ({ article_id }) => {
  return connection
    .select('articles.*')
    .from('articles')
    .count('articles.article_id as comment_count')
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id')
    .modify(query => {
      if (article_id) query.where('articles.article_id', article_id);
    });
};

exports.updateArticle = (article_id, inc_votes) => {
  return connection('articles')
    .where({ article_id: article_id })
    .increment('votes', inc_votes)
    .returning('*');
};
