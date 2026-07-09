


const dialog = document.getElementById('dialog')
const dialogModal = document.getElementById('dialogModal')
const cancelButton = document.getElementById('cancelButton')

const folderbutton = document.getElementById('add_folderbutton');



folderbutton.addEventListener("click", ()=>{
    dialogModal.classList.remove('hidden')
    dialog.showModal()
})


//Cance the modal dialog
cancelButton.addEventListener('click', ()=> {
      dialog.close()
      dialogModal.classList.add('hidden');        // stops form submission
    
})