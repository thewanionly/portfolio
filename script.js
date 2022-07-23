const body = document.querySelector('body')
const navToggle = document.querySelector('#nav-toggle')
const nav = document.querySelector('#nav')
const navLinks = document.querySelectorAll('#nav-link')
const footerCopyright = document.querySelector('#footer-copyright')
const contactForm = document.querySelector('#contact-form')
const toast = document.querySelector('#toast')
const toastMesssage = document.querySelector('#toast-message')
const toastClose = document.querySelector('#toast-close')
const toastIconInfo = document.querySelector('#toast-icon-info')
const toastIconCheck = document.querySelector('#toast-icon-check')

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
    submitButton.style.cursor = 'wait'

    const res = await fetch('https://formspree.io/f/xpzbvlvq', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    })
    const resData = await res.json()

    // After request was done
    toast.classList.remove('toast__exit')
    toast.classList.add('toast--visible', 'toast__enter')
    submitButton.textContent = 'Send message'
    submitButton.disabled = false
    submitButton.style.cursor = 'pointer'

    if (res.ok) {
      // Success
      toast.classList.remove('toast--error')
      toast.classList.add('toast--success')
      toastIconCheck.style.display = 'flex'
      toastIconInfo.style.display = 'none'
      toastMesssage.textContent =
        'Your message have been sent. I will get back to you as soon as possible. Thank you.'
      contactForm.reset()
    } else {
      if (Object.hasOwn(resData, 'errors')) {
        throw new Error(resData['errors'].map((error) => error['message']).join(', '))
      } else if (Object.hasOwn(resData, 'error')) {
        throw new Error(resData.error)
      } else {
        throw new Error('')
      }
    }
  } catch (error) {
    //Error
    let errorMessage = `Problem sending message.`

    if (error?.message) {
      errorMessage += ` ${error?.message}`
    }

    toastIconInfo.style.display = 'flex'
    toastIconCheck.style.display = 'none'
    toast.classList.remove('toast--success')
    toast.classList.add('toast--error')
    toastMesssage.textContent = errorMessage
    console.error(error)
  }
})

// Toast close
toastClose.addEventListener('click', () => {
  toast.classList.add('toast__exit')
  toast.classList.remove('toast__enter')
})

// Footer copyright
if (footerCopyright) {
  footerCopyright.innerText = footerCopyright.innerText.replace('{year}', new Date().getFullYear())
}
