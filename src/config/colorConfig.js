//词性标注
const pos_list = {
    'A': {
        color: '#FF8E8E',
        name: '形容词'
    },
    'B': {
        color: '#8093FF',
        name: '区别词'
    },
    'C': {
        color: '#DE89F5',
        name: '连词'
    },
    'D': {
        color: '#B583E4',
        name: '副词'
    },
    'S':{
        color: '#FF8FC5',
        name: '处所词'
    },
    'Z':{
        color: '#54B6FF',
        name: '状态词'
    },
    'K':{
        color: '#49C9EC',
        name: '后缀'
    },
    'M':{
        color: '#96DDF2',
        name: '数词'
    },
    'N': {
        color: '#6EE3E2',
        name: '名词'
    },
    'F':{
        color: '#53DFC2',
        name: '方位'        
    },
    'Y':{
        color: '#83F5A6',
        name: '语气词'
    },
    'NL': {
        color: '#AA651C',
        name: '惯用语'
    },
    'NS': {
        color: '#DAE279',
        name: '地名'
    },
    'NT': {
        color: '#51E07E',
        name: '机构名'
    },
    'NZ': {
        color: '#A3E447',
        name: '专有名词'
    },
    'NR':{
        color: '#5CEBA9',
        name: '人名'        
    },
    'T':{
        color: '#F2EF89',
        name: '时间'
    },
    'H':{
        color: '#FAE669',
        name: '前缀'
    },
    'O': {
        color: '#F9D34D',
        name: '拟声词'
    },
    'P': {
        color: '#FEB935',
        name: '介词'
    },
    'Q': {
        color: '#FE9925',
        name: '量词'
    },
    'R': {
        color: '#AC704A',
        name: '代词'
    },
    'U': {
        color: '#F47C52',
        name: '助词'
    },
    'V': {
        color: '#FEA586',
        name: '动词'
    },
    'W': {
        color: '#D8D8D8',
        name: '标点符号'
    },
    'other': {
        color:['#B63390','#0234B1','#425A66','#E7D3A5'],
        name:'自定义词性'
    }
}
//实体识别
const ner_list = {
    'EMAIL': {
        color: '#9370AF',
        name: '邮箱'
    },
    'PERCENT': {
        color: '#FEB935',
        name: '百分比'
    },
    'URL': {
        color: '#FE9925',
        name: '链接'
    },
    'MEASURE': {
        color: '#82DF6F',
        name: '度量'
    },
    'CURRENCY': {
        color: '#6EE3E2',
        name: '金额'
    },
    'CELLPHONE': {
        color: '#FF8FC5',
        name: '手机号'
    },
    'DIGIT': {
        color: '#FE8F8F',
        name: '数字'
    },
    'PROFESSION': {
        color: '#59B5FE',
        name: '身份'
    },
    'ORGANIZATION': {
        color: '#96DDF2',
        name: '机构'
    },
    'PERSON': {
        color: '#5CEBA9',
        name: '人名'
    },
    'TIME': {
        color: '#F2EF89',
        name: '时间'
    },
    'LOCATION': {
        color: '#DAE279',
        name: '地名'
    },
    'O': {
        color: '#D8D8D8',
        name: '非实体'
    },
    'other': {
        color:['#AA651C','#B63390','#0234B1','#425A66','#E7D3A5'],
        name:'自定义实体'
    }
}
//机构名
const seg_list = {
    'KEY': {
        color: '#FE8F8F',
        name: '字号'
    },
    'MOD': {
        color: '#82DF6F',
        name: '行业'
    },
    'LOC': {
        color: '#96DDF2',
        name: '地区'
    },
    'SFX': {
        color: '#F9E76B',
        name: '后缀'
    }
}
export { pos_list, seg_list, ner_list }
