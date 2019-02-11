const app = getApp()

Page({

  data: {
    date: '2016-09-01'
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },


})

