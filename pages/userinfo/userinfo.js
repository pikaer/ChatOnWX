const app = getApp()

Page({

  data: {
    birthDay: '2016-09-2',
    entranceDate: '2016-09',
    homeRegion: ['广东省', '广州市', '海珠区'],
    homeTownRegion: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    schoolTypeArray: ['其他','学院/大学', '一本', '211/985/海外院校'],
    schoolIndex: 0,
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  
  bindBirthDayChange: function (e) {
    this.setData({
      birthDay: e.detail.value
    })
  },

  bindEntranceDateChange: function (e) {
    this.setData({
      entranceDate: e.detail.value
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
  },
  bindSchoolTypeChange: function (e) {
    this.setData({
      schoolIndex: e.detail.value
    })
  }
  
})

