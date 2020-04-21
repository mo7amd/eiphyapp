export const loadScript = (src) => new Promise(((resolve, reject) => {
  let s;
  s = document.createElement('script');
  s.src = src;
  s.onload = resolve;
  s.onerror = reject;
  document.head.appendChild(s);
}));
