const app = getApp()

Page({
  data: {
    isRecommendChecked: true,
    isNewestChecked: false,
    isAttentionChecked: false,
    currentItem: 0,
    currentMoment: {},
    momentList: [],
    pageIndex: 1,
    loadHide: true,
    actionHidden: true,
    attentionTxt: "关注"
  },

  //下拉刷新页面数据
  onPullDownRefresh: function() {
		this.setData({
			momentList: [],
			pageIndex: 1
		});
		this.getMoments(0);
  },

  //私聊
  startChat: function() {
    let currentMoment = this.data.currentMoment;
    wx.navigateTo({
      url: "/pages/chatdetail/chatdetail?partnerUId=" + currentMoment.uId + "&nickName=" + currentMoment.dispalyName
    })

    this.resetSelectItem();
  },

  //停止刷新
  stopRefresh: function(loadType) {
    if (loadType == 1) {
      this.setData({
        loadHide: true
      });
    } else {
      wx.stopPullDownRefresh();
    }
  },

  //更多
  moreAction: function(ops) {
    let key = ops.currentTarget.dataset.key;
    let momentList = this.data.momentList;
    let hasAttention = momentList[key].hasAttention;

    this.setData({
      actionHidden: false,
      selectItem: ops.currentTarget.dataset,
      attentionTxt: hasAttention ? "已关注" : "关注",
      currentMoment: momentList[key]
    })
  },

  //重置长按选择项
  resetSelectItem: function() {
    this.setData({
      actionHidden: true,
      selectItem: []
    })
  },

  //触底加载更多数据
  onReachBottom: function() {
    let page = this.data.pageIndex + 1;
    this.setData({
      loadHide: false,
      pageIndex: page
    });

		let self=this;
		//loading动画加载1.5秒后执行
		setTimeout(function () {
			self.getMoments(1);
		}, 1500)
    
  },

  onShow: function() {
    this.getMoments(0);
  },

  //置顶
  toTop: function() {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

  //动态详情页面
  previewMomentDetail: function(e) {
    let momentId = e.currentTarget.dataset.momentid;
    wx.navigateTo({
      url: "../../pages/momentdetail/momentdetail?momentId=" + momentId
    })
  },

  //发布动态
  publishMoment: function() {
    wx.navigateTo({
      url: '../../pages/publishmoment/publishmoment'
    })
  },

  //跳转个人空间页面
  toSpace: function(e) {
    let uId = e.currentTarget.dataset.uId;
    wx.navigateTo({
      url: "../../pages/userspace/userspace?uid=" + uId
    })
  },

	reportItem: function () {
		let currentMoment = this.data.currentMoment;
		wx.navigateTo({
			url: "/pages/chatdetail/chatdetail?partnerUId=" + currentMoment.uId + "&nickName=" + currentMoment.dispalyName
		})

		this.resetSelectItem();
	},

  //预览图片
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

  //关注某人
  attentionItem: function() {
    let currentMoment = this.data.currentMoment;
    let self = this;
    app.httpPost(
      'api/UserInfo/UpdateAttentionState', {
        "UId": app.globalData.apiHeader.UId,
        "PartnerUId": currentMoment.uId
      },
      function(res) {
        self.setData({
          attentionTxt: currentMoment.hasAttention ? "关注" : "已关注"
        });
      },
      function(res) {
        console.info("更新关注状态失败");
      })
  },

  //获取动态
  getMoments: function(loadType) {
    var self = this;
    let tempMomentList = self.data.momentList;
    app.httpPost(
      'api/Moment/GetMoments', {
        "UId": app.globalData.apiHeader.UId,
        "MomentType": this.data.currentItem,
        "PageIndex": this.data.pageIndex
      },
      function(res) {
        if (tempMomentList.length == 0) {
          tempMomentList = res.momentList
        } else {
          if (res.momentList != null && res.momentList.length > 0) {
            tempMomentList = tempMomentList.concat(res.momentList);
          }
        }
        self.setData({
          momentList: tempMomentList
        });
        self.stopRefresh(loadType);
      },
      function(res) {
        console.info("获取数据失败");
        self.stopRefresh(loadType);
      })
  },

  //Bar切换
  clickButton: function(e) {
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
    this.toTop();
    this.setData({
      momentList: [],
      pageIndex: 1
    });
    this.getMoments(0);
  },

  //点赞或者取消点赞
  supportChange: function(e) {
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
      function(res) {
        console.info("更新数据库动态点赞状态成功");
      },
      function(res) {
        console.error("更新数据库动态点赞状态失败");
      })
  },
})