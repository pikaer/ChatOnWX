const app = getApp();
Page({
	data: {
		//判断小程序的API，回调，参数，组件等是否在当前版本可用。
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		headPhotoPath:"pikaer.jpg"
	},
	onLoad: function () {
		var that = this;
		// 查看是否授权
		wx.getSetting({
			success: function (res) {
				if (res.authSetting['scope.userInfo']) {
					wx.getUserInfo({
						success: function (res) {
							//从数据库获取用户信息
							that.userLogin();
							//用户已经授权过
							wx.switchTab({
								url: '/pages/discovery/discovery'
							})
						}
					});
				}
			}
		})
	},
	bindGetUserInfo: function (e) {
		if (e.detail.userInfo) {
			this.userLogin();
		} else {
			//用户按了拒绝按钮
			wx.showModal({
				title: '警告',
				content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
				showCancel: false,
				confirmText: '返回授权',
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击了“返回授权”')
					}
				}
			})
		}
	},

	//用户登录
	userLogin: function () {
		let self = this;
		wx.login({
			success: res => {
				console.log(JSON.stringify(res));
				if (res.code) {
					let reqUrl = "https://api.weixin.qq.com/sns/jscode2session?appid=" + app.globalData.myAppid + "&secret=" + app.globalData.mySecret + "&js_code=" + res.code + "&grant_type=authorization_code"
					wx.request({
						url: reqUrl,
						header: app.globalData.httpHeader,
						success: function (res) {
							console.log(JSON.stringify(res)) //获取openid
							app.globalData.openid = res.data.openid;
							app.globalData.session_key = res.data.session_key;
							self.getUserInfoWX();
						},
						fail: function (res) {
							console.error("获取用户openid失败!")
						}
					})
				}
			}
		})
	},

	//获取微信用户信息
	getUserInfoWX: function () {
		let self = this;
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							console.info("获取微信用户信息成功!" + JSON.stringify(res));
							// 可以将 res 发送给后台解码出 unionId
							app.globalData.userInfoWX = res.userInfo
							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回所以此处加入 callback 以防止这种情况
							if (self.userInfoReadyCallback) {
								self.userInfoReadyCallback(res)
							}

							//网站备案通过后可使用
							//self.saveHeadPath(res.userInfo.avatarUrl);

							self.setUserInfo();
						}
					})
				}
			}
		})
	},

	//存入用户信息
	setUserInfo: function () {
		let self=this;
		app.httpPost(
			'api/UserInfo/SetUserInfo', {
				"OpenId": app.globalData.openid,
				"NickName": app.globalData.userInfoWX.nickName,
				"Gender": app.globalData.userInfoWX.gender,
				"HeadPhotoPath": self.data.headPhotoPath,
			},
			function (res) {
				console.info("存入用户信息成功");
				app.globalData.apiHeader.UId = res.uId;

				wx.switchTab({
					url: '/pages/discovery/discovery'
				})
			},
			function (res) {
				console.error("存入用户信息失败!");

				wx.switchTab({
					url: '/pages/discovery/discovery'
				})
			})
	},

	//存入用户信息
	saveHeadPath: function (temPath) {
		let self = this;
		wx.uploadFile({
			url: app.globalData.baseUrl + "api/Moment/UpLoadImg", //需要用HTTPS，同时在微信公众平台后台添加服务器地址  
			filePath: temPath, //上传的文件本地地址    
			name: 'file',
			success: function (res) {
				let data = JSON.parse(res.data);
				if (data.head.success) {
					self.data.headPhotoPath = data.content;
					self.setData({
						headPhotoPath: data.content
					});
					self.setUserInfo();
				}
			},
			fail: function (res) {
				var data = JSON.parse(res.data);
				console.info(data);
			}
		})
	},
})