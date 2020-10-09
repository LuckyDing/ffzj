export function getTimestamp(str) {
	let date = new date(str);
	return date.getTime();
}

export function countDownTime(str, type) {
	var date1 = new Date(str); //开始时间
	var date2 = new Date(); //结束时间
	var date3 = date1.getTime() - date2.getTime(); //时间差秒
	if (date3 <= 0) {
		return 0;
	}
	//计算出相差天数
	var days = Math.floor(date3 / (24 * 3600 * 1000));

	//计算出小时数
	var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
	var hours = Math.floor(leave1 / (3600 * 1000));

	//计算相差分钟数
	var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
	var minutes = Math.floor(leave2 / (60 * 1000));

	//计算相差秒数
	var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
	var seconds = Math.round(leave3 / 1000);
	let countDownStr = days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
	switch (type) {
		case 'day':
			countDownStr = days + "天";
			break;
		case 'minutes':
			countDownStr = days + "天" + hours + "时" + minutes + "分";
			break;
		case 'hours':
			countDownStr = days + "天" + hours + "时";
			break;
		default:
			break;
	}
	return countDownStr;
}

export function dateFormat(fmt, str) {
	let date = new Date(str);
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}
