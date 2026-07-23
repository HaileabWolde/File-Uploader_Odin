

const dialog = document.getElementById('dialog')
const dialogModal = document.getElementById('dialogModal')
const cancelButton = document.getElementById('cancelFolderButton')

const folderbutton = document.getElementById('add_folderbutton');


folderbutton.addEventListener("click", ()=>{
    dialogModal.classList.remove('hidden')
    dialog.showModal()
})

// file modal
const filemodalButton = document.getElementById('add_filebutton')
const filedialogModal = document.getElementById('filedialogModal')
const filedialog  = document.getElementById('filedialog')
const cancelFileButton = document.getElementById('cancelFileButton')


if (filemodalButton) {
    filemodalButton.addEventListener("click", () => {
        filedialogModal.classList.remove('hidden')
        filedialog.showModal()
    })
}

if (cancelFileButton) {
    cancelFileButton.addEventListener('click', () => {
        filedialogModal.classList.add('hidden')
        filedialog.close()
    })
}

if(cancelButton){
    //Cance the modal dialog
cancelButton.addEventListener('click', ()=> {
      dialog.close()
      dialogModal.classList.add('hidden');  
   // stops form submission
    
})
}

const delete_folderbutton = document.getElementById('delete_folderbutton')
const deletedialogModal = document.getElementById('deletedialogModal')
const dialogDiv = document.getElementById('dialogdeleteDiv')
const canceldeleteButton = document.getElementById('canceldeleteButton')

if (delete_folderbutton && deletedialogModal && dialogDiv) {
    delete_folderbutton.addEventListener('click', () => {
        console.log("clicked")
        deletedialogModal.classList.remove('hidden')
        dialogDiv.showModal()
    })
}

//Cance the modal dialog
canceldeleteButton.addEventListener('click', ()=> {
     dialogDiv.close()
      deletedialogModal.classList.add('hidden');        // stops form submission
    
})

//toogle Folder
document.querySelectorAll('.togglechildrenIcon').forEach(toggle => {
    toggle.addEventListener('click', () => {
         const icon = toggle.querySelector('.toggleicon')
        const childrenList = toggle.querySelector('.childrenList')
        
        icon.classList.toggle('rotate-270')
        childrenList.classList.toggle('hidden')
    })
})

document.getElementById('toggleIcon').addEventListener('click', ()=>{
    const toggleIcondirection = document.getElementById('toggleIcondirection')
    const folderList  = document.getElementById('folderList')

    toggleIcondirection.classList.toggle('rotate-270')
    folderList.classList.toggle('hidden')
})

document.querySelectorAll('.subcontainer').forEach((sub)=> {
    sub.addEventListener('click', (e)=>{
        e.stopPropagation();
        const icon = sub.querySelector('.subtoggleicon')
         const childrenList = sub.querySelector('.subchildrenList')
         icon.classList.toggle('rotate-270')
        childrenList.classList.toggle('hidden')
    })
})



