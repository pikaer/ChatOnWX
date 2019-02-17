Page({
  data: {
    partnerPlaceArray: ['都可以', '同城优先', '同学校/母校优先'],
    partnerHomeArray: ['都可以', '同省优先', '同城优先'],
    ageArray: ['都可以','12-18岁', '18-24岁', '24-30岁', '30-35岁', '35-45岁', '大于45岁'],
    schoolTypeArray: ['都可以', '其他', '学院/大学', '一本', '211/985/海外院校'],
    stateArray: ['都可以', '学生党', '工作党'],
    schoolIndex: 0,
    partnerHomeIndex: 0,
    partnerPlaceIndex: 0,
    ageIndex: 1,
    stateIndex: 0
  },

  //对方所在位置下拉列表
  bindPartnerPlaceChange: function(e) {
    this.setData({
      partnerPlaceIndex: e.detail.value
    })
  },

  //对方所在家乡下拉列表
  bindPartnerHomeChange: function (e) {
    this.setData({
      partnerHomeIndex: e.detail.value
    })
  },

  //希望对方年龄下拉列表
  bindAgeChange: function(e) {
    this.setData({
      ageIndex: e.detail.value
    })
  },

  //学校类型下拉列表
  bindSchoolTypeChange: function(e) {
    this.setData({
      schoolIndex: e.detail.value
    })
  },

  //学校类型下拉列表
  bindStateChange: function(e) {
    this.setData({
      stateIndex: e.detail.value
    })
  }
})