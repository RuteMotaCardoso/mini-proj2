const urlBase = "https://fcawebbook.herokuapp.com"
let isNew = true


//***********************************************************************************************************************/
//ARRAY COM LISTA DE MEMBROS DE COMISSÃO CIENTÍFICA 

//***********************************************************************************************************************/
var membrosComissao = [
    {"idMembro":1,"nome":"Tim Berners-Lee","instituto":"Universidade de Southampton","pais":"Reino Unido","active":null},
    {"idMembro":2,"nome":"Larry Page","instituto":"Universidade de Stanford","pais":"Estados Unidos da América","active":null},
    {"idMembro":3,"nome":"Robert Kahn","instituto":"Instituto de Tecnologia de Massachusetts","pais":"Estados Unidos da América","active":null},
    {"idMembro":4,"nome":"Vint Cerf","instituto":"Universidade de Stanford","pais":"Estados Unidos da América","active":null},
]

function loadMembros() {
    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('membrosComissao')

    if (retrievedObject != null) {
        console.log('retrievedMembrosComissao: ', JSON.parse(retrievedObject))
        membrosComissao = JSON.parse(retrievedObject);
    }
}

function saveMembros() {
    // Put the object into storage
    localStorage.setItem('membrosComissao', JSON.stringify(membrosComissao))
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

 window.onload = () => {
    const btnLogout = document.getElementById("logout")
    // "logout" da área privada do back-office
    btnLogout.addEventListener("click", function() {
      // Teste
      window.location.replace("../index.html")  
    });
  
    loadMembros()

    // References to HTML objects   
    const tblMembros = document.getElementById("tblMembros")
    const frmMembro = document.getElementById("frmMembro")
  

//***********************************************************************************************************************/
//FORMULÁRIO DE MEMBRO DA LISTA DE MEMBROS DE COMISSÃO CIENTÍFICA 
// ********************   OPERAÇÕES DE INSERIR E ALTERAR SÃO EFETUADAS APENAS EM MEMÓRIA!/LocalStorage   ****************/
//***********************************************************************************************************************/
    frmMembro.addEventListener("submit", async (event) => {
        event.preventDefault()
        const txtName = document.getElementById("txtName").value
        const txtInstituto = document.getElementById("txtInstituto").value
        const txtPais = document.getElementById("txtPais").value
        let txtMembroId = document.getElementById("txtMembroId").value
        if (txtMembroId === "")
            txtMembroId = MembrosComissao.length+1;

        // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de um membro da comissão
        let response
        if (isNew) {
            // Adiciona Membro ao array da Comissão Científica em memória
            const newComissao = {
                "idMembro":txtMembroId,
                "nome":txtName,
                "foto":"",
                "instituto":txtInstituto,
                "pais":txtPais
             };
            membrosComissao.push(newComissao)
            saveMembros()
        } else {
            // Atualiza Membro da Comissão Científica em memória
            const newComissao = {
                "idMembro":txtMembroId,
                "nome":txtName,
                "foto":"",
                "instituto":txtInstituto,
                "pais":txtPais
             };
            let posEditar = membrosComissao.findIndex(x => x.idMembro == txtMembroId)
            membrosComissao[posEditar] = newComissao
            saveMembros()
        }
        isNew = true
        renderMembros()
    })



    const renderMembros = async () => {
        frmMembro.reset()
        //***********************************************************************************************************************/
        //FORMATAR TABELA DE APRESENTAÇÃO DA LISTA DE MEMBROS DE COMISSÃO CIENTÍFICA 
        //***********************************************************************************************************************/
        let strHtml = `
            <thead >
                <tr><th class='w-100 text-center bg-warning' colspan='5'>Lista de Membros da Comissão Científica</th></tr>
                <tr class='bg-info'>
                    <th class='w-2'>#</th>
                    <th class='w-30'>Nome</th>
                    <th class='w-38'>Universidade</th>              
                    <th class='w-10'>País</th>              
                    <th class='w-10'>Alterar</th>              
                </tr> 
            </thead><tbody>
        `

        //***********************************************************************************************************************/
        //APRESENTAR LISTA DE MEMBROS DE COMISSÃO CIENTÍFICA 
        //***********************************************************************************************************************/
        const membros = membrosComissao
        let i = 1
        for (const membro of membros) {
            strHtml += `
                <tr>
                    <td>${i}</td>
                    <td>${membro.nome}</td>
                    <td>${membro.instituto}</td>
                    <td>${membro.pais}</td>
                    <td>
                        <i id='${membro.idMembro}' class='fas fa-edit edit'></i>
                        <i id='${membro.idMembro}' class='fas fa-trash-alt remove'></i>
                    </td>
                </tr>
            `
            i++
        }
        strHtml += "</tbody>"
        tblMembros.innerHTML = strHtml


        //***********************************************************************************************************************/
        //EDITAR MEMBRO DA LISTA DE MEMBROS DE COMISSÃO CIENTÍFICA  --> colocar dados no formulário
        //***********************************************************************************************************************/
        // Gerir o clique no ícone de Editar        
        const btnEdit = document.getElementsByClassName("edit")
        for (let i = 0; i < btnEdit.length; i++) {
            btnEdit[i].addEventListener("click", () => {
                topFunction()
                isNew = false
                for (const membro of membros) {
                    if (membro.idMembro == btnEdit[i].getAttribute("id")) {
                        document.getElementById("txtMembroId").value = membro.idMembro
                        document.getElementById("txtName").value = membro.nome
                        document.getElementById("txtInstituto").value = membro.instituto
                        document.getElementById("txtPais").value = membro.pais
                    }
                }
            })
        }




        //***********************************************************************************************************************/
        //REMOVER MEMBRO DA LISTA DE MEMBROS DE COMISSÃO CIENTÍFICA em MEMÓRIA!

        //***********************************************************************************************************************/
        // Gerir o clique no ícone de Remover        
        const btnDelete = document.getElementsByClassName("remove")
        for (let i = 0; i < btnDelete.length; i++) {
            btnDelete[i].addEventListener("click", () => {
                swal({
                    title: 'Tem a certeza?',
                    text: "Não será possível reverter a remoção!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Remover'
                }).then( () => {
                    let memberId = btnDelete[i].getAttribute("id")
                    let posApagar = membrosComissao.findIndex(x => x.idMembro == memberId)
                    if (posApagar >= 0) {
                        membrosComissao.splice(posApagar, 1)
                        saveMembros()
                        swal('Removido!', 'O membro da Comissão Científica foi removido da Conferência.', 'success')
                    } else {
                        swal('Erro!', 'O membro da Comissão Científica não foi encontrado na Conferência.', 'error')
                    }
                    renderMembros()
                })
            })
        }
    }
    renderMembros()
}