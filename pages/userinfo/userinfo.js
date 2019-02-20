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
      "schoolName": "上海大学",
      "entranceDate": "2017-12",
      "schoolType": 1,
      "liveState": 2,
      "mobile": "18721019895",
      "weChatNo": "xiamu13122028"
    }
  },
  onLoad: function () {
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
            console.info("获取用户信息成功");
            let content = res.data.content;
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

            var placeRegion0 = "placeRegion[" + 0 + "]";
            var placeRegion1 = "placeRegion[" + 1 + "]";
            var placeRegion2 = "placeRegion[" + 2 + "]";
            var homeTownRegion0 = "homeTownRegion[" + 0 + "]";
            var homeTownRegion1 = "homeTownRegion[" + 1 + "]";
            var homeTownRegion2 = "homeTownRegion[" + 2 + "]";

            self.setData({
              [gender]: content.gender,
              [nickName]: content.nickName,
              [birthDate]: content.birthDate,
              [province]: content.province,
              [city]: content.city,
              [area]: content.area,
              [homeProvince]: content.homeProvince,
              [homeCity]: content.homeCity,
              [homeArea]: content.homeArea,
              [schoolName]: content.schoolName,
              [entranceDate]: content.entranceDate,
              [schoolType]: content.schoolType,
              [liveState]: content.liveState,
              [mobile]: content.mobile,
              [weChatNo]: content.weChatNo,

              //所在地下拉框默认值
              [placeRegion0]: content.province,
              [placeRegion1]: content.city,
              [placeRegion2]: content.area,

              //家乡所在地下拉框默认值
              [homeTownRegion0]: content.homeProvince,
              [homeTownRegion1]: content.homeCity,
              [homeTownRegion2]: content.homeArea
            })
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
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000
            })
          }else{
            saveToast(false);
          }
        },
        fail: function (res) { 
          console.error("修改用户信息失败!")
          saveToast(false);
         }
      })
    }
  },

  saveToast:function(isSuccess){
    let title = isSuccess ? "保存成功" :"保存失败";
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1000
    })
  },
  //页面下拉刷新监听
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  //生日下拉列表框
  bindBirthDayChange: function (e) {
    let birth = 'tempUserInfo.birthDate';
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
    var placeRegion0 = "placeRegion[" + 0 + "]";
    var placeRegion1 = "placeRegion[" + 1 + "]";
    var placeRegion2 = "placeRegion[" + 2 + "]";
    this.setData({
      [province]: e.detail.value[0],
      [city]: e.detail.value[1],
      [area]: e.detail.value[2],
      [placeRegion0]: e.detail.value[0],
      [placeRegion1]: e.detail.value[1],
      [placeRegion2]: e.detail.value[2],
    })
  },

  //家乡所在地监听变化
  bindHomeTownRegionChange: function (e) {
    let homeProvince = 'tempUserInfo.homeProvince';
    let homeCity = 'tempUserInfo.homeCity';
    let homeArea = 'tempUserInfo.homeArea';
    var homeTownRegion0 = "homeTownRegion[" + 0 + "]";
    var homeTownRegion1 = "homeTownRegion[" + 1 + "]";
    var homeTownRegion2 = "homeTownRegion[" + 2 + "]";
    this.setData({
      [homeProvince]: e.detail.value[0],
      [homeCity]: e.detail.value[1],
      [homeArea]: e.detail.value[2],
      [homeTownRegion0]: e.detail.value[0],
      [homeTownRegion1]: e.detail.value[1],
      [homeTownRegion2]: e.detail.value[2],
    })
  },

  //学校类型下拉列表
  bindSchoolTypeChange: function (e) {
    let schoolType = 'tempUserInfo.schoolType';
    this.setData({
      [schoolType]: e.detail.value
    })
  },

  //性别单选框值变动
  genderChange: function (e) {
    let gender = 'tempUserInfo.gender';
    this.setData({
      [gender]: e.detail.value
    })
  },

  //学籍状态单选框值变动
  liveStateChange: function (e) {
    let liveState = 'tempUserInfo.liveState';
    this.setData({
      [liveState]: e.detail.value
    })
  }
})

