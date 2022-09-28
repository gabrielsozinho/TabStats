var submitButton = document.querySelector('#button-get-form-data')
var usernameField = document.querySelector('#username')
var content = document.querySelector('#info-container')
var contentInfo = document.querySelector('#infos')
var contentUsername = document.querySelector('#username-container')
var contentFeatures = document.querySelector('#features')
var contentDate = document.querySelector('#created-date')
var contentUpdatedDate = document.querySelector('#updated-date')
var refreshButton = document.querySelector('#refresh')



refreshButton.addEventListener('click', function() {
    location.reload()
})


submitButton.addEventListener('click', run)



function run(event) {
    event.preventDefault();
    
    if (content.className == "open") {
        content.className = "";
    } else {
        content.className = "open"
    }

    const features =  {
        "read:session": "Ler sessão",
        "create:session": "Criar sessão", 
        "create:content": "Publicar conteúdos", 
        "create:content:text_root": "Publicar conteúdos raízes",
        "create:content:text_child": "Publicar conteúdos filhos (comentários)", 
        "update:content": "Atualizar conteúdos", "update:user": "Atualizar usuário",
        "read:migration": "Ler migrações", 
        "create:migration": "Criar migrações", 
        "update:content:others": "Editar conteúdos de outros usuários", 
        "ban:user": "Banir usuários"
    }

    var username = usernameField.value;

    axios.get(`https://www.tabnews.com.br/api/v1/users/${username}`)
    .then(function (response) {
        
        if (response.data.erro) {
            throw new Error('Username inválido')
        }

        createUsernameLine(username, `https://www.tabnews.com.br/${username}`)

        
        formatDate(response.data.created_at)
        formatUpdatedDate(response.data.updated_at)

        createInfoLine(`Tabcoins: ${response.data.tabcoins}`)
        createInfoLine(`Tabcash: ${response.data.tabcash}`)

        response = response.data.features

        for (let feature in response){
            createFeatureLine( features[response[feature]] )
        }
        
        var formElement = document.getElementById("form-container");
        formElement.parentNode.removeChild(formElement);
    })
    .catch(function (error) {
        createLine('Ops, parece que esse username não pertence a um usuário do TabNews!')
        
    })
}

function formatDate(date) {
    var year = date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3)
    var month = date.charAt(5) + date.charAt(6)
    var day = date.charAt(8) + date.charAt(9)

    var info = document.createElement('p')
    info.classList.add('a');
    var text = document.createTextNode(`${day}/${month}/${year}`)
    info.classList.add('created');

    info.appendChild(text)
    contentDate.appendChild(info)
}

function formatUpdatedDate(date) {
    var year = date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3)
    var month = date.charAt(5) + date.charAt(6)
    var day = date.charAt(8) + date.charAt(9)

    var info = document.createElement('p')
    info.classList.add('a');
    var text = document.createTextNode(`${day}/${month}/${year}`)
    info.classList.add('created');

    info.appendChild(text)
    contentUpdatedDate.appendChild(info)
}


function createLine(text) {
    var info = document.createElement('p')
    info.classList.add('a');
    var text = document.createTextNode(text)
    
    info.appendChild(text)
    content.appendChild(info)
}

function createUsernameLine(text, userLink) {
    var info = document.createElement('a')
    info.setAttribute('href', userLink);
    info.classList.add('username');
    var text = document.createTextNode(text)
    
    info.appendChild(text)
    contentUsername.appendChild(info)

    
}

function createInfoLine(text) {
    var info = document.createElement('p')
    info.classList.add('info');
    var text = document.createTextNode(text)
    
    info.appendChild(text)
    contentInfo.appendChild(info)
}


function createFeatureLine(text) {

    var line = document.createElement('p')
    line.classList.add('feature')
    var text = document.createTextNode('- ' + text)

    line.appendChild(text)
    contentFeatures.appendChild(line)
}