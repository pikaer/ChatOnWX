// pages/wallet/wallet.js
var typeList = [{
    "id": 1,
    "goldCoin": "36",
    "moneyNum":"6.0元"
  },
  {
    "id": 2,
    "goldCoin": "72",
    "moneyNum": "12.0元"
  },
  {
    "id": 3,
    "goldCoin": "108",
    "moneyNum": "18.0元"
  },
  {
    "id": 4,
    "goldCoin": "180",
    "moneyNum": "30.0元"
  }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    list: typeList
  },
  recharge:function(){
    this.showModal()
  },
  /**
   * 显示遮罩层
   */
  showModal:function(){
    var animation = wx.createAnimation({
      duration:200,
      timingFunction:"linear",
      delay:0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus:true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})