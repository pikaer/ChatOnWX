// pages/coindetail/coindetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isAllChecked: true,
    isIncomeChecked:false,
    isExpendChecked:false,
    name: 'AAA',
    count: -66,
    data: '2019-02-13',
    allData: [
      { name: 'AAA', count: -66, data: '2019-02-13' },
      { name: 'BBB', count: -66, data: '2019-02-13' },
      { name: 'CCC', count: -66, data: '2019-02-13' },
      { name: 'DDD', count: -66, data: '2019-02-13' }
      ]    
  },

  clickButton: function(e){
    switch (e.target.dataset.num)
    {
      case "1":  
        this.setData({
          isAllChecked: true,
          isIncomeChecked: false,
          isExpendChecked: false
        })      
        break;
      case "2":
        this.setData({
          isAllChecked: false,
          isIncomeChecked: true,
          isExpendChecked: false
        })
        break;
      case "3":
        this.setData({
          isAllChecked: false,
          isIncomeChecked: false,
          isExpendChecked: true
        })
        break;      
    }    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})