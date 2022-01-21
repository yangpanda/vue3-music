export function formatNumber(num) {
  let ret = num;

  if (String(num).length === 1) {
    ret = '0' + num;
  }

  return ret;
}

export function addZero(num) {
  let ret = num;
  if (String(num).length === 1) {
    ret = '0' + num;
  }

  return ret;
}

export function formatDuration(time) {
  let minute = ~~(time / 1000 / 60);
  let second = ~~((time - minute * 60 * 1000) / 1000);

  return addZero(minute) + ':' + addZero(second);
}

export function formatTime(time) {
  let minute = ~~(time / 60);
  let second = ~~(time - minute * 60);

  return addZero(minute) + ' : ' + addZero(second);
}

export function generateBigAlphabet() {
  var arr = [];
  for (var i = 65; i < 91; i++) {
    arr.push(String.fromCharCode(i));
  }
  return arr;
}
