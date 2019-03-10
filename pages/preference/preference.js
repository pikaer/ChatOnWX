const app = getApp()

Page({
  data: {
    partnerPlaceArray: ['都可以', '同城优先', '同学校/母校优先'],
    partnerHomeArray: ['都可以', '同省优先', '同城优先'],
    ageArray: ['都可以', '12-18岁', '18-24岁', '24-30岁', '30-35岁', '35-45岁', '大于45岁'],
    schoolTypeArray: ['都可以', '其他', '学院/大学', '一本', '211/985/海外院校'],
    stateArray: ['都可以', '学生党', '工作党'],
    tempPreference: {
      "preferGender": 1,
      "preferPlace": 0,
      "preferHome": 0,
      "preferAge": 1,
      "preferSchoolType": 0,
      "preferLiveState": 0
    }
  },

  onLoad: function () {
    this.getUserPreference();
  },

  //获取用户信息
  getUserPreference: function () {
    let self = this;
    if (app.globalData.apiHeader.UId > 0) {
      wx.request({
        url: app.globalData.baseUrl + 'api/UserInfo/GetUserPreference',
        method: "POST",
        data: {
          "Head": app.globalData.apiHeader,
          "Content": {
            "UId": app.globalData.apiHeader.UId
          }
        },
        header: app.globalData.httpHeader,
        success: function (res) {
          if (res.data.head.success && res.data.content != null) {
            console.info("获取用户偏好设置成功");
            let content = res.data.content;
            let preferGender = 'tempPreference.preferGender';
            let preferPlace = 'tempPreference.preferPlace';
            let preferHome = 'tempPreference.preferHome';
            let preferAge = 'tempPreference.preferAge';
            let preferSchoolType = 'tempPreference.preferSchoolType';
            let preferLiveState = 'tempPreference.preferLiveState';

            self.setData({
              [preferGender]: content.preferGender,
              [preferPlace]: content.preferPlace,
              [preferHome]: content.preferHome,
              [preferAge]: content.preferAge,
              [preferSchoolType]: content.preferSchoolType,
              [preferLiveState]: content.preferLiveState
            })
          }
        },
        fail: function (res) {
          console.error("获取用户偏好设置失败!")
        }
      })
    }
  },


  //保存用户信息
  updateUserPreference: function () {
    let tempPreference = this.data.tempPreference;
    if (app.globalData.apiHeader.UId > 0) {
      wx.request({
        url: app.globalData.baseUrl + 'api/UserInfo/UpdateUserPreference',
        method: "POST",
        header: app.globalData.httpHeader,
        data: {
          "Head": app.globalData.apiHeader,
          "Content": {
            "UId": app.globalData.apiHeader.UId,
            "PreferGender": tempPreference.preferGender,
            "PreferPlace": tempPreference.preferPlace,
            "PreferHome": tempPreference.preferHome,
            "PreferAge": tempPreference.preferAge,
            "PreferSchoolType": tempPreference.preferSchoolType,
            "preferLiveState": tempPreference.preferLiveState
          }
        },
        success: function (res) {
          if (res.data.head.success && res.data.content != null && res.data.content.excuteResult) {
            console.info("保存成功")
            app.saveToast(true);
          } else {
            app.saveToast(false);
          }
        },
        fail: function (res) {
          console.error("修改用户信息失败!")
          app.saveToast(false);
        }
      })
    }
  },

  //性别单选框值变动
  genderChange: function (e) {
    let preferGender = 'tempPreference.preferGender';
    this.setData({
      [preferGender]: e.detail.value
    })
  },

  //对方所在位置下拉列表
  bindPartnerPlaceChange: function (e) {
    let preferPlace = 'tempPreference.preferPlace';
    this.setData({
      [preferPlace]: e.detail.value
    })
  },

  //对方所在家乡下拉列表
  bindPartnerHomeChange: function (e) {
    let preferHome = 'tempPreference.preferHome';
    this.setData({
      [preferHome]: e.detail.value
    })
  },

  //希望对方年龄下拉列表
  bindAgeChange: function (e) {
    let preferAge = 'tempPreference.preferAge';
    this.setData({
      [preferAge]: e.detail.value
    })
  },

  //学校类型下拉列表
  bindSchoolTypeChange: function (e) {
    let preferSchoolType = 'tempPreference.preferSchoolType';
    this.setData({
      [preferSchoolType]: e.detail.value
    })
  },

  //对方状态下拉列表
  bindStateChange: function (e) {
    let preferLiveState = 'tempPreference.preferLiveState';
    this.setData({
      [preferLiveState]: e.detail.value
    })
  }
})