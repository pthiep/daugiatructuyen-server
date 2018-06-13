var dealRespository = require('../api/repository/dealRespository');
module.exports = {
	time: function (socket) {
		console.log('SocketHOMEID: ' + socket.id);
		socket.on('time_estartupdatetime', function (data) {
			dealRespository.getDealTime()
				.then(function (results) {
					socket.emit('time_ostartupdatetime', results[0].thoigianhientai);
				});			
		});
	}
}