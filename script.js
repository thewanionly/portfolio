const body = document.querySelector('body')
const navToggle = document.querySelector('#nav-toggle')
const nav = document.querySelector('#nav')
const footerCopyright = document.querySelector('#footer-copyright')

navToggle.addEventListener('click', () => {
  if (body?.style?.overflow === 'hidden') {
    body.style.overflow = 'unset'
  } else {
    body.style.overflow = 'hidden'
  }

  nav.classList.toggle('nav__menu')
  navToggle.classList.toggle('nav__toggle--close')
})

if (footerCopyright) {
  footerCopyright.innerText = footerCopyright.innerText.replace('{year}', new Date().getFullYear())
}
