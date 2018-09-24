
const app = getApp()

Page({
  data: {
    chatContentList: [],
    partnerNnickName:"",
    partnerId:0
  },

  onLoad(opts) {
    // 设置导航栏为对应导航
    wx.setNavigationBarTitle({title: opts.nickName != '' ? opts.nickName : '' }),
      this.setData({ partnerNnickName: opts.nickName, partnerId: opts.userId})
   
  },

  onShow: function () {
    this.getChatContentList();
  },

  //获取聊天内容
  getChatContentList: function () {
    var self = this;
    wx.request({
      url: app.globalData.baseUrl + 'api/Chat/GetChatContentList',
      method: "POST",
      data: {
        "Head": { "Token": "", "AppType": 0 },
        "Content": {
          "UserId": 1,//app.globalData.userInfoAPI.userId,
          "PartnerId": this.data.partnerId
        }
      },
      header: { "Content-Type": "application/json" },
      success: function (res) {
        if (res.data.head.success) {
          console.info("获取聊天内容列表成功！")
          self.setData({ chatContentList: res.data.content });
        }
        else { console.error("获取聊天内容列表失败！"); }
      },
      fail: function (res) { console.error("获取聊天内容列表失败！"); }
    })
  },
})


