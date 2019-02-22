// pages/coindetail/coindetail.js
var dataList = [{
    "id": 1,
    "name": "AAA",
    "count": "-66",
    "data": "2019-02-13"
  },
  {
    "id": 2,
    "name": "BBB",
    "count": "+88",
    "data": "2019-02-13"
  },
  {
    "id": 3,
    "name": "CCC",
    "count": "-100",
    "data": "2019-02-13"
  },
  {
    "id": 4,
    "name": "DDD",
    "count": "+23",
    "data": "2019-02-13"
  },
  {
    "id": 5,
    "name": "EEE",
    "count": "+100",
    "data": "2019-02-14"
  },
  {
    "id": 6,
    "name": "FFF",
    "count": "-77",
    "data": "2019-02-15"
  },
  {
    "id": 7,
    "name": "GGG",
    "count": "+120",
    "data": "2019-02-15"
  }
];
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */

  data: {
    isAllChecked: true,
    isIncomeChecked: false,
    isExpendChecked: false,
    allData:[],
    coinDetails: []
  },

  clickButton: function(e) {
    let temp = this.data.allData;
    switch (e.target.dataset.num) {
      case "1":
        this.setData({
          isAllChecked: true,
          isIncomeChecked: false,
          isExpendChecked: false,
          coinDetails: temp
        })
        break;
      case "2":
        this.setData({
          isAllChecked: false,
          isIncomeChecked: true,
          isExpendChecked: false,
          coinDetails: temp.filter(function(e) {
            return parseInt(e.alertCoinNum) > 0;
          })
        })
        break;
      case "3":
        this.setData({
          isAllChecked: false,
          isIncomeChecked: false,
          isExpendChecked: true,
          coinDetails: temp.filter(function(e) {
            return parseInt(e.alertCoinNum) < 0;
          })
        })
        break;
    }
  },

  getGoldCoinDetails: function() {
    let self = this;
    wx.request({
      url: app.globalData.baseUrl + 'api/GoldCoin/GetGoldCoinDetails',
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
          console.info("获取金币详情成功！")
          self.setData({
            allData: res.data.content.goldCoinDetaislList,
            coinDetails: res.data.content.goldCoinDetaislList
          });
        } else {
          console.error("获取聊天列表失败！");
        }
        wx.stopPullDownRefresh();
      },
      fail: function(res) {
        console.error("获取聊天列表失败！");
        wx.stopPullDownRefresh();
      }
    })
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
    this.getGoldCoinDetails();
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
    this.getGoldCoinDetails();
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