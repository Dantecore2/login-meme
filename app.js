//variables de conexión
var express = require('express');
var routes = require('./routes')
var path = require('path');
//var methodOverride = require('method-override');

var mongoose = require('mongoose');
var passport = require('passport');


require('./models/usuario');
require('./passport')(passport);


//Creacion de la base de datos
mongoose.connect('mongodb://localhost:27017/memedb',
	function(err, res){
		if(err) throw err;
		console.log('Conectado con exito a la BD');
	});

var app = express();
var usarios = express.Router();

//Configuración del puerto, plantillas y dirección de las vistas
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','jade');
app.use(express.favicon());
app.use(express.logger('dev'));

//Middlewares para hacer peticiones HTTP
app.use(express.cookieParser());
app.use(express.urlencoded());
app.use(express.json());
//app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.session({secret: 'memesodeti'}));

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

if('development' == app.get('env')){
	app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook',{
	successRedirect: '/',
	failureRedirect: '/login' 
}));

//Iniciar Servidor
app.listen(app.get('port'), function(){
	console.log('Aplicación Login Meme Award en el Puerto ' + app.get('port'));
});
