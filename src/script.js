const wow = document.querySelector('[data-id="wow"]')

if (wow) {
  setInterval(() => {
    wow.classList.toggle('text-red')
  }, 500)
}