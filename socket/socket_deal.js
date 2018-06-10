var dealRespository = require('../api/repository/dealRespository');

module.exports = {
	deal: function (io, socket) {
		console.log('ID: ' + socket.id);
		socket.on('deal_pricesuccess', function (data) {
			// console.log('Yeu cau cap nhat gia for all');
			io.sockets.emit('update_dealdetail', '');
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