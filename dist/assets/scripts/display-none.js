(function () {
  const target = document.getElementById('target1')

  const showButton = document.getElementById('show1')
  const hideButton = document.getElementById('hide1')

  showButton.addEventListener('click', () => {
    target.classList.add('is-active')
  })

  hideButton.addEventListener('click', () => {
    target.classList.remove('is-active')
  })
}())

(function () {
  const target = document.getElementById('target2')

  const showButton = document.getElementById('show2')
  const hideButton = document.getElementById('hide2')

  showButton.addEventListener('click', () => {
    target.classList.add('is-active')
  })

  hideButton.addEventListener('click', () => {
    target.classList.remove('is-active')
  })
}())
