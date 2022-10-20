console.log("JS Funcionando")

const socketCliente = io()

let user

Swal.fire({
    title:"Hola usuario",
    text:"Bienvenido",
    input:"text",
    allowOutsideClick: false
}).then(respuesta=>{
    //console.log(respuesta)
    user = respuesta.value
})

const campo = document.getElementById("messageField")

campo.addEventListener("keydown", (evt)=>{
    console.log(evt.key)
    if(evt.key === "Enter"){
        socketCliente.emit("message",{
            userName: user,
            message: campo.value
        })
    }
})

const messageContainer = document.getElementById("messageContainer")

socketCliente.on("historico",(data)=>{
    let elementos = ""
    data.forEach(item => {
        elementos = elementos + `<p><strong>${item.userName}</strong>:${item.message}</p>`
    });
    //console.log(data)
    messageContainer.innerHTML = elementos
})

socketCliente.on("newUser",()=>{
    Swal.fire({
        text: "Nuevo usuario conectado",
        toast: true
    })
})

