/*
* 解析url参数
* @example  ?id=1
* @return Object
* */

export function urlParse () {
  //获取url
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g

  let arr = url.match(reg)

  if (arr) {
    arr.forEach(item => {
      let res = item.substring(1).split('=')
      let key = res[0]
      let val = res[1]
      obj[key] = val
    })
  }
  return obj
}
