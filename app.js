// boite modal CGU

let modal = null
const focusableSelector = "button, a, input, textarea"
let focusables = []
let previouslyFocusedElement = null

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = ''
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal_close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal_stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    setTimeout(function () {
        modal.style.display = 'none'
        modal = null
    }, 500)
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal_close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal_stop').removeEventListener('click', stopPropagation)
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shiftKey) {
        index--
    } else {
        index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
})

// toggle SIGN UP / LOGIN

const signUp = document.querySelector('#signUp')
const login = document.querySelector('#login')
const signUpForm = document.querySelector('#signUpForm')
const loginForm = document.querySelector('#loginForm')
let hash = window.location.hash

const activeSignUp = function () {
    signUpForm.style.display = 'block'
    signUp.offsetWidth
    login.classList.remove('active')
    signUp.classList.add('active')
    setTimeout(function () {
        loginForm.style.display = 'none'
        if (document.querySelector('#emailError') !== null) {
            emailError.parentNode.removeChild(emailError)
        } 
        if (document.querySelector('#passwordError') !== null) {
            passwordError.parentNode.removeChild(passwordError)
        }
        if (loginInput.classList.contains('active')) {
            loginInput.classList.remove('active')
        }
        loginFormContent.email.value = ''
        loginFormContent.password.value = ''
    }, 500)
}

const activeLogin = function () {
    loginForm.style.display = 'block'
    login.offsetWidth
    signUp.classList.remove('active')
    login.classList.add('active')
    setTimeout(function () {
        signUpForm.style.display = 'none'
        if (document.querySelector('#nameError') !== null) {
            nameError.parentNode.removeChild(nameError)
        } 
        if (document.querySelector('#emailError') !== null) {
            emailError.parentNode.removeChild(emailError)
        } 
        if (document.querySelector('#passwordError') !== null) {
            passwordError.parentNode.removeChild(passwordError)
        } 
        if (document.querySelector('#cguError') !== null) {
            cguError.parentNode.removeChild(cguError)
        }
        signUpFormContent.name.value = ''
        signUpFormContent.email.value = ''
        signUpFormContent.password.value = ''
        signUpFormContent.cgu.checked = false
    }, 500)
}

function hashChange () {
    hash = window.location.hash
    if (hash === '#login' && login.classList.contains('active') === false) {
        activeLogin()
    } else if (signUp.classList.contains('active') === false) {
        activeSignUp()
    }
}

window.addEventListener('hashchange', hashChange)
hashChange()


// check the content of the signUp form

const createDivWithIdClassAndText = function (id, className, text) {
    let div = document.createElement('div')
    div.setAttribute('id', id)
    div.setAttribute('class', className)
    div.textContent = text
    return div
}

const signUpFormContent = {
    name: document.querySelector('#name'),
    email: document.querySelector('#signUpMail'),
    password: document.querySelector('#signUpPassword'), 
    cgu: document.querySelector('#cgu')
}
const signUpSubmitInput = document.querySelector('#signUpInput')
const nameError = createDivWithIdClassAndText('nameError', 'form_error', 'write a correct name')
const emailError = createDivWithIdClassAndText('emailError', 'form_error', 'write a correct email')
const passwordError = createDivWithIdClassAndText('passwordError', 'form_error', 'your password must be 6 characters minimum')
const cguError = createDivWithIdClassAndText('cguError', 'form_error', 'You must agree to the terms and conditions')

const verifEmail = function (email) {
    let pattern = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email)) {
        return true
    } else {
        return false
    }
}

const signUpVerif = function (e) {
    let name = signUpFormContent.name.value
    if (name === undefined || name.length < 3) {
        e.preventDefault()
        if (document.querySelector('#nameError') === null) {
            signUpFormContent.name.parentNode.appendChild(nameError)
        }
    } else if (document.querySelector('#nameError') !== null) {
        nameError.parentNode.removeChild(nameError)
    }

    let email = signUpFormContent.email.value
    if (!verifEmail(email)) {
        e.preventDefault()
        if (document.querySelector('#emailError') === null) {
            signUpFormContent.email.parentNode.appendChild(emailError)
        }
    } else if (document.querySelector('#emailError') !== null) {
        emailError.parentNode.removeChild(emailError)
    }

    let password = signUpFormContent.password.value
    if (password.length < 6) {
        e.preventDefault()
        if (document.querySelector('#passwordError') === null) {
            signUpFormContent.password.parentNode.appendChild(passwordError)
        }
    } else if (document.querySelector('#passwordError') !== null) {
        passwordError.parentNode.removeChild(passwordError)
    }

    let cgu = signUpFormContent.cgu
    if (!cgu.checked) {
        e.preventDefault()
        if (document.querySelector('#cguError') === null) {
            signUpFormContent.cgu.parentNode.appendChild(cguError)
        }
    } else if (document.querySelector('#cguError') !== null) {
        cguError.parentNode.removeChild(cguError)
    }
}

signUpSubmitInput.addEventListener('click', signUpVerif)

// check the content of the login form

const loginFormContent = {
    email: document.querySelector('#loginMail'),
    password: document.querySelector('#loginPassword'),
}
const loginInput = document.querySelector('#loginInput')
let loginEmail = loginFormContent.email.value
let loginPassword = loginFormContent.password.value
let verif = [false, false]

const loginVerif = function () {
    let emailVerif = false
    let passwordVerif = false
    loginEmail = loginFormContent.email.value
    loginPassword = loginFormContent.password.value
    if (!verifEmail(loginEmail)) {
        emailVerif = false
    } else {
        emailVerif = true
    }
    if (loginPassword.length < 6) {
        passwordVerif = false
    } else {
        passwordVerif = true
    }
    return [emailVerif, passwordVerif]
}

const keyUp = function () {
    verif = loginVerif()
    if (verif[0] && verif[1]) {
        loginInput.classList.add('active')
    } else {
        loginInput.classList.remove('active')
    }
}

const sendLoginForm = function (e) {
    if (verif[0] === false) {
        e.preventDefault()
        if (document.querySelector('#emailError') === null) {
            loginFormContent.email.parentNode.appendChild(emailError)
        }
    } else if (document.querySelector('#emailError') !== null) {
        emailError.parentNode.removeChild(emailError)
    }

    if (verif[1] === false) {
        e.preventDefault()
        if (document.querySelector('#passwordError') === null) {
            loginFormContent.password.parentNode.appendChild(passwordError)
        }
    } else if (document.querySelector('#passwordError') !== null) {
        passwordError.parentNode.removeChild(passwordError)
    }
}

loginFormContent.email.addEventListener('keyup', keyUp)
loginFormContent.password.addEventListener('keyup', keyUp)
loginInput.addEventListener('click', sendLoginForm)

// Mobile #cgu::after position change

if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    window.alert('vous êtes sur mobile')
    signUpFormContent.cgu.classList.add('mobil')
}
