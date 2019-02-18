App({
  //全局变量
  globalData: {
    baseUrl: "http://127.0.0.1:8899/",
    //baseUrl: "https://localhost:44304/",
    myAppid: "wx2198c700f25f79e8",
    mySecret: "fe423643c068c9827d8d8296e205a133",//小程序密钥
    httpHeader: { "Content-Type": "application/json" },
    apiHeader: { "Token": "", "UId": 0, "Platform": "miniApp" },
    openid: "",
    session_key: "",
    userInfoWX: {}, //微信提供的用户信息
    userInfoAPI: {} //从API获取的用户信息
  },

  //当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onShow: function () {
    this.userLogin();
  },

  //用户登录
  userLogin: function () {
    let self = this;
    wx.login({
      success: res => {
        console.log(JSON.stringify(res.data));
        if (res.code) {
          let reqUrl = "https://api.weixin.qq.com/sns/jscode2session?appid=" + this.globalData.myAppid + "&secret=" + this.globalData.mySecret + "&js_code=" + res.code + "&grant_type=authorization_code"
          wx.request({
            url: reqUrl,
            header: self.globalData.httpHeader,
            success: function (res) {
              console.log(res.data.openid) //获取openid
              self.globalData.openid = res.data.openid;
              self.globalData.session_key = res.data.session_key;
              self.getUserInfoWX();
            },
            fail: function (res) { console.error("获取用户openid失败!") }
          })
        }
      }
    })
  },

  //获取微信用户信息
  getUserInfoWX: function () {
    let self = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.info("获取微信用户信息成功!");
              // 可以将 res 发送给后台解码出 unionId
              self.globalData.userInfoWX = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回所以此处加入 callback 以防止这种情况
              if (self.userInfoReadyCallback) { self.userInfoReadyCallback(res) }
              self.setUserInfo();
            }
          })
        }
      }
    })
  },

  //存入用户信息
  setUserInfo: function () {
    let self = this;
    let userInfo = self.globalData.userInfoWX
    userInfo.openid = self.globalData.openid;
    wx.request({
      url: this.globalData.baseUrl + 'api/UserInfo/SetUserInfo',
      method: "POST",
      data: {
        "Head": self.globalData.apiHeader,
        "Content": {
          "OpenId": self.globalData.userInfoWX.openid,
          "NickName": self.globalData.userInfoWX.nickName,
          "Gender": self.globalData.userInfoWX.gender,
        }
      },
      header: self.globalData.httpHeader,
      success: function (res) {
        if (res.data.head.success && res.data.content.excuteResult)
          self.globalData.apiHeader.UId = res.data.content.uId;
      },
      fail: function (res) { console.error("存入用户信息失败!") }
    })
  },
})