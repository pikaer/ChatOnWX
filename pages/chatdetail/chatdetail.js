
const app = getApp()

Page({
  data: {
    chatContentList: [],
    hidden: true,
    scrollTop: 0,
    scrollHeight: 400,
    nickName:"",
    userId:0
  },

  onLoad(opts) {
    // 设置导航栏为对应导航
    wx.setNavigationBarTitle({title: opts.nickName != '' ? opts.nickName : '' }),
      this.setData({ nickName: opts.nickName, userId: opts.userId})
  },

  onShow: function () {
  },

})


