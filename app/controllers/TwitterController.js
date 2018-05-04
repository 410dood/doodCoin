var https = require('https');

module.exports = {

	get_follower_list_from_twitter: function (req, res) {

		var username = req.params.username;

		var options = {
			host: 'api.github.com',
			port: 443,
			path: '/users/' + username + '/followers',
			method: 'GET',
			headers: { 'user-agent': 'node.js' }
		};

		var buffer = ''; //data received from twitter
		var request = https.get(options, function (result) {
			result.setEncoding('utf8');
			result.on('data', function (chunk) {

				buffer += chunk;
			});

			result.on('end', function () {
				try {
					var parsed = JSON.parse(buffer);
				} catch (err) {
					return res.render('index.ejs');
				}

				console.log(parsed);
				return res.render('friend_list.ejs', {
					friend_list: parsed
				});
			});
		});

		request.on('error', function (e) {
			return res.render('index.ejs');
		});

		request.end();
	}
}