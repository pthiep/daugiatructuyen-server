var userRespository = require('../api/repository/userRespository');

module.exports = {
	login: function (socket) {
		socket.on('login', function (data) {
			userRespository.checkUser(data)
				.then(function (results) {
					socket.emit('login_checkuser', results);
				});
		});

		socket.on('logout', function (data) {
			var arrData = new Array();
			arrData.push(1);
			arrData.push(data.userid);
			userRespository.loginStatus(arrData)
				.then(function (rows) {})
				.catch(function (err) {
					console.log(err);
				});
		});
	}
}