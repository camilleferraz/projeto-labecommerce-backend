import express, { Request, Response } from "express";
import cors from 'cors';
import {user,product,purchase} from "./database"
import { TProduct,ProductCoffee,TUser,TPurchase } from "./types";

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
  });


  app.get('/user',(req:Request, res:Response)=>{
    res.status(200).send(user)
  })

  app.get('/products',(req:Request, res:Response)=>{
    res.status(200).send(product)
  })

  app.get('/products/search',(req:Request, res:Response)=>{
  const q = req.query.q as string

    const result: TProduct[] = product.filter(
        (product)=>product.name.toLowerCase().includes(q.toLowerCase())
    )

    res.status(200).send(result)
  })

  app.post('/user',(req:Request, res:Response)=>{
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string
    

    const newUser: TUser = {
        id,
        email,
        password
    }

    user.push(newUser)

    res.status(201).send("Cadastro de usuário realizado com sucesso!")

  })

  app.post('/products',(req:Request, res:Response)=>{
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as ProductCoffee

    const newProduct: TProduct = {
        id,
        name,
        price,
        category
    }

    product.push(newProduct)

    res.status(201).send("Cadastro de produto realizado com sucesso!")

  })

  app.post('/purchase',(req:Request, res:Response)=>{
    const userId = req.body.userid as string
    const productId = req.body.productId as string
    const quantity = req.body.quantity as number
    const totalPrice = req.body.totalPrice as number

    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchase.push(newPurchase)

    res.status(201).send("Compra Realizada com sucesso")

  })

  app.get('/products/:id',(req:Request,res:Response)=>{

    try {
    const id = req.params.id

    const result = product.find((product)=>product.id===id)

    if(!result){
      res.status(404)
      throw new Error ("Produto não encontrado. Verifique a id")
  }

    res.status(200).send("Produto encontrado!")
    
  } catch (error:any) {
    console.log(error)

    if(res.statusCode === 200){
        res.status(500)
    }
    res.send(error.message)}
    
  })

  app.get ('/users/:id/purchases', (req:Request, res:Response)=>{
    const id = req.params.id

    const result = purchase.find((purchase)=>purchase.userId===id)
    
    res.status(200).send(result)
  })

  app.delete('/users/:id',(req:Request,res:Response)=>{
    const id = req.params.id

    if (id[0] !== "c") {
      res.status(400)
      throw new Error ("Id inválida, deve começar com a letra c")
    }

    const userIndex = user.findIndex((user)=>user.id===id)

    if(userIndex>=0){
      user.splice(userIndex,1)
    }
    res.status(200).send("User deletado com sucesso!")
  })

  app.delete('/products/:id',(req:Request,res:Response)=>{

    try {
    const id = req.params.id

    const productIndex = product.findIndex((product)=>product.id===id)

    if(productIndex>=0){
      product.splice(productIndex,1)
    }
    res.status(200).send("Produto deletado com sucesso!")
    
  } catch (error:any) {
      console.log(error)

    if(res.statusCode === 200){
        res.status(500)
    }
    res.send(error.message)}
    
    
    
  })

  app.put('/users/:id',(req:Request,res:Response)=>{
    const id = req.params.id

    const newId = req.body.id as string| undefined
    const newEmail = req.body.email as string| undefined
    const newPassword = req.body.password as string| undefined

    const users = user.find((user)=>user.id===id)

    if(users){
     users.id = newId || users.id
     users.email= newEmail||users.email
     users.password=newPassword||users.password
    }
    res.status(200).send("Atualização realizada com sucesso!")
  })

  app.put('/products/:id',(req:Request,res:Response)=>{
  try {
    const id = req.params.id

    const newId = req.body.id
    const newName = req.body.name
    const newPrice = req.body.price
    const newCategory = req.body.category

    const products: TProduct | undefined = product.find((products)=>products.id === id)

    if(!products){
      res.status(400)
      throw new Error ("Produto não encontrado. Verifique a id")
    } else{ products.id = newId || products.id
      products.name = newName || products.name
      products.category=newCategory||products.category
 
      products.price = isNaN(newPrice) ? products.price : newPrice
 
     }

     if (newId !== undefined){
      if(typeof newId !== "string") {
        res.status(400)
        throw new Error(" A nova id deve ser string")
     }

     if (newName !== undefined){
      if(typeof newName !== "string") {
        res.status(400)
        throw new Error(" O novo nome deve ser string")
     }
    }

    if (newPrice !== undefined){
      if(typeof newPrice !== "number") {
        res.status(400)
        throw new Error(" O novo preço deve ser number")
     }
    }

    if (newCategory !== undefined){
      if(typeof newPrice !== "string") {
        res.status(400)
        throw new Error(" O novo preço deve ser number")
     }
    }

    }
     res.status(200).send("Atualização realizada com sucesso!")
    }
    catch (error:any) {
    console.log(error)

    if(res.statusCode === 200){
        res.status(500)
    }
    res.send(error.message)}
    
  })