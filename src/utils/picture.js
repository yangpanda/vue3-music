const http2https = (url) => {
  const httpRegx = /^http/;
  if (!url.startsWith('https')) {
    url = url.replace(httpRegx, 'https');
  }
  return url;
};

const picSizeUrl = (url, size) => {
  if (url && url.length === 0) {
    return '';
  } else {
    return http2https(`${url}?param=${size}y${size}`);
  }
};

export { picSizeUrl };
