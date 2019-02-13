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

  //页面下拉刷新监听
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  
  //生日下拉列表框
  bindBirthDayChange: function (e) {
    this.setData({
      birthDay: e.detail.value
    })
  },

  //入学时间下拉列表
  bindEntranceDateChange: function (e) {
    this.setData({
      entranceDate: e.detail.value
    })
  },

  //所在地监听变化
  bindHomeRegionChange: function (e) {
    this.setData({
      homeRegion: e.detail.value
    })
  },

  //家乡所在地监听变化
  bindHomeTownRegionChange: function (e) {
    this.setData({
      homeTownRegion: e.detail.value
    })
  },

  //学校类型下拉列表
  bindSchoolTypeChange: function (e) {
    this.setData({
      schoolIndex: e.detail.value
    })
  }
  
})

