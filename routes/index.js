exports.index = function(req, res){
/* GET home page. */
  res.render('index', { 
  	title: 'Bienvenido a los Meme Award',
	user: req.user
   });
};


