import Common from './common.js';

class PhoneHandler {
    constructor() {
        this.btnSendPhonesToDB = document.querySelector("#btnSendPhonesToDB");
        this.result = document.querySelector("#result");  

        this.savePhone();
        this.getAllPhones();
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

            
            for (let phones of data) {
              let hr = document.createElement("hr");
              let btnDel = document.createElement("button");
                  btnDel.innerHTML = "Delete " + phones.title;

                 btnDel.addEventListener('click', () => {
                     this.deletePhone(phones.id)
                 })

              //content of output
              let element = Common.toDom(
              `
              <div class="phoneContainer">
              <div class="title h2">${phones.title}</div>
              <div class="img">
                  <img src="https://via.placeholder.com/150">
              </div>
              <div class="description ">${phones.description}</div>
              <div class="price h3">${phones.price} $</div>
              <div></div>
              </div>
              ` 
              )
              this.result.appendChild(element); //showing phones
              this.result.appendChild(btnDel); //showing delete
              this.result.appendChild(hr); //showing delete
                
          }
      })
  } 
    deletePhone(id){
  fetch(`/deletePhones`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        id
    })
  })
  .then((res) => { 
    return res.json()
  })
  .then((data)=>{
    //after a phone is created, do this
    alert(data.deletePhoneResponse);
    //refreshing page
    location.reload();
  });
}
}
export default PhoneHandler;