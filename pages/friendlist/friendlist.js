const app = getApp()
Page({
	data: {
		friendList: [],
		type: 0
	},

	onLoad: function (options) {
		this.data.type = options.type
		wx.setNavigationBarTitle({
			title: options.title
		});

		this.getFriends();
	},

	getFriends: function () {
		let self=this;
		app.httpPost(
			'api/UserInfo/GetFriends', {
				"UId": app.globalData.apiHeader.UId,
				"FriendType": this.data.type
			},
			function (res) {
				if (res != null) {
					self.setData({
						friendList: res.friends
					});
					console.info("获取好友列表数据成功");
				}

			},
			function (res) {
				console.error("获取好友列表数据失败");
			})
	},

})