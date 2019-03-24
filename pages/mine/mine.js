const app = getApp()
Page({
  data: {
		userInfo:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  onShow: function () {
		this.getUserSimpleInfo();
  },

	//获取用户简易信息
	getUserSimpleInfo: function () {
		var self = this;
		app.httpPost(
			'api/UserInfo/GetUserSimpleInfo', {
				"UId": app.globalData.apiHeader.UId
			},
			function (res) {
				self.setData({
					userInfo: res
				});
			},
			function (res) {
				console.info("获取数据失败");
			})
	},
})