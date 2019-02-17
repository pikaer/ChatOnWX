const app = getApp()

Page({
  data: {
    placeRegion: ['广东省', '广州市', '海珠区'],
    homeTownRegion: ['广东省', '广州市', '海珠区'],
    schoolTypeArray: ['其他', '学院/大学', '一本', '211/985/海外院校'],
    tempUserInfo: {
      "gender": 1,
      "nickName": "Hello",
      "birthDate": "2016-09-07",
      "province": "海南省",
      "city": "三亚市",
      "area": "海珠区",
      "homeProvince": "海南省",
      "homeCity": "三亚市",
      "homeArea": "海珠区",
      "schoolName": "上海大学123",
      "entranceDate": "2017-12",
      "schoolType": 1,
      "liveState": 2,
      "mobile": "18721019895ew",
      "weChatNo": "xiamu13122028ew"
    }
  },
  onShow: function () {
    this.getUserInfoAPI();
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
            let userInfoAPI= 'app.globalData.userInfoAPI';
            let gender = 'tempUserInfo.gender';
            let nickName = 'tempUserInfo.nickName';
            let birthDate = 'tempUserInfo.birthDate';
            let province = 'tempUserInfo.province';
            let city = 'tempUserInfo.city';
            let area = 'tempUserInfo.area';
            let homeProvince = 'tempUserInfo.homeProvince';
            let homeCity = 'tempUserInfo.homeCity';
            let homeArea = 'tempUserInfo.homeArea';
            let schoolName = 'tempUserInfo.schoolName';
            let entranceDate = 'tempUserInfo.entranceDate';
            let schoolType = 'tempUserInfo.schoolType';
            let liveState = 'tempUserInfo.liveState';
            let mobile = 'tempUserInfo.mobile';
            let weChatNo = 'tempUserInfo.weChatNo';
            self.setData({
              [gender] :content.gender,
              [nickName]: content.nickName,
              [birthDate]: content.birthDate,
              [province]: content.province,
              [city]: content.city,
              [area]: content.area,
              [homeProvince]: content.homeProvince,
              [homeArea]: content.homeArea,
              [schoolName]: content.schoolName,
              [entranceDate]: content.entranceDate,
              [schoolType]: content.schoolType,
              [liveState]: content.liveState,
              [mobile]: content.mobile,
              [weChatNo]: content.weChatNo,
            })

            //所在地下拉框默认值
            placeRegion[0]= content.province;
            placeRegion[1] = content.city;
            placeRegion[2] = content.area;

            //家乡所在地下拉框默认值
            homeTownRegion[0] = content.homeProvince;
            homeTownRegion[1] = content.homeCity;
            homeTownRegion[2] = content.homeArea;

            app.globalData.userInfoAPI = content;
          }
        },
        fail: function (res) { console.error("获取用户信息失败!") }
      })
    }
  },

  //保存用户信息
  updateUserInfo: function () {
    let self = this;
    let tempUserInfo = this.data.tempUserInfo;
    if (app.globalData.apiHeader.UId > 0) {
      wx.request({
        url: app.globalData.baseUrl + 'api/UserInfo/UpdateUserInfo',
        method: "POST",
        header: app.globalData.httpHeader,
        data: {
          "Head": app.globalData.apiHeader,
          "Content": { 
            "UId": app.globalData.apiHeader.UId,
            "Gender": tempUserInfo.gender,
            "NickName": tempUserInfo.nickName,
            "BirthDate": tempUserInfo.birthDate,
            "Province": tempUserInfo.province,
            "City": tempUserInfo.city,
            "Area": tempUserInfo.area,
            "HomeProvince": tempUserInfo.homeProvince,
            "HomeCity": tempUserInfo.homeCity,
            "HomeArea": tempUserInfo.homeArea,
            "SchoolName": tempUserInfo.schoolName,
            "EntranceDate": tempUserInfo.entranceDate,
            "SchoolType": tempUserInfo.schoolType,
            "LiveState": tempUserInfo.liveState,
            "Mobile": tempUserInfo.mobile,
            "WeChatNo": tempUserInfo.weChatNo,
           }
        },
        success: function (res) {
          if (res.data.head.success && res.data.content != null && res.data.content.excuteResult) {
            console.info("修改用户信息成功") 
          }
        },
        fail: function (res) { console.error("修改用户信息失败!") }
      })
    }
  },

  //页面下拉刷新监听
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  //生日下拉列表框
  bindBirthDayChange: function (e) {
    let birth ='tempUserInfo.birthDate';
    this.setData({
      [birth]: e.detail.value
    })
  },

  //入学时间下拉列表
  bindEntranceDateChange: function (e) {
    let entrance = 'tempUserInfo.entranceDate';
    this.setData({
      [entrance]: e.detail.value
    })
  },

  //所在地监听变化
  bindPlaceRegionChange: function (e) {
    let province = 'tempUserInfo.province';
    let city = 'tempUserInfo.city';
    let area = 'tempUserInfo.area';
    this.setData({
      [province]: e.detail.value[0],
      [city]: e.detail.value[1],
      [area]: e.detail.value[2],
    })
  },

  //家乡所在地监听变化
  bindHomeTownRegionChange: function (e) {
    let homeProvince = 'tempUserInfo.homeProvince';
    let homeCity = 'tempUserInfo.homeCity';
    let homeArea = 'tempUserInfo.homeArea';
    this.setData({
      [homeProvince]: e.detail.value[0],
      [homeCity]: e.detail.value[1],
      [homeArea]: e.detail.value[2],
    })
  },

  //学校类型下拉列表
  bindSchoolTypeChange: function (e) {
    let schoolType = 'tempUserInfo.schoolType';
    this.setData({
      [schoolType]: e.detail.value
    })
  }
})

