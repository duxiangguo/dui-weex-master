/**
 * Created by dxg on 17/12/1.
 */
var modal = weex.requireModule('modal');

var common = {
    /* 用户名开头必须是首字母,由字母数字下划线组成 长度是3到18位*/
    "isValidUsername": function (str) {
        const reg = /^[a-zA-Z][a-zA-Z0-9_]{2,17}$/
        return reg.test(str)
    },
    /* 用户名开头必须是首字母,由字母数字下划线组成 长度是3到18位*/
    "tirm": function (str,is_global) {
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g,"");
        if(is_global.toLowerCase()==="g")
        {
            result = result.replace(/\s/g,"");
        }
        return result;
    },
    /*验证是否为数字*/
    "isValidNumber": function (str) {
        const reg = /^[1-9]\d*$/
        return reg.test(str)
    },
    /* 合法uri*/
    "validateURL": function (textval) {
        const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
        return urlregex.test(textval)
    },
    /*格式化输入的银行卡号*/
    "formatBankNum": function (num) {
        if (/\S{5}/.test(num)) {
            return num.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
        }
        return num
    },
    /*格式化手机号*/
    "formatTelphone": function (value) {
        return value.replace(/^(...)(....)/g, "$1 $2 ");
    },
    /*格式化身份证号*/
    "formatIdCard": function (value) {
        return value.replace(/^(......)(....)(....)(....)/g, "$1 $2 $3 $4 ");
    },
    /*验证手机号格式是否正确*/
    "isValidTelephone": function (tel) {
        const reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
        return reg.test(tel)
    },
    /*验证身份证号格式是否正确*/
    "isValidIdCard": function (idCard) {
        const reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        return reg.test(idCard)
    },
    /*比较输入的新密码和在次输入的密码是否相等*/
    "passwordIsEqual": function (one, two) {
        if(one === two) {
            return true
        }
        return false
    },
    /*格式化日期时间*/
    "parseTime":function (time, cFormat) {
        if (arguments.length === 0) {
            return null
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
        let date
        if (typeof time === 'object') {
            date = time
        } else {
            if (('' + time).length === 10) time = parseInt(time) * 1000
            date = new Date(time)
        }
        const formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        }
        const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
            let value = formatObj[key]
            if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
            if (result.length > 0 && value < 10) {
                value = '0' + value
            }
            return value || 0
        })
        return time_str
    }

}

module.exports = common;
