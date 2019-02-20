export function saveTolocal (id, key, val) {
  let seller = localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = val
  localStorage.__seller__ = JSON.stringify(seller)
}

export function locdFromloca (id, key, def) {
  let seller = localStorage.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  return seller[key] || def
}
