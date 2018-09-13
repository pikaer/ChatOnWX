//app.js
App({
  data: {
    // baseUrl: "https://mirzrv2.rongzi.com/", https://localhost:44304/Resource/headphoto/pikaer.jpg
    baseUrl: "https://localhost:44304/",
    openid: null
  },
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        console.log(JSON.stringify(res.data));
        if (res.code) {

      }
      }
    }),

      

 //   wx.request({
 //     url: this.data.baseUrl + 'api/UserInfo/SetUserInfo',
 //     method: "POST",
 //     data: {
 //       "Head": {
 //        "Token": "",
 //         "AppType": 0
 //       },
 //       "Content": {
 //         "openId": "215",
 //         "nickName": "215",
 //         "gender": 2,
 //         "city": "215",
 //         "province": "215",
 //         "country": "215",
 //        "avatarUrl": "215",
 //         "language": "215"
 //       }},
 //     header: {"Content-Type": "application/json" },
 //     success: function (res) { console.log(JSON.stringify(res.data)); },
 //     fail: function (res) {}
 //   }),

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(JSON.stringify(res.data));
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})