// pages/coindetail/coindetail.js
var dataList = [{
    "id": 1,
    "name": "AAA",
    "count": -66,
    "data": "2019-02-13"
  },
  {
    "id": 2,
    "name": "BBB",
    "count": +88,
    "data": "2019-02-13"
  },
  {
    "id": 3,
    "name": "CCC",
    "count": -100,
    "data": "2019-02-13"
  },
  {
    "id": 4,
    "name": "DDD",
    "count": +23,
    "data": "2019-02-13"
  },
  {
    "id": 5,
    "name": "EEE",
    "count": +100,
    "data": "2019-02-14"
  },
  {
    "id": 6,
    "name": "FFF",
    "count": -77,
    "data": "2019-02-15"
  },
  {
    "id": 7,
    "name": "GGG",
    "count": +120,
    "data": "2019-02-15"
  }
];

Page({
  /**
   * 页面的初始数据
   */

  data: {
    isAllChecked: true,
    isIncomeChecked: false,
    isExpendChecked: false,
    allData: dataList
  },

  clickButton: function(e) {
    switch (e.target.dataset.num) {
      case "1":
        this.setData({
          isAllChecked: true,
          isIncomeChecked: false,
          isExpendChecked: false,
          allData: dataList
        })
        break;
      case "2":
        this.setData({
          isAllChecked: false,
          isIncomeChecked: true,
          isExpendChecked: false,
          allData: dataList.filter(function(e) {
            return e.count > 0;
          })
        })
        break;
      case "3":
        this.setData({
          isAllChecked: false,
          isIncomeChecked: false,
          isExpendChecked: true,
          allData: dataList.filter(function(e) {
            return e.count < 0;
          })
        })
        break;
    }
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