import { Notification } from 'element-ui';
export default {
    // 去重操作
    unique(data) {
        let lastData = []
        for (let i = 0; i < data.length; i++) {
            if (lastData.indexOf(data[i]) === -1) {
                lastData.push(data[i])
            }
        }
        return lastData;
    },
//对请求的响应提示
    notifyResponse(response, successCallback, errorCallback) {
        let isFunction=(fn)=> Object.prototype.toString.call(fn) === '[object Function]';
        if ('result' in response && 'error' in response) {
            if (response.error) {
                Notification({
                    message: response.errorMessage,
                    type: 'warnning',
                    duration: 1000,
                    offset: 200
                });
                if (errorCallback && isFunction(errorCallback)) {
                    errorCallback();
                }
            }
            else {
                Notification({
                    message: response.result,
                    type: 'success',
                    duration: 1000,
                    offset: 200
                });
                if (successCallback && isFunction(successCallback)) {
                    successCallback();
                }
            }
        }
    }

}