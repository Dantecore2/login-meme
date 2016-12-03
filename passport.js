var mongoose = require ('mongoose');
var User = mongoose.model('User');
var facebooks = require('passport-facebook').Strategy;
var config = require('./config');

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});

	passport.use(new facebooks({
		clientID: config.facebook.id,
		clientSecret: config.facebook.secret,
		callbackURL: '/auth/facebook/callback',
		profileFields: ['id', 'displayName', 'photos']
	}, function(acessToken, refreshToken, profile, done){
		User.findOne({provider_id: profile.id}, function(err, user) {
			if(err) throw(err);
			if(!err && user != null) {
				console.log('Usuario registrado ' + profile.id);
			}return done(null, user);

			var user = new User({
				provider_id: profile.id,
				//provider: profile.provider,
				name: profile.displayName,
				photo: profile.photos[0].value
			});

			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
			User.insert([
					{provider_id: profile.id,
					name: profile.displayName,
					photo: profile.photos[0].value}
				]);
		});
	}));
};