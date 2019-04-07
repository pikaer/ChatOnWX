const app = getApp()
var hub = require("../utils/signalR.js")
var util = require("../utils/util.js")

Page({
  data: {
    chatContentList: [],
    partnerNickName: "",
    partnerId: 0,
    chatContent: "",
    partnerHeadImgPath: "",
    ownerHeadImgPath: "",
    scrollTop: 0,
    pageIndex: 1,
    loadHide: true,
  },

  //滑动到底部
  toBottom: function() {
    this.setData({
      scrollTop: 100000
    })
  },

  //触顶加载跟多
  loadMoreData: function() {
    let page = this.data.pageIndex + 1;
    this.setData({
      loadHide: false,
      pageIndex: page
    });

    let self = this;

    //loading动画加载1.5秒后执行
    setTimeout(function() {
      self.getChatContentList(false);
    }, 1500)

  },

  onLoad: function(opts) {
    // 设置导航栏为对应导航
    wx.setNavigationBarTitle({
      title: opts.nickName != '' ? opts.nickName : ''
    });
    this.setData({
      partnerNickName: opts.nickName,
      partnerId: 7 //opts.partnerUId
    });

    //webSocket连接
    let partnerUId = 7; //opts.partnerUId;
    this.hubConnect = new hub.HubConnection();
    var url = app.globalData.baseUrl + "onChat";
    this.hubConnect.start(url, {
      UId: app.globalData.apiHeader.UId,
      PartnerUId: partnerUId
    });
    this.hubConnect.onOpen = res => {
      console.info("成功开启连接");
    };


    //订阅对方发来的消息
    this.hubConnect.on("receive", res => {
      console.info(res.partnerUId);
      this.getChatContentList(false);
    })
  },

  //卸载页面事件
  onUnload: function() {
    this.hubConnect.close({
      UId: app.globalData.apiHeader.UId
    })
    console.info("断开与用户Id=" + this.data.partnerId + "的用户的websocket连接");
  },

  //每次加载页面事件
  onShow: function() {
    this.getChatContentList(true);
  },

  //获取聊天内容
  getChatContentList: function(needToBottom) {
    var self = this;
    app.httpPost(
      'api/Chat/GetChatContentList', {
        "UId": app.globalData.apiHeader.UId,
        "PartnerUId": this.data.partnerId,
        "PageIndex": this.data.pageIndex
      },
      function(res) {
        console.info("获取聊天内容列表成功！")
        self.setData({
          loadHide: true,
          chatContentList: res.chatContentList
        });

        if (needToBottom) {
          self.toBottom();
        }
      },
      function(res) {
        console.error("获取聊天内容列表失败！");
        if (needToBottom) {
          self.toBottom();
        }
      })
  },

  //插入数据库并通知对方刷新页面
  insertMessage: function() {
    let self = this;
    if (app.globalData.apiHeader.UId > 0 && !util.isBlank(self.data.chatContent)) {
      app.httpPost(
        'api/Chat/SendMessage', {
          "UId": app.globalData.apiHeader.UId,
          "PartnerUId": self.data.partnerId,
          "ChatContent": self.data.chatContent,
          "ChatContentType": 0,
          "ExtensionInfo": ""
        },
        function(res) {
          console.info("消息内容插入到数据库成功！");
          self.setData({
            chatContent: ""
          });

          self.getChatContentList(true);
          self.sendMessage();
        },
        function(res) {
          console.error("消息内容插入到数据库Http失败！");
        })
    } else {
      console.info("消息内容插入到数据库Http失败！")
    }
  },

  //通知对方刷新聊天页面
  sendMessage: function() {
    this.hubConnect.send("subScribeMessage", app.globalData.apiHeader.UId, this.data.partnerId);
  },

  //获取输入的聊天内容
  chatContentInput: function(e) {
    this.setData({
      chatContent: e.detail.value
    })
  },
})