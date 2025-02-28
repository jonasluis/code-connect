const uploadBtn = document.getElementById("upload-btn")
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click()
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader()
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name})
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-imagem")
const nomeDaImagem = document.querySelector(".container-imagem-nome p")


inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0]
    if(arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo)
            imagemPrincipal.src = conteudoDoArquivo.url
            nomeDaImagem.textContent = conteudoDoArquivo.nome
        } catch (erro) {
            console.error("Erro na leitura de arquivo")
        }
    } 
})

const inputTags = document.getElementById("input-tags")

const listaTags = document.getElementById("lista-tags")

listaTags.addEventListener("click", (evento) =>{
    if (evento.target.classList.contains("remove-tag")) {
        const tagRemover = evento.target.parentElement
        listaTags.removeChild(tagRemover)
    }
})

const tagsDisponiveis = ["Front-end", "Back-end", "Full-stack", "Devops", "CyberSecurity", "Data Science", "Mobile"]

async function verificaTagsDisponiveis(tagTexto){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto))
        }, 1000)
    })
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter"){
        evento.preventDefault()
        const tagTexto = inputTags.value.trim()
        if(tagTexto !== "") {
            try{
                const tagExiste = await verificaTagsDisponiveis(tagTexto)
                if(tagExiste){
                    const tagNova = document.createElement("li")
                    tagNova.innerHTML =`<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(tagNova)
                    inputTags.value = ""
                } else {
                    alert("Tag não foi encontrada.")
                }
            } catch (error){
                console.log("Erro ao verificar a existencia da tag")
                alert("Erro ao verificar a existencia da tag. Verifique o console.")
            }
        }
    }
})