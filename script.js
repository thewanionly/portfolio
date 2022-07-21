const body = document.querySelector('body')
const navToggle = document.querySelector('#nav-toggle')
const nav = document.querySelector('#nav')
const navLinks = document.querySelectorAll('#nav-link')
const footerCopyright = document.querySelector('#footer-copyright')
const contactForm = document.querySelector('#contact-form')

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
navLinks.forEach((link) =>
  link.addEventListener('click', () => {
    if (nav.classList.contains('nav__menu')) {
      toggleNavMenu()
    }
  })
)

// Submit action
contactForm.addEventListener('submit', async (e) => {
  // Prevent page reload after submitting form
  e.preventDefault()

  // Get form data
  const formData = new FormData(e.target)

  // Get button text
  const submitButton = document.querySelector('#contact-form-button')

  // Send message
  try {
    // Loading
    submitButton.textContent = 'Sending message...'
    submitButton.disabled = true

    const res = await fetch('https://formspree.io/f/xpzbvlvq', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    })

    // After request was done
    submitButton.textContent = 'Send message'
    submitButton.disabled = false

    if (res.ok) {
      // Success

      alert(
        'Your message have been sent. Thank you for your interest. I will get back to you as soon as possible'
      )
      contactForm.reset()
    } else {
      res.json().then((data) => {
        if (Object.hasOwn(data, 'errors')) {
          throw new Error(data['errors'].map((error) => error['message']).join(', '))
        } else {
          throw new Error('Oops! There was a problem submitting your form')
        }
      })
    }
  } catch (error) {
    //Error
    alert(error)
    console.error(error)
  }
})

// Footer copyright
if (footerCopyright) {
  footerCopyright.innerText = footerCopyright.innerText.replace('{year}', new Date().getFullYear())
}
