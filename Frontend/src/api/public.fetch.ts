const fetchData = <T>(url: string, options: RequestInit = {}): Promise<T | null> => {
  return fetch(url, options)
  .then(res => {
    if (!res.ok) return null
    return res.json()
  })
  .catch(() => {
    return null
  })
}

export default fetchData