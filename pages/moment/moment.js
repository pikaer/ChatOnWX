//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isRecommendChecked: true,
    isNewestChecked: false,
    isAttentionChecked: false,
    currentItem: 0,
    momentList: [],
  },

  onLoad: function () {
    this.getMoments();
  },

  //获取动态
  getMoments: function () {
    var self = this;
    app.httpPost(
      'api/Moment/GetMoments', {
        "UId": app.globalData.apiHeader.UId,
        "MomentType": this.data.currentItem
      },
      function (res) {
        self.setData({
          momentList: res.momentList
        });
      },
      function (res) {
        console.info("获取数据失败");
      },
    )
  },

  //Bar切换
  clickButton: function (e) {
    switch (e.target.dataset.num) {
      case "0":
        this.setData({
          isRecommendChecked: true,
          isNewestChecked: false,
          isAttentionChecked: false,
          currentItem: 0
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
  },
})