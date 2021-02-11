'use strict'

const gallery = document.querySelector('#gallery')

// function to create cards and display users
// calls new modal when a card is clicked
function createUsers (users) {
  users.forEach((entry) => {
    const card = document.createElement('DIV')
    card.className = 'card'
    const cardHTML = `
      <div class="card-img-container">
        <img class="card-img" src="${entry.picture.medium}" alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 class="card-name cap">${entry.name.first} ${entry.name.last}</h3>
        <p class="card-text">${entry.email}</p>
        <p class="card-text cap">${entry.location.city}, ${entry.location.state}</p>
      </div>`

    card.insertAdjacentHTML('beforeend', cardHTML)

    card.addEventListener('click', () => {
      newModal(entry)
    })
    gallery.insertAdjacentElement('beforeend', card)
  })
}

// function to create new modal and insert element into dom
function newModal (users) {
  const modal = document.createElement('DIV')
  modal.className = 'modal-container'
  const modalHTML = `<div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src=${users.picture.medium} alt="profile picture">
          <h3 id="name" class="modal-name cap">${users.name.first} ${users.name.last}</h3>
          <p class="modal-text">${users.email}</p>
          <p class="modal-text cap">${users.location.city}</p>
          <hr>
          <p class="modal-text">${users.cell.replace(/-/, ' ')}</p>
          <p class="modal-text">${users.location.street.number} ${users.location.street.name}, ${users.location.city}, ${users.location.state} ${users.location.postcode}</p>
          <p class="modal-text">Birthday: ${users.dob.date.substr(5, 2)}/${users.dob.date.substr(8, 2)}/${users.dob.date.substr(0, 4)}</p>
      </div>
  </div>`

  modal.insertAdjacentHTML('beforeend', modalHTML)

  document.body.insertAdjacentElement('beforeend', modal)

  // event listener for when close button is clicked
  document.querySelector('#modal-close-btn').addEventListener('click', () => {
    document.querySelector('div.modal-container').remove()
  })
}

// retrieve users and call create users function to create different cards displaying users
fetch('https://randomuser.me/api/?nat=us&results=12')
  .then(response => response.json())
  .then(response => createUsers(response.results))
