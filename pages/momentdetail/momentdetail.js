const app = getApp()
Page({
  data: {
    moment: {},
    momentId: "",
    discussContent: ""
  },

  onLoad: function(options) {
    this.data.momentId = options.momentId
    this.momentDetail();
  },

  //下拉刷新页面数据
  onPullDownRefresh: function() {
    this.momentDetail();
    wx.stopPullDownRefresh();
  },

  navigateTo: function() {
    wx.navigateTo({
      url: '../../pages/userinfo/userinfo'
    })
  },

  // 预览图片
  previewImg: function(e) {
    let imgContents = e.currentTarget.dataset.imgcontents;
    let index = e.currentTarget.dataset.index;
    wx.previewImage({
      //当前显示图片
      current: imgContents[index],
      //所有图片
      urls: imgContents
    })
  },

  //获取输入的聊天内容
  discussContentInput: function(e) {
    this.setData({
      discussContent: e.detail.value
    })
  },

  //获取动态
  momentDetail: function() {
    var self = this;
    app.httpPost(
      'api/Moment/MomentDetail', {
        "UId": app.globalData.apiHeader.UId,
        "MomentId": self.data.momentId
      },
      function(res) {
        self.setData({
          moment: res
        });
      },
      function(res) {
        console.info("获取数据失败");
      })
  },

  //发表评论
  insertDiscussContent: function() {
    var self = this;
    app.httpPost(
      'api/Moment/MomentDiscuss', {
        "UId": app.globalData.apiHeader.UId,
        "MomentId": self.data.momentId,
        "DiscussContent": self.data.discussContent
      },
      function(res) {
        if (res.isExecuteSuccess) {
					self.setData({
            discussContent: ""
          });
					self.momentDetail();
          console.info("发表评论成功");
        }
      },
      function(res) {
        console.error("发表评论失败");
      })
  },

  //点赞或者取消点赞
  supportChange: function() {
    let moment = this.data.moment;
    let hasSupport = moment.hasSupport;
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
      function(res) {
        console.info("更新数据库动态点赞状态成功");
      },
      function(res) {
        console.error("更新数据库动态点赞状态失败");
      })
  },

	//评论点赞或者取消点赞
	discussSupportChange: function (e) {
		let key = e.currentTarget.dataset.index;
		let discuss = this.data.moment.discussList[key];
		let supportCount = discuss.supportCount;
		let hasSupport = discuss.hasSupport;
		if (hasSupport) {
			supportCount--;
		} else {
			supportCount++;
		}
		var count = "moment.discussList[" + key + "].supportCount";
		var support = "moment.discussList[" + key + "].hasSupport";
		this.setData({
			[support]: !hasSupport,
			[count]: supportCount
		});
		//更新数据库动态点赞状态
		app.httpPost(
			'api/Moment/SupportDiscuss', {
				"DiscussId": discuss.discussId,
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