import ajax from '../config/ajax'

export default {
	configData: function () {
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
	taskManageData:function(){
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
};