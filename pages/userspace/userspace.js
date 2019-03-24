const app = getApp();
Page({

  data: {
    userSpace: {},
    uId: 1
  },

  onLoad: function(options) {
    //this.data.uId = options.uId;
    this.getMySpace();
    this.setVisitor();
  },

  // 预览图片
  previewImg: function(e) {
    let imgPath = e.currentTarget.dataset.imgpath;
    let imgPaths = e.currentTarget.dataset.imgpaths;
    wx.previewImage({
      //当前显示图片
      current: imgPath,
      //所有图片
      urls: imgPaths
    })
  },

  // 预览一张图片
  previewSingleImg: function(e) {
    let imgPath = e.currentTarget.dataset.imgpath;
    let imgPaths = [];
    imgPaths.push(imgPath);
    wx.previewImage({
      //当前显示图片
      current: imgPath,
      //所有图片
      urls: imgPaths
    })
  },

  //获取动态
  getMySpace: function() {
    var self = this;
    app.httpPost(
      'api/Moment/MySpace', {
        "UId": app.globalData.apiHeader.UId,
        "PartnerUId": self.data.uId
      },
      function(res) {
        self.setData({
          userSpace: res
        });
      },
      function(res) {
        console.info("获取数据失败");
      })
  },

  //获取动态
  setVisitor: function() {
    var self = this;
    app.httpPost(
      'api/UserInfo/SetVisitor', {
        "UId": app.globalData.apiHeader.UId,
        "PartnerUId": self.data.uId
      },
      function(res) {
        if (res.isExecuteSuccess) {
          console.info("添加访客信息成功");
        }
      },
      function(res) {
        console.error("添加访客信息失败");
      })
  },

  changeAttention: function() {
    let hasAttention = this.data.userSpace.hasAttention;
		
		let attention = 'userSpace.hasAttention';
    this.setData({
			[attention]: !hasAttention
    });

    if (app.globalData.apiHeader.UId != this.data.uId) {
      app.httpPost(
        'api/UserInfo/UpdateAttentionState', {
          "UId": app.globalData.apiHeader.UId,
          "PartnerUId": this.data.uId
        },
        function(res) {
          if (res.isExecuteSuccess) {
            console.info("更新关注状态成功");
          }
        },
        function(res) {
          console.error("更新关注状态失败");
        })
    }

  },
})