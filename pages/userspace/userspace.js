const app = getApp();
Page({

	data: {
		userSpace: {},
		uId:1
	},

	onLoad: function (options) {
		//this.data.uId = options.uId;
		this.getMySpace();
	},

	//获取动态
	getMySpace: function () {
		var self = this;
		app.httpPost(
			'api/Moment/MySpace', {
				"UId": this.data.uId
			},
			function (res) {
				self.setData({
					userSpace: res
				});
			},
			function (res) {
				console.info("获取数据失败");
			})
	},
})