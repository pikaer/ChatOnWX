
//判断空指针
function isBlank(str) {
	if (Object.prototype.toString.call(str) === '[object Undefined]') {//空
		return true
	} else if (
		Object.prototype.toString.call(str) === '[object String]' ||
		Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
		return str.length == 0 ? true : false
	} else if (Object.prototype.toString.call(str) === '[object Object]') {
		return JSON.stringify(str) == '{}' ? true : false
	} else {
		return true
	}
}

//注册方法
module.exports = {
	isBlank: isBlank
}