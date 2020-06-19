console.log("Client side JS file")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

message1.textContent = 'From Javascript'


const getWeather = (address) => {
    message1.textContent = 'loading...'
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.address
                message2.textContent = data.forecast
            }
        })
    })
}
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    getWeather(search.value)
})