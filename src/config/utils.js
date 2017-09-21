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
    }
}