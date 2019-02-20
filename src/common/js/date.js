export function formatDate (date, str) {
  let time = new Date(date)
  if (/(Y+)/.test(str)) {
    str = str.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let rex = {
    'M+': time.getMonth() + 1,
    'D+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMonth()
  }
  for (let key in rex) {
    if (new RegExp(`(${key})`).test(str)) {
      let teStr = rex[key] + ''
      str = str.replace(RegExp.$1, (RegExp.$1.length === 1) ? teStr : padLeftZero(teStr))
    }
  }
  return str
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
