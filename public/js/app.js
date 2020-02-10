console.log('Client Side JS is loaded')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JAVA SCRIPT'


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const loca = searchElement.value

    messageOne.textContent = 'Loading Details....'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + loca).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.loca
                messageTwo.textContent = data.forecast
            }


        })
    })
})
