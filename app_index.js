const searchBar = document.querySelector('#searchBar')
const links = document.querySelector('.link')

const decrease = function () {
    links.style.transition = '.1s'
    links.innerWidth
    links.style.maxWidth = '385px'
    setTimeout (function () {
        links.style.justifyContent = 'flex-end'
        links.style.transition = '.5s'
        links.innerWidth
        links.style.maxWidth = '35px'
    }, 100)
}

const increase = function () {
    setTimeout (function () {
        searchBar.value = ''    
    }, 100)
    links.style.transition = '.5s'
    links.innerWidth
    links.style.maxWidth = '385px'
    setTimeout (function () {
        links.style.justifyContent = 'flex-start'
        links.style.transition = '.3s'
        links.innerWidth
        links.style.maxWidth = '349.05px'
    }, 500)
}

const resize = function () {
    if (window.innerWidth > 900) {
        searchBar.addEventListener('focusin', decrease)
        searchBar.addEventListener('focusout', increase)
    } else {
        searchBar.removeEventListener('focusin', decrease)
        searchBar.removeEventListener('focusout', increase)
    }
}

if (window.innerWidth > 900) {
    searchBar.addEventListener('focusin', decrease)
    searchBar.addEventListener('focusout', increase)
}
window.onresize = resize


// Navigation tab / shift + tab && autres

searchBar.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' && e.key !== 'Enter') {
        return
    }
    if (e.key === 'Enter') {
        if (searchBar.value === '') {
            e.preventDefault()
            return
        }
        return
    }
    if (!e.shiftKey) {
        e.preventDefault()
        if (document.querySelector('.profil').style.display !== 'none') {
            document.querySelector('.card').focus()    
        } else {
            document.querySelector('.profil_unset a:first-of-type').focus()
        }
    }
})

const card = document.querySelector('.card')
const profilUnsetFirstLink = document.querySelector('.profil_unset a:first-of-type')

card.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') {
        return
    }
    if (e.shiftKey) {
        e.preventDefault()
        searchBar.focus()
    }
})

profilUnsetFirstLink.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') {
        return
    }
    if (e.shiftKey) {
        e.preventDefault()
        searchBar.focus()
    }
})

// rechercher

const searchButton = document.querySelector('.searchForm button')
let searchBarIsFocus = false

document.addEventListener('click',function () {
    searchBarIsFocus = false
    if (profil.classList.contains('profil_active')) {
        profil.classList.remove('profil_active')
        profilLink.forEach(link => link.style.display = 'none')
    }
})

searchBar.addEventListener('click',function () {
    setTimeout(function () {
        searchBarIsFocus = true
    }, 10)
})

searchButton.addEventListener('click', e => {
    if (searchBar.value === '' && !searchBarIsFocus) {
        e.preventDefault()
        searchBar.focus()
    }
    searchBar.focus()
    setTimeout(function () {
        searchBarIsFocus = true
    }, 10)
})


// Profil open / close

const cardProfil = document.querySelector('.card')
const profil = document.querySelector('.profil')
const profilLink = document.querySelectorAll('.profil_link')

const openProfil = function () {
    setTimeout(function () {
        if (!profil.classList.contains('profil_active')) {
            profilLink.forEach(link => link.style.display = '')
            window.innerWidth
            profil.classList.add('profil_active')
        }    
    }, 1)
}

const closeProfil = function () {
    if (profil.classList.contains('profil_active')) {
        profil.classList.remove('profil_active')
        profilLink.forEach(link => link.style.display = 'none')
    }
}

cardProfil.addEventListener('click', openProfil)
profilLink[0].addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey) {
        closeProfil()
    }
})
profilLink[1].addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
        closeProfil()
    } else if (e.key === 'Tab' && e.shiftKey) {
        setTimeout(function () {
            e.preventDefault
            profilLink[0].focus()    
        }, 1)
    }
})

const header = document.querySelector('.header')

const toggleMenu = function () {
    header.classList.toggle('active')
}

const closeProfilPlus = function () {
    setTimeout(function () {
        if (profil.classList.contains('profil_active')) {
                profil.classList.remove('profil_active')
                profilLink.forEach(link => link.style.display = 'none')
            }
    }, 2)
    
}
