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