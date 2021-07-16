
export function formatNumber(num) {
  let ret = num

  if (String(num).length === 1) {
    ret = '0' + num
  }

  return ret
}
