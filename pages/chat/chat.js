//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    chatList: {}
  },

  onShow: function () {
    this.getChatList()
  },

  //获取聊天列表
  getChatList: function () {
    let hasuserInfo = app.globalData.userInfoAPI.value == undefined;
    if (hasuserInfo)
    {
      var self = this;
      wx.request({
        url: app.globalData.baseUrl + 'api/Chat/GetChatList',
        method: "POST",
        data: {
          "Head": { "Token": "", "AppType": 0},
          "Content": { "UserId": 1 }
        },
        header: { "Content-Type": "application/json" },
        success: function (res) {
          self.setData({ chatList: res.data.content })
          console.info("获取聊天列表成功！")
        },
        fail: function (res) { console.error("获取聊天列表失败！"); }
      })
    }
    else {
      console.info("获取用户信息失败！")
    }
  },

  //清除未读提示
  clearunreadCount: function (event) {
    var self = this;
    let partnerId = event.currentTarget.dataset.idx; 
    let index = event.currentTarget.dataset.key;
    if (self.data.chatList[index].unreadCount !="")
    {
      wx.request({
        url: app.globalData.baseUrl + 'api/Chat/ClearUnRead',
        method: "POST",
        data: {
          "Head": { "Token": "", "AppType": 0 },
          "Content": {
            "UserId": 1,//app.globalData.userInfoAPI.userId,
            "PartnerId": partnerId
          }
        },
        header: { "Content-Type": "application/json" },
        success: function (res) {
          if (res.data.head.success && res.data.content)
            //self.data.chatList[index].unreadCount = '';
            console.info("清除未读消息数量成功");
          self.data.chatList[index].unreadCount = '';
          self.setData({ chatList: self.data.chatList })
        },
        fail: function (res) { console.error("清除未读消息数量失败！"); }
      })
    }
  },

})


