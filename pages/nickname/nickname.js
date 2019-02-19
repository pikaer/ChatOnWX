Page({

  data:{
    tempNickName:""
  },

  onLoad: function (options){
    let temp ="tempNickName";
    this.setData({
      [temp]:options.nickName
    })
  },
  //获取用户输入的用户名
  nickNameInput: function (e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    let nickName = 'tempUserInfo.nickName';
    prevPage.setData({
      [nickName]: e.detail.value,
    })
  },

  //保存并返回上一级页面。
  updateNickName:function() {
    wx.navigateBack({
      delta: 1  
    })
  },
})
