var userRespository = require('../api/repository/userRespository');

module.exports = {
	login: function (socket) {
		/*socket.on('login', function (data) {
			userRespository.checkUser(data)
				.then(function (results) {
					console.log(socket.id);
					console.log(results);
					// socket.userid = results.manguoidung;
					// arr.push(results.manguoidung);
					self.socket.emit('login_checkuser', {
						userid: 1,
						checkuser: true,
						islogin: false
					});
				});
		});*/

		socket.on('login', function (data) {
			var arr = new Array();
			arr.push(data.username);
			arr.push(data.password);
			userRespository.checkUser1(arr)
				.then(function (results) {
					console.log(results);
					// socket.userid = results.manguoidung;
					// arr.push(results.manguoidung);
					// socket.emit('login_checkuser', {
					//	userid: 1,
					//	checkuser: true,
					//	islogin: false
					//});
					socket.emit('login_checkuser', {
						userid: 1,
						checkuser: true,
						islogin: false
					});
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