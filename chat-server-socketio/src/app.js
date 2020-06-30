var socket = io();
socket.on('chat message', () => {
	vueApp.updatex();
})

let vueApp = new Vue({
	el: "#app",
	data: {
		textarea: "",
		textarea2: "",
	},
	methods: {
		foo: function () {
			console.log(this.textarea)
			socket.emit("chat message", this.textarea);
		},
		updatex: function () {
			socket.on('chat message', (msg) => {
				this.textarea2 = msg;
			});
		}
	},
})