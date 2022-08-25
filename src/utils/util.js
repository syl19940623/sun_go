import { Message } from 'element-ui';

// 全屏
function fullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

// 退出全屏
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

// 手机号验证
function checkPhone(num) {
  var myreg = /^[1][3456789][0-9]{9}$/;
  if (!myreg.test(num)) {
    return false;
  } else {
    return true;
  }
}

// 邮箱验证
function checkMail(num) {
  var myreg = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
  if (!myreg.test(num)) {
    return false;
  } else {
    return true;
  }
}

// 身份证号验证
function checkIdCard(val) {
  var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
  var code = val.substring(17);
  if (p.test(val)) {
    var sum = 0;
    for (var i = 0; i < 17; i++) {
      sum += val[i] * factor[i];
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true;
    }
  }
  return false;
}

// 数组去重
function arrayRemoveRepeat(arr) {
  return arr.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

// 获取数组中key=value的那个对象
function parseJson(jsonObj, key, value) {
  for (let v in jsonObj) {
    let element = jsonObj[v]
    if (typeof (element) == 'object') {
      let result = parseJson(element, key, value)
      if (result) return result;
    } else {
      if (v == key) {
        if (element == value) return jsonObj;
      }
    }
  }
}

// 数字计算（解决js计算精度问题）
function calcNum(num1, num2, calcSymbol) {
  let num1Digit = (num1.toString().split('.')[1] || '').length
  let num2Digit = (num2.toString().split('.')[1] || '').length
  let baseNum = Math.pow(10, Math.max(num1Digit, num2Digit))
  return eval(((num1 * baseNum) + calcSymbol + (num2 * baseNum)) / baseNum)
}

// 移除null数据
function removeNull(obj) {
  let keys = Object.keys(obj)
  for (let v of keys) {
    if (obj[v] == null) obj[v].remove()
  }
  return obj;
}

// 生成随机整数
function randomInteger(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// 复制内容到剪贴板
function copyStr(str) {
  let createTextarea = document.createElement('textarea');
  createTextarea.readOnly = 'readonly';
  createTextarea.value = str;
  document.body.appendChild(createTextarea);
  createTextarea.select();
  document.execCommand('Copy');
  document.body.removeChild(createTextarea);
  Message({
    message: '内容已复制到剪贴板',
    type: 'success',
    duration: 1000
  });
}

// 下载文件
function downloadFile(url) {
  let iframe = document.createElement('iframe')
  iframe.src = url
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
}

// 图片懒加载
function lazyload() {
  const viewHeight = document.documentElement.clientHeight
  const lazyloadImg = document.querySelectorAll("img[data-src]")
  Array.prototype.forEach.call(lazyloadImg, function (item, index) {
    const rect = item.getBoundingClientRect()
    if (rect.bottom >= 0 && rect.top < viewHeight) {
      item.src = item.getAttribute("data-src")
      item.removeAttribute("data-src")
    }
  })
}

export const util = {
  fullScreen,
  exitFullscreen,
  checkPhone,
  checkMail,
  checkIdCard,
  arrayRemoveRepeat,
  parseJson,
  calcNum,
  removeNull,
  randomInteger,
  copyStr,
  downloadFile,
  lazyload
}