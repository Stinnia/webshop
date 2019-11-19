class PhoneHandler {
    constructor() {
        this.allPhonesFromDB = document.querySelector("#allPhonesFromDB");
        this.btnSendPhonesToDB = document.querySelector("#btnSendPhonesToDB");
        this.result = document.querySelector("#result");

        this.savePhone();
        this.getAllPhones();
        this.deletePhone();
    }

    savePhone() {
        this.btnSendPhonesToDB.addEventListener("click", ()=>{

            let title = document.querySelector("#title").value;
            let description = document.querySelector("#description").value;
            let price = document.querySelector("#price").value;


            fetch('/savephone', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    price
                    
                })
            })
            .then((res) => {
                return res.json()  //here we receive a promise, that in a while promises some json data
            })
            .then((data) => { // here we actually receive the json data
                alert(data.successful);
                this.getAllPhones();

            })
        })
    }

    getAllPhones() {

        fetch('/getAllPhones')
        .then((res) => { return res.json()})
        .then((data) => {

            this.allPhonesFromDB.innerHTML = "";

            let output = "";
            

            for (let phone of data) {
                output += `
                <div>
                <div>${phone.title}</div>
                <div>${phone.description}</div>
                <div>${phone.price}</div>
                <button data-id="${phone.id}" id="edit-${phone.id}" data-action="edit">Edit</button>
                <button data-id="${phone.id} id="delete-${phone.id}" data-action="delete">Delete</button>
                </div>
                `
            };
            this.result.innerHTML = output;
            this.deletePhone();
        })
    }
    deletePhone(){
        
        let allPhones = []

        result.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'edit') {
                const editButton = document.querySelector(`#edit-${e.target.dataset.id}`)
                editButton.disabled = true
                
                const phoneData = allPhones.find((phone) => {
                  return phone.id == e.target.dataset.id
                })
                e.target.parentElement.innerHTML += `
                <div id='edit-phone'>
                  <form id="phone-form">
                    <input required id="edit-title" placeholder="${phoneData.title}">
                    <input required id="edit-description" placeholder="${phoneData.description}">
                    <input required id="edit-price" placeholder="${phoneData.price}">
                    <input type="submit" value="Edit Phone">
                </div>`
            } else if (e.target.dataset.action === 'delete') {
              console.log('you pressed delete')
            }
          }) // end of eventListener for editing and deleting a book


          editForm.addEventListener("submit", (e) => {
            event.preventDefault()
            const titleInput = document.querySelector("#edit-title").value
            const descInput = document.querySelector("#edit-description").value
            const priceInput = document.querySelector("#edit-price").value
            const editedPhone = document.querySelector(`#phone-${phoneData.id}`)
  fetch(`/deletePhones/${phoneData.id}`, {
              method: 'PATCH',
              body: JSON.stringify({
                title: titleInput,
                description: descInput,
                price: priceInput
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then( response => response.json() )
            .then( phone => {
              editedPhone.innerHTML = `
              <div id=book-${phone.id}>
                <h2>${phone.title}</h2>
                <p>${phone.description}</p>
                <p>${phone.price}</p>
                <button data-id=${phone.id} id="edit-${phone.id}" data-action="edit">Edit</button>
                <button data-id=${phone.id} id="delete-${phone.id}" data-action="delete">Delete</button>
              </div>
              <div id=edit-book-${phone.id}>
              </div>`
              editForm.innerHTML = ""
            })
        })

    }
}
export default PhoneHandler;