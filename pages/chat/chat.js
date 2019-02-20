//获取应用实例
const app = getApp()

Page({

  data: {
    tempChatList: [],
    hidden:true
  },


  onShow: function () {
    this.getChatList();
  },

  getChatList: function () {
    let self = this;
    if (app.globalData.apiHeader.UId > 0) {
      wx.request({
        url: app.globalData.baseUrl + 'api/Chat/GetChatList',
        method: "POST",
        data: {
          "Head": app.globalData.apiHeader,
          "Content": { "UId": app.globalData.apiHeader.UId }
        },
        header: app.globalData.httpHeader,
        success: function (res) {
          if (res.data.head.success && res.data.content != null) {
            console.info("获取聊天列表成功！")

            if(res.data.content.chatList==null||res.data.content.chatList.length==0){
              console.info("聊天列表没有数据！")
              return;
            }
            self.setData({ tempChatList: res.data.content.chatList});
          }
          else {
            console.error("获取聊天列表失败！");
            self.setData({ hidden: true });
          }
        },
        fail: function (res) { console.error("获取聊天列表失败！"); }
      })
    }
    else { console.info("获取用户信息失败！") }
  }

})


