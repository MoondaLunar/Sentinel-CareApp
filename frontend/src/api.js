export function setAuth(username, password) {
  const token = btoa(username + ':' + password)
  localStorage.setItem('authToken', token)
}

export function clearAuth() {
  localStorage.removeItem('authToken')
}

export function getAuthHeader() {
  const token = localStorage.getItem('authToken')
  return token ? { Authorization: 'Basic ' + token } : {}
}

export function fetchWithAuth(url, opts = {}) {
  opts.headers = { ...(opts.headers || {}), ...getAuthHeader() }
  return fetch(url, opts)
}

export function isLoggedIn() { return !!localStorage.getItem('authToken') }
