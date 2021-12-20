const picSizeUrl = (url, size) => {
  if (url.length == 0) {
    return '';
  } else {
    return `${url}?param=${size}y${size}`;
  }
};

export { picSizeUrl };
