const app = getApp()
var Hub = require("../utils/signalR.js")

Page({
  data: {
    chatContentList: [],
    partnerNnickName: "",
    partnerId: 0,
    chatContent: "",
    partnerHeadImgPath: "",
    ownerHeadImgPath: ""
  },

  onLoad(opts) {
    // 设置导航栏为对应导航
    wx.setNavigationBarTitle({
      title: opts.nickName != '' ? opts.nickName : ''
    });
    this.setData({
      partnerNnickName: opts.nickName,
      partnerId: opts.partnerUId
    })

    // this.hubConnect = new Hub.HubConnection();
    // this.hubConnect.start(app.globalData.baseUrl+"chat", {UserId: 1});
    // this.hubConnect.onOpen = res => {
    //   console.log("成功开启连接")
    // }
  },

  //下拉刷新页面数据
  onPullDownRefresh: function () {
    //获取聊天数据结束后，停止刷新下拉
    wx.stopPullDownRefresh();
  },

  //卸载页面事件
  onUnload: function() {
    this.hubConnect.close({
      reason: "退出"
    })
    console.log("断开与用户Id=" + this.data.partnerId + "的用户的websocket连接")
  },

  //每次加载页面事件
  onShow: function() {
    this.getChatContentList();
  },

  //获取聊天内容
  getChatContentList: function() {
    var self = this;
    wx.request({
      url: app.globalData.baseUrl + 'api/Chat/GetChatContentList',
      method: "POST",
      data: {
        "Head": app.globalData.apiHeader,
        "Content": {
          "UId": app.globalData.apiHeader.UId,
          "PartnerUId": this.data.partnerId
        }
      },
      header: app.globalData.httpHeader,
      success: function(res) {
        if (res.data.head.success) {
          console.info("获取聊天内容列表成功！")
          self.setData({
            chatContentList: res.data.content.chatContentList
          });
        } else {
          console.error("获取聊天内容列表失败！");
        }
      },
      fail: function(res) {
        console.error("获取聊天内容列表失败！");
      }
    })
  },

  //插入数据库并通知对方刷新页面
  sendMessage: function(event) {
    let id = event.currentTarget.dataset.idx;
    console.log("伙伴Id=" + id);
    if (id != undefined && id > 0) {
      wx.request({
        url: app.globalData.baseUrl + 'api/Chat/PublishMessage',
        method: "POST",
        data: {
          "Head": {
            "Token": "",
            "AppType": 0
          },
          "Content": {
            "UserId": 1, //app.globalData.userInfoAPI.userId,
            "PartnerId": this.data.partnerId,
            "ChatContent": this.data.chatContent
          }
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function(res) {
          if (res.data.head.success) {
            console.info("存入聊天内容到数据库成功")
            getChatContentList();

            //通知对方刷新数据
            this.hubConnect.send("subScribeMessage", "message");
          } else {
            console.error("存入聊天内容到数据库失败！");
          }
        },
        fail: function(res) {
          console.error("存入聊天内容到数据库失败！");
        }
      })
    }
  },

  //获取输入的聊天内容
  chatContentInput: function(e) {
    this.setData({
      chatContent: e.detail.value
    })
  },
})