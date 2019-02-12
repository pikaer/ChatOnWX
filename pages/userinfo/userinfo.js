const app = getApp()

Page({

  data: {
    date: '2016-09-01',
    homeRegion: ['广东省', '广州市', '海珠区'],
    homeTownRegion: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindHomeRegionChange: function (e) {
    this.setData({
      homeRegion: e.detail.value
    })
  },
  bindHomeTownRegionChange: function (e) {
    this.setData({
      homeTownRegion: e.detail.value
    })
  }
})

