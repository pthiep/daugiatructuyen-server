module.exports = {
	datetime: function (socket) {
		socket.on('datetime', function () {
			socket.emit('datetime', { datetime: Math.floor(new Date().getTime() / 1000)});		
		});
	}
}