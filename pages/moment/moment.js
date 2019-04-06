const app = getApp()

Page({
	data: {
		isRecommendChecked: true,
		isNewestChecked: false,
		isAttentionChecked: false,
		currentItem: 0,
		momentList: [],
		pageIndex: 1,
		loadHide: true
	},

	//下拉刷新页面数据
	onPullDownRefresh: function () {
		this.setData({
			loadHide: true
		});
	},

	stopRefresh:function(loadType) {
		if (loadType==0){
			this.setData({
				loadHide: true
			});
		}else{
			wx.stopPullDownRefresh();
		}
		
	},

  //触底加载更多数据
	onReachBottom: function (){
		let page = this.data.pageIndex+1;
		this.setData({
			loadHide: false,
			pageIndex: page
		});
		this.getMoments(1);
	},

	onShow: function () {
		this.getMoments(0);
	},

  //置顶
	toTop: function () {
		wx.pageScrollTo({
			scrollTop: 0
		})
	},

  //动态详情页面
	previewMomentDetail: function (e) {
		let momentId = e.currentTarget.dataset.momentid;
		wx.navigateTo({
			url: "../../pages/momentdetail/momentdetail?momentId=" + momentId
		})
	},

  //发布动态
	publishMoment: function () {
		wx.navigateTo({
			url: '../../pages/publishmoment/publishmoment'
		})
	},
  
	//跳转个人空间页面
	toSpace: function (e) {
		let uId = e.currentTarget.dataset.uId;
		wx.navigateTo({
			url: "../../pages/userspace/userspace?uid=" + uId
		})
	},

	//预览图片
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
	getMoments: function (loadType) {
		var self = this;
		app.httpPost(
			'api/Moment/GetMoments', {
				"UId": app.globalData.apiHeader.UId,
				"MomentType": this.data.currentItem,
				"PageIndex": this.data.pageIndex
			},
			function (res) {
				self.setData({
					momentList: res.momentList,
					loadHide: true
				});
				self.stopRefresh(loadType);
			},
			function (res) {
				console.info("获取数据失败");
				self.stopRefresh(loadType);
			})
	},

	//Bar切换
	clickButton: function (e) {
		switch (e.target.dataset.num) {
			case "0":
				this.setData({
					isRecommendChecked: true,
					isNewestChecked: false,
					isAttentionChecked: false,
					currentItem: 0,
				})
				break;
			case "1":
				this.setData({
					isRecommendChecked: false,
					isNewestChecked: true,
					isAttentionChecked: false,
					currentItem: 1
				})
				break;
			case "2":
				this.setData({
					isRecommendChecked: false,
					isNewestChecked: false,
					isAttentionChecked: true,
					currentItem: 2
				})
				break;
		}
		this.getMoments(0);
	},

	//点赞或者取消点赞
	supportChange: function (e) {
		let key = e.currentTarget.dataset.key;
		let momentList = this.data.momentList;
		let supportCount = momentList[key].supportCount;
		let hasSupport = momentList[key].hasSupport;
		if (hasSupport) {
			supportCount--;
		} else {
			supportCount++;
		}

		var count = "momentList[" + key + "].supportCount";
		var support = "momentList[" + key + "].hasSupport";
		this.setData({
			[support]: !hasSupport,
			[count]: supportCount
		});

		//更新数据库动态点赞状态
		app.httpPost(
			'api/Moment/SupportMoment', {
				"MomentId": momentList[key].momentId,
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