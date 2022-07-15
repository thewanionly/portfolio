const body = document.querySelector('body')
const navToggle = document.querySelector('#nav-toggle')
const nav = document.querySelector('#nav')
const navLinks = document.querySelectorAll('#nav-link')
const footerCopyright = document.querySelector('#footer-copyright')

// Nav toggle click handler
const toggleNavMenu = () => {
  if (body?.style?.overflow === 'hidden') {
    body.style.overflow = 'unset'
  } else {
    body.style.overflow = 'hidden'
  }

  nav.classList.toggle('nav__menu')
  navToggle.classList.toggle('nav__toggle--close')
}

// Open/Close nav menu when nav toggle is clicked
navToggle.addEventListener('click', toggleNavMenu)

// Close nav menu and reset body overflow when clicking the nav link
navLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault()

    toggleNavMenu()
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    })
  })
})

// Footer copyright
if (footerCopyright) {
  footerCopyright.innerText = footerCopyright.innerText.replace('{year}', new Date().getFullYear())
}
