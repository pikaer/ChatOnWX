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
      partnerId:7 //opts.partnerUId
    });

    //webSocket连接
    let partnerUId = 7;//opts.partnerUId;
    this.hubConnect = new Hub.HubConnection();
    var url=app.globalData.baseUrl + "onChat";
    this.hubConnect.start(url, { UId: app.globalData.apiHeader.UId, PartnerUId: partnerUId});
    this.hubConnect.onOpen = res => {
      console.info("成功开启连接");
    };


    //订阅对方发来的消息
    this.hubConnect.on("receive", res => {
      console.info(res);
    })
  },

  //卸载页面事件
  onUnload: function () {
    this.hubConnect.close({UId: app.globalData.apiHeader.UId})
    console.info("断开与用户Id=" + this.data.partnerId + "的用户的websocket连接");
  },

  //下拉刷新页面数据
  onPullDownRefresh: function () {
    //获取聊天数据结束后，停止刷新下拉
    this.getChatContentList();
    wx.stopPullDownRefresh();
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
  insertMessage: function () {
    let self = this;
    if (app.globalData.apiHeader.UId > 0) {
      wx.request({
        url: app.globalData.baseUrl + 'api/Chat/SendMessage',
        method: "POST",
        data: {
          "Head": app.globalData.apiHeader,
          "Content": {
            "UId": app.globalData.apiHeader.UId,
            "PartnerUId":self.data.partnerId,
            "ChatContent": self.data.chatContent,
            "ChatContentType": 0,
            "ExtensionInfo": ""
          }
        },
        header: app.globalData.httpHeader,
        success: function (res) {
          if (res.data.head.success && res.data.content != null && res.data.content.isExecuteSuccess) {
            console.info("消息内容插入到数据库成功！");

            self.setData({
              chatContent: ""
            });

            self.getChatContentList();

            self.sendMessage();
          } else {
            console.error("消息内容插入到数据库失败！");
          }
        },
        fail: function (res) {
          console.error("消息内容插入到数据库Http失败！");
        }
      })
    } else {
      console.info("消息内容插入到数据库Http失败！")
    }
  },

  //通知对方刷新聊天页面
  sendMessage: function () {
    this.hubConnect.send("subScribeMessage", app.globalData.apiHeader.UId,this.data.partnerId);
  },

  //获取输入的聊天内容
  chatContentInput: function(e) {
    this.setData({
      chatContent: e.detail.value
    })
  },
})