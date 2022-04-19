export function randomString(e) {
  e = e || 12
  var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = ''
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

export function deepClone(data) {
  if (typeof data !== 'object' || data === null) {
    return data
  }
  let copyData;
  if (Array.isArray(data)) {
    copyData = []
  } else {
    copyData = {}
  }
  const keys = Object.keys(data)
  keys.forEach(key => {
    copyData[key] = deepClone(data[key])
  })
  return copyData
}