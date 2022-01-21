//价格处理
export default function (num) {
  if (Object.prototype.toString.call(num) == '[object Number]') {
    return parseFloat(num.toFixed(2))
  } else if (Object.prototype.toString.call(num) == '[object String]') {
    return parseFloat(parseFloat(num).toFixed(2))
  } else {
    return num
  }
}
