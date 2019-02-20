/*
* 解析url参数
* @example "?id=123&a=b"
* @return Object
* */
export function urlParse () {
  let url = window.location.search,
    obj = {},
    reg = /[?&][^?&]+=[^?&]+/g,
    arr = url.match(reg)
  //['?id=123','&a=b']
  if (arr) {
    arr.forEach(item => {
      let temp = item.substring(1).split('='),
        key = temp[0],
        val = temp[1]
      obj[key] = val
    })
  }
  return obj
}
