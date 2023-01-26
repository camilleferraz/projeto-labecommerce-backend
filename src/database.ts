import { TUser } from "./types"
import { TProduct } from "./types"
import { TPurchase } from "./types"
import { ProductCoffee } from "./types"



export const user: TUser[] = [
    {
     id:"joao2013",
     email:"joao2013@email.com",
     password:"joaozinho123"   
    },

    {
        id:"maria2010",
        email:"maria2010@email.com",
        password:"mariazinha123"   
    },

    {
        id:"ceci_fernanda",
        email:"ceci_fernanda@email.com",
        password:"cecilia456"   
    },
]

export const product: TProduct[] = [

    {
        id:"c001",
        name:"Frappe",
        price:3.5,
        category: ProductCoffee.ColdDrinks  
    },

    {
        id:"c002",
        name:"Strawberry Juice",
        price:5.00,
        category:ProductCoffee.FreshDrinks  
    },

    {
        id:"c003",
        name:"Expresso",
        price:1.5,
        category:ProductCoffee.HotDrinks   
    }

]

export const purchase: TPurchase[] = [

    {
        userId: "joao2013",
        productId: "RADIO875",
        quantity: 2,
        totalPrice: 70   
    },

    {
        userId: "ceci_fernanda",
        productId: "GELADEIRA779",
        quantity: 1,
        totalPrice: 2150    
    },

    {
        userId: "maria2010",
        productId: "BOLA779",
        quantity: 5,
        totalPrice: 250    
    }

]

//FUNÇÕES PARA O ARRAY DE USUÁRIOS
const createUser = (id:string,email:string,password:string) =>{

    const newUser = { 
        id:id,
        email:email,
        password:password
    }

    user.push(newUser)

    return console.log("Cadastro realizado com sucesso!")

}

const getAllUsers = ()=>{
    console.log(user)
}


//FUNÇÕES PARA O ARRAY DE PRODUTOS

const createProduct=(id:string, name:string,price:number,category:ProductCoffee)=>{
    const newProduct={
        id:id,
        name:name,
        price:price,
        category:category
    }

    product.push(newProduct)

    return console.log("Produto criado com sucesso!")
}

const getAllProducts=()=>{
    console.log(product)
}

const getProductById = (id:string)=>{
const arrayFiltrado = product.filter((valorId,index,aray)=>{
return valorId.id===id
})

return console.log(arrayFiltrado)
}


const queryProductsByName=(q:string)=>{}

