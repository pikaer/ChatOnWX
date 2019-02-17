const app = getApp()

Page({
  data: {
    birthDay: '2016-09-2',
    entranceDate: '2016-09',
    homeRegion: ['广东省', '广州市', '海珠区'],
    homeTownRegion: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    schoolTypeArray: ['其他', '学院/大学', '一本', '211/985/海外院校'],
    schoolIndex: 0,
    tempUserInfo: {
      "gender": 1,
      "nickName": "Hello",
      "birthDate": "2016-09-02",
      "province": "广东省",
      "city": "广州市",
      "area": "海珠区",
      "homeProvince": "广东省",
      "homeCity": "广州市",
      "homeArea": "海珠区",
      "schoolName": "上海大学",
      "entranceDate": "2017-09",
      "schoolType": 0,
      "liveState": 0,
      "mobile": "18721019895",
      "weChatNo": "xiamu13122028"
    }
  },
  onShow: function () {
    //this.getUserInfoAPI();
  },

  //获取用户信息
  getUserInfoAPI: function () {
    let self = this;
    if (app.globalData.apiHeader.UId > 0) {
      wx.request({
        url: app.globalData.baseUrl + 'api/UserInfo/GetUserInfo',
        method: "POST",
        data: {
          "Head": app.globalData.apiHeader,
          "Content": { "UId": app.globalData.apiHeader.UId }
        },
        header: app.globalData.httpHeader,
        success: function (res) {
          if (res.data.head.success && res.data.content != null) {
            let content = res.data.content;
            app.globalData.userInfoAPI = content;
            self.data.tempUserInfo.gender = content.gender;
            self.data.tempUserInfo.nickName = content.nickName;
            self.data.tempUserInfo.birthDate = content.birthDate;
            self.data.tempUserInfo.province = content.province;
            self.data.tempUserInfo.homeProvince = content.homeProvince;
            self.data.tempUserInfo.homeCity = content.homeCity;
            self.data.tempUserInfo.homeArea = content.homeArea;
            self.data.tempUserInfo.schoolName = content.schoolName;
            self.data.tempUserInfo.entranceDate = content.entranceDate;
            self.data.tempUserInfo.schoolType = content.schoolType;
            self.data.tempUserInfo.liveState = content.liveState;
            self.data.tempUserInfo.mobile = content.mobile;
            self.data.tempUserInfo.weChatNo = content.weChatNo;
          }
        },
        fail: function (res) { console.error("获取用户信息失败!") }
      })
    }
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

