
/* GET home page */
const index = function(req, res){
  res.render('index', { title: 'Express-Good!!' });
};

module.exports = {
  index
};