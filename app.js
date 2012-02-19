/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration
app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

// Routes
app.get('/', function(req, res) {
	res.render('qrform', {
		title: 'QR VCard Generator'
	});
});

qr = require('qrcode');
app.post('/', function(req, res) {
	var vcard = "BEGIN:VCARD\r\n" + "FN:" + req.body.fn + " " + req.body.ln + "\r\n" + "N:" + req.body.ln + ";" + req.body.fn + ";;;\r\n" + "EMAIL:" + req.body.email + "\r\n" + "TEL;TYPE=CELL:" + req.body.mobile + "\r\n" + "URL:" + req.body.url + "\r\n" + "END:VCARD\r\n";
	qr.toDataURL(vcard, function(err, src) {
		res.render('qrvcard', {
			title: 'QR VCard Generator',
			src: src
		});
	});

});

app.get('/url', function(req, res) {
	qr.toDataURL("http://qr.erickrdch.com/", function(err, src) {
		res.render('qrvcard', {
			title: 'QR VCard Generator',
			src: src
		});
	});

});

app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);