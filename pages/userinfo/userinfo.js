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
  onShow: function () {
    this.getUserInfoAPI();
  },

  //获取用户信息
  getUserInfoAPI: function () {
    let self = this;
    let userInfo = app.globalData.userInfoWX
    userInfo.openid = app.globalData.openid;
    wx.request({
      url: this.globalData.baseUrl + 'api/UserInfo/GetUserInfo',
      method: "POST",
      data: {
        "Head": app.globalData.apiHeader,
        "Content": { "UId": app.globalData.apiHeader.UId}
      },
      header: app.globalData.httpHeader,
      success: function (res) {
        if (res.Head.Success && res.Content!=null){
          let content = res.Content;
          app.globalData.userInfoAPI = content;
          self.data.birthDay = content.BirthDate;
          self.data.entranceDate = content.EntranceDate;
          self.data.homeRegion[0] = content.Province;
          self.data.homeRegion[1] = content.City;
          self.data.homeRegion[2] = content.Area;
          self.data.homeTownRegion[0] = content.HomeProvince;
          self.data.homeTownRegion[1] = content.HomeCity;
          self.data.homeTownRegion[2] = content.HomeArea;
          self.data.schoolIndex = content.SchoolType;
        }
      },
      fail: function (res) { console.error("获取用户信息失败!") }
    })
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

