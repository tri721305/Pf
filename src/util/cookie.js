import Cookies from 'universal-cookie'

export const setCookie = (key, value, options = { path: '/' }) => {
  const cookie = new Cookies()
  cookie.set(key, value, options)
}

export const getCookie = (key) => {
  const cookie = new Cookies()
  return cookie.get(key)
}

export const removeCookie = (key) => {
  const cookie = new Cookies()
  if (Array.isArray(key)) {
    key.forEach((k) => {
      cookie.remove(k)
    })
  } else {
    cookie.remove(key)
  }
}

export function setCookiesCus(name, value, seconds) {
  var expirationDate = new Date()
  // Thêm số giây vào thời gian hiện tại
  expirationDate.setTime(expirationDate.getTime() + seconds * 1000)

  // Thiết lập cookie với tên, giá trị và thời gian hết hạn
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expirationDate.toString() + '; path=/'
}
