export type TUser = {
    id: string,
    email:string,
    password:string
    }
    
    export type TProduct ={
        id: string,
        name: string,
        price: number,
        category: ProductCoffee
    }
    
    export type TPurchase = {
        userId:string,
        productId:string,
        quantity:number,
        totalPrice:number
    
    }
    
    export enum ProductCoffee {
        ColdDrinks="Cold Drinks",
        HotDrinks="Hot Drinks",
        FreshDrinks="Fresh Drinks"
    
    }