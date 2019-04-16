//获取应用实例
const app = getApp()

Page({

	data: {
		tempChatList: [],
		totalUnReadCount: "",
		actionHidden: true,
		selectItem: [],
		count: 1
	},

	onShow: function () {
		//this.getChatList();
	},

	onLoad: function () {
		this.getChatList();
	},

	//下拉刷新页面数据
	onPullDownRefresh: function () {
		this.getChatList();
	},

	setTabBarBadge: function (count) {
		wx.setTabBarBadge({
			index: 0,
			text: count
		})
	},

	//获取用户数据
	getChatList: function () {
		var self = this;
		if (app.globalData.apiHeader.UId > 0) {
			app.httpPost(
				'api/Chat/GetChatList', {
					"UId": app.globalData.apiHeader.UId
				},
				function (res) {
					console.info("获取聊天列表成功！")

					self.setData({
						tempChatList: res.chatList
					});

					self.setTabBarBadge(res.totalUnReadCount);
					//获取聊天数据结束后，停止刷新下拉
					wx.stopPullDownRefresh();
				},
				function (res) {
					console.error("获取聊天列表失败！");
					//获取聊天数据结束后，停止刷新下拉
					wx.stopPullDownRefresh();
				})
		}
	},

	//清除未读消息
	clearUnReadCount: function (ops) {
		let self = this;
		let partnerId = ops.currentTarget.dataset.idx;
		let index = ops.currentTarget.dataset.key;
		if (app.globalData.apiHeader.UId > 0) {
			app.httpPost(
				'api/Chat/ClearUnReadCount', {
					"UId": app.globalData.apiHeader.UId,
					"PartnerUId": partnerId
				},
				function (res) {
					console.info("清除未读消息成功！")

					self.data.tempChatList[index].unReadCount = '';
					self.setData({
						tempChatList: self.data.tempChatList,
						totalUnReadCount: res.data.content.currentTotalUnReadCount
					})
				},
				function (res) {
					console.info("清除未读消息Http失败！")
				})
		}
	},

	//长按删除对话弹框
	deleteItem: function (ops) {
		this.setData({
			actionHidden: false,
			selectItem: ops.currentTarget.dataset
		})
	},

	//重置长按选择项
	resetSelectItem: function () {
		this.setData({
			actionHidden: true,
			selectItem: []
		})
	},

	//删除对话
	deleteChat: function () {
		let self = this;
		let partnerId = this.data.selectItem.idx;
		let index = this.data.selectItem.key;
		if (app.globalData.apiHeader.UId > 0) {
			app.httpPost(
				'api/Chat/DeleteChat', {
					"UId": app.globalData.apiHeader.UId,
					"PartnerUId": partnerId
				},
				function (res) {
					console.info("删除对话成功！");
					let list = self.data.tempChatList;
					list.splice(index, 1);
					self.setData({
						tempChatList: list,
						totalUnReadCount: res.currentTotalUnReadCount
					});
					//重置数据
					self.resetSelectItem();
				},
				function (res) {
					console.error("删除对话Http失败！");
					self.resetSelectItem();
				})
		}
	}
})