# Tarefa 3.2 - Mini-proj2

## Preparação do ambiente de trabalho
- Instalação da *Virtual Box* 6.1.6
- Descompactar a VM MSEdge.Win10.VirtualBox e importar o ficheiro .ova
- Criar shared folder com SO host
- Dentro da VM, Instalar os componentes *VS20xx_vc_redist.x64*
- Dentro da VM, Instalar o *WAMP*

**Problema**: Lentidão extrema na *VirtualBox*, tornando-se impraticável trabalhar e realizar testes.

**Solução**: Ativação e utilização do *Hyper-V* no *Windows 10* 

## Código:
*WebConference Admin*, funciona como *link* de *home page*. Estava direcionado para *dashboard.html* (que não existe no código disponível), foi substituído por um *link* para *particpantes.html* (que é página de entrada no *back-office*). Tal como referido, na tarefa 3.1, o *Logout*, redireciona para o *index.html*.

Código original das entidades **Participantes** e **Oradores** está a aceder aos dados e respetiva manipulação através da *Web API*; enquanto as novas entidades **Comissão Científica** e **Voluntários** estão a aceder a dados e à sua manipulação localmente. Na tarefa 3.1 optou-se por utilizar objetos *JSON* para disponibilizar uma "base de dados" que não persiste as alterações, possibilitando a manipulação desses dados apenas em memória. Desta vez, utilizando o *localstorage*, realiza-se a manipulação de dados a nível do armazenamento do próprio *browser* (uma vez que estando o *JavaScript* a executar no *browser*, não tem acesso direto ao disco local do cliente, e para aceder ao servidor necessitaria de realizar um pedido *Http* ao *back-end*).
Desde que não se proceda à limpeza da *cache* do *browser*, os dados e respetivas manipulações permanecem "estáveis" na visão do cliente.

Foi ainda adicionada a função *topFunction* para o foco ser colocado no formulário, quando se pretende alterar um registo a partir da lista.
 Conclui-se que, existindo muito código repetido nos vários ficheiros *js* do *back-office*, o mesmo deveria ser reformulado, centralizando o código reutilizável num *js* de partilha.

## Testes do *Back-office*:
- **Participantes**: operações listar e apagar. Ambas as funcionalidades testadas e funcionais, sem necessidade de qualquer tipo de adaptação. A inserção realiza-se no *front-office* e a listgem e remoção realiza-se no *back-office* (tudo no *front-end*).

- **Oradores**: operações inserir, listar; alterar e apagar. Apesar de diversas pesquisas e tentativas, não consegui ultrapassar os problemas na inserção e alteração de dados do Orador (*speaker*).
Mesmo seguindo as instruções da página 129 do livro recomendado, o máximo que foi possível realizar com sucesso foi associar oradores à conferência 1, tendo associado o Filipe Portela e
o Rui Rodrigues (por exemplo invocando a *API*: https://fcawebbook.herokuapp.com/conferences/1/speakers/2, para associar o orador Filipe à nossa conferência 1). Os métodos atualizar e 
registar Oradores da *API* não funcionam (apesar de retornarem o código *Http* **200 OK**, no retorno surge a mensagem que os campos nome e cargo apenas permitem texto, o que foi visualizado através da extensão *browser* *RESTer*), apenas retornar Oradores.

- **Comissão Científica**: operações inserir, listar; alterar e apagar. Testadas e funcionais.
- **Voluntários**: operações inserir, listar; alterar e apagar. Testadas e funcionais.
- **Sponsors** não disponibilizado no código do livro o ficheiro *sponsors.html*, a não ser como opção de menu lateral na página do *back-office*.

