// pages/wallet/wallet.js
var typeList = [{
    "id": 1,
    "goldCoin": "36",
    "moneyNum": "6.0元"
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

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goldCoinCount: -1,
    showModalStatus: false,
    list: typeList
  },
  recharge: function() {
    this.showModal()
  },
  /**
   * 显示遮罩层
   */
  showModal: function() {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  hideModal: function() {
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
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  getGoldCoinCount: function() {
    let self = this;
    wx.request({
      url: app.globalData.baseUrl + 'api/GoldCoin/GetGoldCoinNumber',
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
          console.info("获取用户金币成功!")
          self.setData({
            goldCoinCount: res.data.content.totalCoin
          })
        }
        wx.stopPullDownRefresh();
      },
      fail: function(res) {
        console.error("获取用户金币信息失败!");
        self.setData({
          goldCoinCount: -1
        })
        wx.stopPullDownRefresh();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getGoldCoinCount();
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
    this.getGoldCoinCount();
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