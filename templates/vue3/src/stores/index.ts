import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => {
    return {
      nickName: 'Dewey Ou',
      randomNumber: (Math.random() * 1000000) >> 1,
    }
  },
  actions: {
    resetRandomNumber() {
      this.randomNumber = (Math.random() * 1000000) >> 1
    },
  },
})
