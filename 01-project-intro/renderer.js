$(() => {
  const crypto = require('crypto')

  $(('#text-input').bind('input propertychange', () => {
    const text = this.value
  }))
})