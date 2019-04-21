const app = getApp()
Page({
	data: {
		friendList: [],
		friendType: 0
	},

	onLoad: function (options) {
		this.setData({
			friendType: options.type
		});
		wx.setNavigationBarTitle({
			title: options.title
		});
		this.getFriends();
	},

	onShow: function () {
		this.getFriends();
	},


	getFriends: function () {
		let self = this;
		//先清空
		self.setData({
			friendList: []
		});
		app.httpPost(
			'api/UserInfo/GetFriends', {
				"UId": app.globalData.apiHeader.UId,
				"FriendType": this.data.friendType
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

	attentionFans: function (ops) {
		let partnerUId = ops.currentTarget.dataset.partneruid;
		let friendList = this.data.friendList;
		let index = 0;
		for (var i = 0, count = friendList.length; i < count; i++) {
			if (friendList[i].partnerUId === partnerUId) {
				index=i;
				break;
			}
		}
		
		let hasAttention = friendList[index].hasAttention;
		if (index>=0){
			var attention = "friendList[" + index + "].hasAttention";
			this.setData({
				[attention]: !hasAttention
			});
		}
		

		app.httpPost(
			'api/UserInfo/UpdateAttentionState', {
				"UId": app.globalData.apiHeader.UId,
				"PartnerUId": partnerUId
			},
			function (res) {
				if (res.isExecuteSuccess) {
					console.info("更新关注状态成功");
				}
			},
			function (res) {
				console.error("更新关注状态失败");
			})
	},
	
	changeAttention: function () {
		let hasAttention = this.data.userSpace.hasAttention;

		let attention = 'userSpace.hasAttention';
		this.setData({
			[attention]: !hasAttention
		});

		

	},
})