var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	//provider: String,
	provider_id: {type: String, unique: true},
	photo: String
});

var User = mongoose.model('User', UserSchema);