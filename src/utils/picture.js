const http2https = (url) => {
  const httpsRegx = /^https/;
  const httpRegx = /^http/;

  if (url.search(httpsRegx) === -1) {
    url = url.replace(httpRegx, 'https');
  }
  return url;
}

const picSizeUrl = (url, size) => {
  if (url.length === 0) {
    return '';
  } else {

    return http2https(`${url}?param=${size}y${size}`);
  }
};

export { picSizeUrl };
