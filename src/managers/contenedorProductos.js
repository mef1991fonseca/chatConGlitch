const fs = require("fs");
const path = require("path")

//import  fs  from "fs";
//import path from "path"

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = path.join(__dirname,`../files/${nombreArchivo}`);
    }

    save = async(product)=>{
        try {
            //leer el archivo existe
            if(fs.existsSync(this.nombreArchivo)){
                const productos = await this.getAll();
                const idNuevo = productos.reduce((acc,item)=>item.id > acc ? acc = item.id : acc, 0);
                const newProduct={
                    id: idNuevo+1,
                    ...product
                }
                productos.push(newProduct);
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, 2))
                return productos;
            } else{
                // si el archivo no existe
                const newProduct={
                    id:1,
                    ...product
                }
                //creamos el archivo
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([newProduct], null, 2));
            }
        } catch (error) {
            console.log(error);
        }
    }

    getAll = async()=>{
        if(fs.existsSync(this.nombreArchivo)){
            try {
                const contenido = await fs.promises.readFile(this.nombreArchivo,"utf8");
                const productos = JSON.parse(contenido);
                console.log(productos)
                return productos
            } catch (error) {
                console.log(error)
            }
        }
        return {status:'error',message: "No hay productos"}
        
    }

    getById = async(id)=>{
        try {
            if(fs.existsSync(this.nombreArchivo)){
                const productos = await this.getAll();
                const producto = productos.find(item=>item.id===id);
                return producto
            }
        } catch (error) {
            console.log(error)
        }
    }

    deleteById = async(id)=>{
        try {
            const productos = await this.getAll();
            const newProducts = productos.filter(item=>item.id!==id);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(newProducts, null, 2));
        }catch (error) {
            console.log(error)
        }
    }

    updateById = async(id, body)=>{
        try {
            const productos = await this.getAll()
            const productPos = productos.findIndex(elm=>elm.id === id)
            productos[productPos] = {
                id:id,
                ...body
            }
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, 2))
            return productos
        }catch (error) {
            console.log(error)
        }
    }
}

module.exports = Contenedor;

//export { Contenedor }