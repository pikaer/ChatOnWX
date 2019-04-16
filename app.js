App({
  //全局变量
  globalData: {
		baseUrl: "https://39.97.187.180/",
		//baseUrl: "https://chatapi.pikaer.com/",
		//baseUrl: "http://192.168.137.1:8899/",
		// baseUrl: "https://localhost:44304/",
		
		myAppid: "wx1d0224e0b787c008",
		mySecret: "ed6edc516373c675ce9bd46e5f2e7fbd", //小程序密钥
    httpHeader: {
      "Content-Type": "application/json"
    },
    apiHeader: {
      "Token": "",
      "UId": 1,
      "Platform": "miniApp"
    },
    openid: "",
    session_key: "",
    userInfoWX: {}, //微信提供的用户信息
    userInfoAPI: {} //从API获取的用户信息
  },

  //弹框
  saveToast: function(success) {
    let title = success ? "保存成功" : "保存失败";
    let img = success ? "" : "../../content/images/warn.png"
    wx.showToast({
      title: title,
      icon: 'success',
      image: img,
      duration: 1000
    })
  },

  /**
   * HttpPost请求封装
   * @param 请求相对地址 
   * @param 请求体数据
   * @param 请求成功回调函数
   * @param 请求失败回调函数
   */
  httpPost: function(url,content,successFunc,failFunc) {
    wx.request({
      url: this.globalData.baseUrl + url,
      method: "POST",
      data: {
        "Head": this.globalData.apiHeader,
        "Content":content
      },
      header: this.globalData.httpHeader,
      success: function(res) {
        if (res.data.head.success) {
          //console.info("*******"+url+"成功获取数据*******" + JSON.stringify(res.data.content));
          return typeof successFunc == "function" && successFunc(res.data.content);
        } else {
          console.warn("*******"+url+"请求返回失败*******" + JSON.stringify(res.data));
          return typeof failFunc == "function" && failFunc(res.data)
        }
      },
      fail: function(res) {
        console.error("*******"+url+"请求响应失败*******" + JSON.stringify(res));
        return typeof failFunc == "function" && failFunc(res)
      }
    })
  }
})