//获取应用实例
const app = getApp()

Page({

  data: {
    tempChatList: [],
    totalUnReadCount: "",
    actionHidden: true,
    selectItem: []
  },

  onShow: function() {
    //this.getChatList();
  },

  onLoad: function() {
    this.getChatList();
  },

  //下拉刷新页面数据
  onPullDownRefresh: function() {
    this.getChatList();
  },

  //获取用户数据
  getChatList: function() {
    let self = this;
    if (app.globalData.apiHeader.UId > 0) {
      wx.request({
        url: app.globalData.baseUrl + 'api/Chat/GetChatList',
        method: "POST",
        data: {
          "Head": app.globalData.apiHeader,
          "Content": {
            "UId": app.globalData.apiHeader.UId
          }
        },
        header: app.globalData.httpHeader,
        success: function(res) {
          if (res.data.head.success && res.data.content != null) {
            console.info("获取聊天列表成功！")

            if (res.data.content.chatList == null || res.data.content.chatList.length == 0) {
              console.info("聊天列表没有数据！")
              return;
            }
            self.setData({
              tempChatList: res.data.content.chatList
            });
          } else {
            console.error("获取聊天列表失败！");
          }
          //获取聊天数据结束后，停止刷新下拉
          wx.stopPullDownRefresh();
        },
        fail: function(res) {
          console.error("获取聊天列表失败！");
          //获取聊天数据结束后，停止刷新下拉
          wx.stopPullDownRefresh();
        }
      })
    } else {
      console.info("获取用户信息失败！")
      return true;
    }
  },

  //获取用户数据
  clearUnReadCount: function(ops) {
    let self = this;
    let partnerId = ops.currentTarget.dataset.idx;
    let index = ops.currentTarget.dataset.key;
    if (app.globalData.apiHeader.UId > 0) {
      wx.request({
        url: app.globalData.baseUrl + 'api/Chat/ClearUnReadCount',
        method: "POST",
        data: {
          "Head": app.globalData.apiHeader,
          "Content": {
            "UId": app.globalData.apiHeader.UId,
            "PartnerUId": partnerId
          }
        },
        header: app.globalData.httpHeader,
        success: function(res) {
          if (res.data.head.success && res.data.content != null && res.data.content.isExecuteSuccess) {
            console.info("清除未读消息成功！")

            self.data.tempChatList[index].unReadCount = '';
            self.setData({
              tempChatList: self.data.tempChatList,
              totalUnReadCount: res.data.content.currentTotalUnReadCount
            })
          } else {
            console.error("清除未读消息服务器返回失败！");
          }
        },
        fail: function(res) {
          console.error("清除未读消息Http失败！");
        }
      })
    } else {
      console.info("清除未读消息Http失败！")
      return true;
    }
  },

  //长按删除对话弹框
  deleteItem: function(ops) {
    this.setData({
      actionHidden: false,
      selectItem: ops.currentTarget.dataset
    })
  },

  //重置长按选择项
  resetSelectItem: function() {
    this.setData({
      actionHidden: true,
      selectItem: []
    })
  },

  //删除对话
  deleteChat: function() {
    let self = this;
    let partnerId = this.data.selectItem.idx;
    let index = this.data.selectItem.key;

    if (app.globalData.apiHeader.UId > 0) {
      wx.request({
        url: app.globalData.baseUrl + 'api/Chat/DeleteChat',
        method: "POST",
        data: {
          "Head": app.globalData.apiHeader,
          "Content": {
            "UId": app.globalData.apiHeader.UId,
            "PartnerUId": partnerId
          }
        },
        header: app.globalData.httpHeader,
        success: function(res) {
          if (res.data.head.success && res.data.content != null && res.data.content.isExecuteSuccess) {
            console.info("删除对话成功！");

            let list = self.data.tempChatList;
            list.splice(index, 1);
            self.setData({
              tempChatList: list,
              totalUnReadCount: res.data.content.currentTotalUnReadCount
            });
          } else {
            console.error("删除对话服务器返回失败！");
          }

          //重置数据
          self.resetSelectItem();
        },
        fail: function(res) {
          console.error("删除对话Http失败！");
          self.resetSelectItem();
        }
      })
    } else {
      console.info("删除对话Http失败！")
      self.resetSelectItem();
      return true;
    }
  }
})