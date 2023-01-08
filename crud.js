/* Variables */
const submitBtn = document.querySelector('.input-section__submit-btn');
const memberList = document.querySelector('.member-container');
const crudForm = document.querySelector('.formulario-crud');
let members = [];
let itemId = null;


const updateBtn = document.querySelector('.input-edit__submit-btn')
let editName = document.querySelector('.input-edit__name-input');
let editRol = document.querySelector('.input-edit__puesto-input');
let editStatus = document.querySelector('.input-edit__estatus-input');
let editAccess = document.querySelector('.input-edit__permiso-input');




/* Event handler  */

eventListener();
function eventListener (){
    submitBtn.addEventListener('click', addMember);

    document.addEventListener('DOMContentLoaded', ()=>{
        members = JSON.parse(localStorage.getItem('member')) || [];

        renderMember();
    })
}


/* Functions  */

function addMember(e){
    e.preventDefault();

    // Getting the member information and creating an object
    const member = {
    nombre : document.querySelector('.input-section__name-input').value,
    puesto : document.querySelector('.input-section__puesto-input').value,
    estatus : document.querySelector('.input-section__estatus-input').value,
    permiso : document.querySelector('.input-section__permiso-input').value,
    id: Date.now()
    }

    console.log(member);

    // Adding the member into our initial array 
    members = [...members, member]; 
    renderMember();
    crudForm.reset();

}

function renderMember(){

    cleanHTML();

    if(members.length > 0){
        members.forEach(member =>{

            // Render the member 
            const row = document.createElement('tr');
            row.innerHTML = `
                <td> ${member.nombre} </td>
                <td> ${member.puesto} </td>
                <td> ${member.estatus} </td>
                <td> ${member.permiso} </td>  
                <td> <button class="member-button__edit" onClick="editMember(${member.id})">Editar</button></td>  
                <td> <button class="member-button__delete" onClick="deleteMember(${member.id})">Borrar </button></td>     
            `;
            memberList.appendChild(row);
        });
    }
    
    // Saving the member in LocalStorage
    savingMember();
}




// Edit member 
function editMember(id){
    console.log(id);

    itemId = id;

    members.forEach(member =>{
        
        if(member.id === itemId){

            const {nombre, puesto, estatus, permiso} = member;

            editName.placeholder = nombre;
            editRol.placeholder = puesto;
            editAccess.placeholder = permiso;
            editStatus.placeholder = estatus;

            console.log(itemId + ':' + member.id);
        } 
     });

     
    // Updating the HTML
    updateBtn.addEventListener('click', () =>{
        let editedMember = {
            nombre : document.querySelector('.input-edit__name-input').value,
            puesto : document.querySelector('.input-edit__puesto-input').value,
            estatus : document.querySelector('.input-edit__estatus-input').value,
            permiso : document.querySelector('.input-edit__permiso-input').value,
            id : Date.now()
        }        
        members = [...members,editedMember].slice(1);
        console.log(JSON.stringify(members));
        renderMember();
        console.log(JSON.stringify(editedMember));
        editedMember = [];
        id = null;
        console.log(editedMember);



    });
}

// Delete member 
function deleteMember(id){
    members = members.filter(member => member.id !== id);

    // Updating the HTML 
    renderMember();
}


// Adding member info in LocalStorage
function savingMember(){
    localStorage.setItem('member', JSON.stringify(members));
}


// Clean the HTML to dismiss duplicates 
function cleanHTML(){
    while(memberList.firstChild){
        memberList.removeChild(memberList.firstChild);
    }
}