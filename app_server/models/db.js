var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/Loc8r';
if(process.env.NODE_ENV === 'production'){
    dbURI = 'mongodb://minza1215:dkagh3508@ds143211.mlab.com:43211/loc8rkmjdb';
}
mongoose.connect(dbURI);
require('./locations');

mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnectd', function(){
    console.log('Mongoose disconnected');
});

var gracefullShutdown = function(msg, callback){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

process.once('SIGUSR2', function(){
    gracefullShutdown('nodemon restart', function(){
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function(){
    gracefullShutdown('app termination', function(){
        process.exit(0);
    });
});

process.on('SIGTERM', function(){
    gracefullShutdown('Heroku app shutdown', function(){
        process.exit(0);
    });
});