


const dialog = document.getElementById('dialog')
const dialogModal = document.getElementById('dialogModal')
const cancelButton = document.getElementById('cancelFolderButton')

const folderbutton = document.getElementById('add_folderbutton');



folderbutton.addEventListener("click", ()=>{
    dialogModal.classList.remove('hidden')
    dialog.showModal()
})

//Cance the modal dialog
cancelButton.addEventListener('click', ()=> {
      dialog.close()
      dialogModal.classList.add('hidden');  
   // stops form submission
    
})


// file modal
const filemodalButton = document.getElementById('add_filebutton')
const filedialogModal = document.getElementById('filedialogModal')
const filedialog  = document.getElementById('filedialog')
const cancelFileButton = document.getElementById('cancelFileButton')


filemodalButton.addEventListener("click", ()=>{
   
    filedialogModal.classList.remove('hidden')
    filedialog.showModal()
})

cancelFileButton.addEventListener('click', ()=> {
   filedialogModal.classList.add('hidden')
    filedialog.close()    
})
