const app = getApp()


Page({
	data: {
		localImgs: [],
		serverImgs: [],
		upload_picture_list: [],
		ishidden: false,
		publishDisabled: true,
		tempTextContent: ""
	},

	//发布动态
	publishMoment: function () {
		var self = this;
		app.httpPost(
			'api/Moment/PublishMoment', {
				"UId": app.globalData.apiHeader.UId,
				"TextContent": self.data.tempTextContent,
				"ImgContents": self.data.serverImgs
			},
			function (res) {
				if (res.isExecuteSuccess) {
					self.publishToast(true);
					self.backPage()
				} else {
					self.publishToast(false);
				}
			},
			function (res) {
				console.error("发布动态失败");
				self.publishToast(false);
			},
		)
	},

	//弹框
	publishToast: function (success) {
		let title = success ? "发布成功" : "发布失败";
		let img = success ? "" : "../../content/images/warn.png"
		wx.showToast({
			title: title,
			icon: 'success',
			image: img,
			duration: 1500
		})
	},

	//获取用户输入的文本
	textContentInput: function (e) {
		let str = e.detail.value
		this.setData({
			tempTextContent: str
		})
		this.updateBtnState();
	},

	//更新按钮禁用状态
	updateBtnState: function () {
		let str = this.data.tempTextContent;
		let localImgs = this.data.localImgs;
		let disabled = false;
		if ((localImgs != undefined && localImgs.length > 0) || (str != null && str.length > 0)) {
			disabled = false
		} else {
			disabled = true
		}
		this.setData({
			publishDisabled: disabled
		})
	},

	//返回上一级页面。
	backPage: function () {
		wx.navigateBack({
			delta: 1
		})
	},

	//选择图片方法
	uploadpic: function (e) {
		let self = this //获取上下文
		let upload_picture_list = self.data.upload_picture_list;
		let localImgs = self.data.localImgs;
		//选择图片
		wx.chooseImage({
			count: 9, // 默认9，这里显示一次选择相册的图片数量 
			sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
				let tempFiles = res.tempFiles;
				if (tempFiles.length > 9 || (localImgs != undefined && localImgs.length + tempFiles.length > 9)) {
					wx.showToast({
						title: "不能超过9张",
						icon: 'success',
						image: "../../content/images/warn.png",
						duration: 3000
					})
					return;
				}
				//把选择的图片 添加到集合里
				for (let i in tempFiles) {
					tempFiles[i]['upload_percent'] = 0;
					localImgs.push(tempFiles[i].path);
					upload_picture_list.push(tempFiles[i])
				}

				self.setData({
					upload_picture_list: upload_picture_list,
					localImgs: localImgs
				});

				if (upload_picture_list.length >= 9) {
					self.setData({
						ishidden: true
					});
				}
				self.uploadimage();

				self.updateBtnState();
			}
		})
	},

	//上传图片
	uploadimage() {
		let self = this
		let uploadList = self.data.upload_picture_list
		//循环把图片上传到服务器 并显示进度       
		for (let j in uploadList) {
			if (uploadList[j]['upload_percent'] == 0) {
				//上传图片
				upload_file_server(self, uploadList, j)
			}
		}
	},

	// 点击删除图片
	deleteImg(e) {
		let uploadList = this.data.upload_picture_list;
		let localImgs = this.data.localImgs;
		let index = e.currentTarget.dataset.index;
		uploadList.splice(index, 1);
		localImgs.splice(index, 1);
		this.setData({
			upload_picture_list: uploadList,
			localImgs: localImgs
		});

		if (localImgs.length < 9) {
			this.setData({
				ishidden: false
			});
		}

		this.updateBtnState();

		let serverImgs = this.data.serverImgs;
		let imgPath = serverImgs[index].imgPath;
		if (serverImgs != undefined) {
			serverImgs.splice(index, 1);
			this.setData({
				serverImgs: serverImgs
			});
			//删除服务器上图片
			deleteImg(imgPath);
		}
	},

	// 预览图片
	previewImg(e) {
		//获取当前图片的下标
		let index = e.currentTarget.dataset.index;
		//所有图片
		let localImgs = this.data.localImgs;
		wx.previewImage({
			//当前显示图片
			current: localImgs[index],
			//所有图片
			urls: localImgs
		})
	}
})

/**
 * 上传图片方法
 */
function upload_file_server(self, upload_picture_list, j) {
	const upload_task = wx.uploadFile({
		url: app.globalData.baseUrl + "api/Moment/UpLoadImg", //需要用HTTPS，同时在微信公众平台后台添加服务器地址  
		filePath: upload_picture_list[j]['path'], //上传的文件本地地址    
		name: 'file',
		success: function (res) {
			let data = JSON.parse(res.data);
			let serverImgs = self.data.serverImgs;
			if (data.head.success) {
				serverImgs.push(data.content);
				self.setData({
					serverImgs: serverImgs
				});
			}
		},
		fail: function (res) {
			var data = JSON.parse(res.data);
			console.info(data);
		}
	})
	//上传 进度方法
	upload_task.onProgressUpdate((res) => {
		upload_picture_list[j]['upload_percent'] = res.progress
		self.setData({
			upload_picture_list: upload_picture_list
		});
	});
}

//删除服务器上的图片
function deleteImg(path) {
	var self = this;
	app.httpPost(
		'api/Moment/DeleteImg', {
			"ImgPath": path
		},
		function (res) {
			console.info("删除图片成功，path=" + path);
		},
		function (res) {
			console.error("删除图片失败，path=" + path);
		},
	)
}