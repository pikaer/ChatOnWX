Page({

  data: {
    tempWeChatNo: ""
  },

  onLoad: function (options) {
    let temp = "tempWeChatNo";
    this.setData({
      [temp]: options.weChatNo
    })
  },


  //获取用户输入的学习名
  weChatNoInput: function (e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    let weChatNo = 'tempUserInfo.weChatNo';
    prevPage.setData({
      [weChatNo]: e.detail.value,
    })
  },

  //保存并返回上一级页面。
  updateWeChatNo: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})