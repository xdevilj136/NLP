const pos_list = {
    'A': {
        color: '#FF8E8E',
        name: '形容词'
    },
    'B': {
        color: '#FF8EC5',
        name: '名词修饰符'
    },
    'C': {
        color: '#DE89F5',
        name: '连词'
    },
    'D': {
        color: '#B583E4',
        name: '副词'
    },
    'E': {
        color: '#8E74FE',
        name: '叹词'
    },
    'G': {
        color: '#8392FE',
        name: '语素'
    },
    'I': {
        color: '#598AFE',
        name: '习语'
    },
    'J': {
        color: '#59B5FE',
        name: '缩写词'
    },
    'K': {
        color: '#49C9EC',
        name: '后缀'
    },
    'M': {
        color: '#96DDF2',
        name: '数次'
    },
    'N': {
        color: '#6EE3E2',
        name: '一般名词'
    },
    'ND': {
        color: '#53DFC2',
        name: '方位'
    },
    'NH': {
        color: '#5CEBA9',
        name: '人名'
    },
    'NI': {
        color: '#51E07E',
        name: '机构名'
    },
    'NIS': {
        color: '#83F5A6',
        name: '机构名后缀'
    },
    'NL': {
        color: '#82DF6F',
        name: '位置词'
    },
    'NN': {
        color: '#A3E447',
        name: '专有名词'
    },
    'NS': {
        color: '#DAE279',
        name: '地名'
    },
    'NT': {
        color: '#F2EF89',
        name: '时间'
    },
    'NZ': {
        color: '#F9E76B',
        name: '其他名词'
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
    'WP': {
        color: '#D8D8D8',
        name: '标点符号'
    },
    'X': {
        color: '#BDBDBD',
        name: '未知数、符号'
    }
}
const ner_list = {
    'PROFESSION': {
        color: '#59B5FE',
        name: '职业'
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
        name: '地点'
    },
    'O': {
        color: '#D8D8D8',
        name: '非实体'
    },
    'other': ['#FE8F8F', '#FF8FC5', '#6EE3E2', '#82DF6F', '#FEB935', '#FE9925']
}

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
