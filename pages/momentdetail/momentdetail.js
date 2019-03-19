const app = getApp()
Page({
	data: {
		moment: {},
		momentId:""
	},

	onLoad: function (options) {
		this.data.momentId = options.momentId
		this.momentDetail(options.momentId);
	},

	navigateTo: function () {
		wx.navigateTo({
			url: '../../pages/userinfo/userinfo'
		})
	},

	// 预览图片
	previewImg: function (e) {
		let imgContents = e.currentTarget.dataset.imgcontents;
		let index = e.currentTarget.dataset.index;
		wx.previewImage({
			//当前显示图片
			current: imgContents[index],
			//所有图片
			urls: imgContents
		})
	},

	//获取动态
	momentDetail: function (momentId) {
		var self = this;
		app.httpPost(
			'api/Moment/MomentDetail', {
				"UId": app.globalData.apiHeader.UId,
				"MomentId": momentId
			},
			function (res) {
				self.setData({
					moment: res
				});
			},
			function (res) {
				console.info("获取数据失败");
			})
	},

	//点赞或者取消点赞
	supportChange: function () {
		let moment = this.data.moment;
		let hasSupport =moment.hasSupport;
		if (hasSupport) {
			moment.supportCount--;
		} else {
			moment.supportCount++;
		}

		moment.hasSupport = !moment.hasSupport;
		this.setData({
			moment: moment
		});

		//更新数据库动态点赞状态
		app.httpPost(
			'api/Moment/SupportMoment', {
				"MomentId": this.data.momentId,
				"UId": app.globalData.apiHeader.UId,
				"IsSupport": !hasSupport
			},
			function (res) {
				console.info("更新数据库动态点赞状态成功");
			},
			function (res) {
				console.error("更新数据库动态点赞状态失败");
			})
	},
})