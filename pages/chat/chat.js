//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    chatList:{}
  },
  onLoad: function () {

    var that = this;
    //获取聊天列表
    wx.request({
      url: app.data.baseUrl + 'api/Chat/GetChatList',
      method: "POST",
      data:{
        "Head": {
          "Token": "",
          "AppType": 0
        },
        "Content": { 
          "UserId": 1
      }},
      header: {"Content-Type": "application/json"},
      success: function (res) {
        that.setData({
          chatList: res.data.content
        })
        
      },
      fail: function (res) {console.log("获取聊天列表失败"); }
    })

  }
})

