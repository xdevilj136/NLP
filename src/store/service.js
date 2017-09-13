import ajax from '../config/ajax'

export default {
	configData () {
        var data = [{
			label: '招中标',
			value: '招中标'
		}, {
			label: '拜访记录',
			value: '拜访记录'
		}, {
			label: '授信批文解析',
			value: '授信批文解析'
		}, {
			label: '调查报告解析',
			value: '调查报告解析'
		}];
        return data
	},
	infoGet () {
		let data = {"招中标":{"招标机构":["海致网络技术有限公司"],"代理机构":["海致网络技术（北京）有限公司"],"中标机构":["大连樱华健康科技有限公司"],"中标金额":["人民币580.2万元"]}};
		let newDate = {
			name: '',
			children: []
		}
		for (let i in data) {
			newDate['name'] = i;
			for (let j in data[i]) {
				newDate['children'].push({
					name: j,
					value: data[i][j]
				})
			}
		}
		return newDate;
	},
	analysisGet (json) {
		let data = {
			"seg_list":["李彦宏","是","马云","最大","威胁","嘛","？"],
			"pos_list":{"words":["李彦宏","是","马云","最大","威胁","嘛","？"],"tags":["NH","V","NH","NZ","V","E","WP"]},
			"ner_list":{"words":["李彦宏","是","马云","最","大","威胁","嘛","？"],"tags":["PERSON","O","PERSON","O","O","O","O","O"]}
		}
		let lastData = {}
		for (let i = 0; i < json.type.length; i++) {
			for (let j in data) {
				if (json.type[i] === j) {
					lastData[j] = data[j]
					if (data[j].tags) {
						lastData[j]['newTags'] = unique(data[j].tags)
					}
				}
			}
		}
		return lastData
	},
	taskManageData(){
		var data=[{
			name: '新闻实体识别',
			type: '实体识别',
			time: '2017-08-09',
			status: '未开始'
		  }, {
			name: '存量裁判文书解析',
			type: '裁判文书',
			time: '2017-08-29',
			status: '正在执行'
		  }];
		  return data;
	}
}
// 去重操作
function unique (data) {
	let lastData = []
	for (let i = 0; i < data.length; i++) {
		if (lastData.indexOf(data[i]) === -1) {
			lastData.push(data[i])
		}
	}
	return lastData
}
