var dealRespository = require('../api/repository/dealRespository');
module.exports = {
	time: function (socket) {
		console.log('ID: ' + socket.id);
		socket.on('time_estartupdatetime', function (data) {
			dealRespository.getDealTime()
				.then(function (results) {
					socket.emit('time_ostartupdatetime', results[0].thoigianhientai);
				});			
		});

		socket.on('deal_priceupdate', function (data) {
			var arr = new Array();
			arr.push(data.dealprice);
			arr.push(data.dealid);
			dealRespository.updateDealPrice(arr)
				.then(function (results) {});
		});

		socket.on('deal_updatehistory', function (data) {
			// console.log('Yeu cau cap nhat gia for all');
			io.sockets.emit('update_dealhistory', '');
		});
	}
}