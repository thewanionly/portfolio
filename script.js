const navToggle = document.querySelector('#nav-toggle')
const nav = document.querySelector('#nav')
const footerCopyright = document.querySelector('#footer-copyright')

navToggle.addEventListener('click', () => {
  nav.classList.toggle('nav__menu')
  navToggle.classList.toggle('nav__toggle--close')
})

if (footerCopyright) {
  footerCopyright.innerText = footerCopyright.innerText.replace('{year}', new Date().getFullYear())
}
