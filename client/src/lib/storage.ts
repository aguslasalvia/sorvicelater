export const storage = {
  get(key: string) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null
    }
  },

  set(key: string, value: string) {

    localStorage.setItem(key, value)
  },

  remove(key: string) {
    localStorage.removeItem(key)
  }

}
