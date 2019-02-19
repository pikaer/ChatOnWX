Page({

  data: {
    tempMobile: ""
  },

  onLoad: function (options) {
    let temp = "tempMobile";
    this.setData({
      [temp]: options.mobile
    })
  },

  //获取用户输入的手机号
  mobileInput: function (e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    let mobile = 'tempUserInfo.mobile';
    prevPage.setData({
      [mobile]: e.detail.value,
    })
  },

  //保存并返回上一级页面。
  updateMobile: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})