//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isRecommendChecked: true,
    isNewestChecked: false,
    isAttentionChecked: false,
    currentItem:1
  },

  clickButton: function(e) {
    let temp = this.data.allData;
    switch (e.target.dataset.num) {
      case "1":
        this.setData({
          isRecommendChecked: true,
          isNewestChecked: false,
          isAttentionChecked: false,
          currentItem:1
        })
        break;
      case "2":
        this.setData({
          isRecommendChecked: false,
          isNewestChecked: true,
          isAttentionChecked: false,
          currentItem: 2
        })
        break;
      case "3":
        this.setData({
          isRecommendChecked: false,
          isNewestChecked: false,
          isAttentionChecked: true,
          currentItem: 3
        })
        break;
    }
  },
})