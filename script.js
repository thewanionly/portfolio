const navToggle = document.querySelector('#nav-toggle')
const nav = document.querySelector('#nav')

navToggle.addEventListener('click', () => {
  console.log('ass')
  nav.classList.toggle('nav__menu')
})
