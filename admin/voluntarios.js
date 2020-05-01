const urlBase = "https://fcawebbook.herokuapp.com"
let isNew = true


//***********************************************************************************************************************/
//ARRAY COM LISTA DE VOLUNTÁRIOS

//***********************************************************************************************************************/

var Voluntarios = [
    {"idVoluntario":1,"nome":"Sara Silva","email":"sara.silva@uab.pt","cargo":"Estudante","habilitacao":"Secundário","lingua":"Inglês","area":"Receção","active":null},
    {"idVoluntario":2,"nome":"Duarte Oliveira","email":"duarte.oliveira@uab.pt","cargo":"Estudante","habilitacao":"Licenciatura","lingua":"Inglês","area":"Receção","active":null},
    {"idVoluntario":3,"nome":"Maria Inês Castro","email":"maria.castro@uab.pt","cargo":"Estudante","habilitacao":"Licenciatura","lingua":"Inglês","area":"Guardaroupa","active":null},
    {"idVoluntario":4,"nome":"Pedro Duarte","email":"pedro.duarte@uab.pt","cargo":"Estudante","habilitacao":"Secundário","lingua":"Frances","area":"Guardaroupa","active":null},
    {"idVoluntario":5,"nome":"Francisco Pinto","email":"francisco.pinto@uab.pt","cargo":"Estudante","habilitacao":"Licenciatura","lingua":"Inglês","area":"Apoio nas Salas","active":null},
    {"idVoluntario":6,"nome":"Diana Telles","email":"diana.telles@uab.pt","cargo":"Estudante","habilitacao":"Licenciatura","lingua":"Alemão","area":"Apoio nas Salas","active":null},
    {"idVoluntario":7,"nome":"Ana Campos","email":"ana.campos@uab.pt","cargo":"Estudante","habilitacao":"Licenciatura","lingua":"Inglês","area":"Apoio nos Corredores","active":null},
    {"idVoluntario":8,"nome":"José Jesualdo","email":"jose.jesualdo@uab.pt","cargo":"Estudante","habilitacao":"Licenciatura","lingua":"Inglês","area":"Apoio nos Corredores","active":null},
    {"idVoluntario":9,"nome":"Ricardo Jorge","email":"ricardo.jorge@uab.pt","cargo":"Estudante","habilitacao":"Licenciatura","lingua":"Inglês","area":"Apoio aos Oradores e Membros da Comissão","active":null},
    {"idVoluntario":10,"nome":"André Antunes","email":"andre.antunes@uab.pt","cargo":"Estudante","habilitacao":"Licenciatura","lingua":"Inglês","area":"Apoio aos Oradores e Membros da Comissão","active":null},
]

function loadVoluntarios() {
    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('Voluntarios')

    if (retrievedObject != null) {
        console.log('retrievedVoluntarios: ', JSON.parse(retrievedObject))
        Voluntarios = JSON.parse(retrievedObject);
    }
}

function saveVoluntarios() {
    // Put the object into storage
    localStorage.setItem('Voluntarios', JSON.stringify(Voluntarios))
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
  
    loadVoluntarios()

    // References to HTML objects   
    const tblVoluntarios = document.getElementById("tblVoluntarios")
    const frmVoluntario = document.getElementById("frmVoluntario")
  

//***********************************************************************************************************************/
//FORMULÁRIO DE VOLUNTÁRIOS 
// ********************   OPERAÇÕES DE INSERIR E ALTERAR SÃO EFETUADAS APENAS EM MEMÓRIA!/LocalStorage   ****************/
//***********************************************************************************************************************/

    frmVoluntario.addEventListener("submit", async (event) => {
        event.preventDefault()
        const txtName = document.getElementById("txtName").value
        const txtEmail = document.getElementById("txtEmail").value
        const txtJob = document.getElementById("txtJob").value
        const txtHab = document.getElementById("txtHabilitacao").value
        const txtLingEst = document.getElementById("txtLinguaEstrangeira").value
        const txtArea = document.getElementById("txtArea").value
        
        let txtVoluntarioId = document.getElementById("txtVoluntarioId").value
        if (txtVoluntarioId === "")
            txtVoluntarioId = Voluntarios.length+1;

        // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de um voluntário
        let response
        if (isNew) {
            // Adiciona Voluntário ao array de Voluntários em memória
            const newVoluntario = {
                "idVoluntario":txtVoluntarioId,
                "nome":txtName,
                "email":txtEmail,
                "cargo":txtJob,
                "habilitacao":txtHab,
                "lingua":txtLingEst,
                "area":txtArea
             };
            Voluntarios.push(newVoluntario)
            saveVoluntarios()
        } else {
            // Atualiza Voluntário em memória
            const newVoluntario = {
                "idVoluntario":txtVoluntarioId,
                "nome":txtName,
                "email":txtEmail,
                "cargo":txtJob,
                "habilitacao":txtHab,
                "lingua":txtLingEst,
                "area":txtArea
             };
             let posEditar = Voluntarios.findIndex(x => x.idVoluntario == txtVoluntarioId)
             Voluntarios[posEditar] = newVoluntario
             saveVoluntarios()
            }
        isNew = true
        renderVoluntarios()
    })


    const renderVoluntarios = async () => {
        frmVoluntario.reset()

    //***********************************************************************************************************************/
    //FORMATAR TABELA DE APRESENTAÇÃO DA LISTA DE VOLUNTÁRIOS
    //***********************************************************************************************************************/

        let strHtml = `
            <thead >
                <tr><th class='w-100 text-center bg-warning' colspan='5'>Lista de Voluntários</th></tr>
                <tr class='bg-info'>
                    <th class='w-2'>#</th>
                    <th class='w-40'>Nome</th>
                    <th class='w-10'>Língua Estrangeira</th>              
                    <th class='w-10'>Área</th>              
                    <th class='w-10'>Alterar</th>              
                </tr> 
            </thead><tbody>
        `
        
        
        //***********************************************************************************************************************/
        //APRESENTAR LISTA DE VOLUNTÁRIOS

        //***********************************************************************************************************************/
        const voluntarios = Voluntarios;
        let i = 1
        for (const voluntario of voluntarios) {
            strHtml += `
                <tr>
                    <td>${i}</td>
                    <td>${voluntario.nome}</td>
                    <td>${voluntario.lingua}</td>
                    <td>${voluntario.area}</td>                    
                    <td>
                        <i id='${voluntario.idVoluntario}' class='fas fa-edit edit'></i>
                        <i id='${voluntario.idVoluntario}' class='fas fa-trash-alt remove'></i>
                    </td>
                </tr>
            `
            i++
        }
        strHtml += "</tbody>"
        tblVoluntarios.innerHTML = strHtml


        //***********************************************************************************************************************/
        //EDITAR VOLUNTÁRIO --> colocar dados no formulário
        //***********************************************************************************************************************/
        // Gerir o clique no ícone de Editar        
        const btnEdit = document.getElementsByClassName("edit")
        for (let i = 0; i < btnEdit.length; i++) {
            btnEdit[i].addEventListener("click", () => {
                topFunction()
                isNew = false
                for (const voluntario of Voluntarios) {
                    if (voluntario.idVoluntario == btnEdit[i].getAttribute("id")) {
                        document.getElementById("txtVoluntarioId").value = voluntario.idVoluntario
                        document.getElementById("txtName").value = voluntario.nome
                        document.getElementById("txtEmail").value = voluntario.email
                        document.getElementById("txtJob").value = voluntario.cargo
                        document.getElementById("txtHabilitacao").value = voluntario.habilitacao
                        document.getElementById("txtLinguaEstrangeira").value = voluntario.lingua
                        document.getElementById("txtArea").value = voluntario.area
                    }
                }
            })
        }

        //***********************************************************************************************************************/
        //REMOVER VOLUNTÁRIO em MEMÓRIA!/LocalStorage

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
                    let voluntarioId = btnDelete[i].getAttribute("id")
                    let posApagar = Voluntarios.findIndex(x => x.idVoluntario == voluntarioId)
                    if (posApagar >= 0) {
                        Voluntarios.splice(posApagar, 1)
                        saveVoluntarios()
                        swal('Removido!', 'O voluntário foi removido da Conferência.', 'success')
                    } else {
                        swal('Erro!', 'O voluntários não foi encontrado na Conferência.', 'error')
                    }
                    renderVoluntarios()
                })
            })
        }
    }
    renderVoluntarios()
}