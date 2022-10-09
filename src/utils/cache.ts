type keyArray = {
  key: string
  value: unknown
}

type cacheKey = keyArray[] | string

class LocalCache {
  // 设置缓存
  setCache(key: cacheKey, value?: unknown) {
    if (key instanceof Array) {
      for (const item of key) {
        window.localStorage.setItem(item.key, JSON.stringify(item.value))
      }
    } else {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }

  //获取缓存
  getCache(key: string): string | undefined {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  // 删除缓存
  deleteCache(key: string | string[]) {
    if (key instanceof Array) {
      for (const item of key) {
        window.localStorage.removeItem(item)
      }
    } else {
      window.localStorage.removeItem(key)
    }
  }

  // 清空缓存
  clearAllCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
