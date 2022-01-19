const http2https = (url) => {
  const httpRegx = /^http/;
  if (!url.startsWith('https')) {
    url = url.replace(httpRegx, 'https');
  }
  return url;
};

const picSizeUrl = (url, x, y) => {
  if (url && url.length === 0) {
    return '';
  } else {
    return http2https(`${url}?param=${x}y${y ?? x}`);
  }
};

export { picSizeUrl };
