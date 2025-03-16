import ProductsModel from '../Model/ProductsModel.js'

// get all products from the mongodb
export const getProducts = async (req, res) => {
    const products = await ProductsModel.find({})
    res.send(products)
}

// get product by id from mongodb
export const getProductsbyID = async (req, res) => {

    let id = req.params.id;
    console.log('id',id)
    ProductsModel.findById(id).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
}

// get products of a specified category name from mongodb
export const getCategoryProducts = async (req, res) => {
    
    let cat_name = req.params.name;
    console.log('category',cat_name)
    ProductsModel.find({category : cat_name}).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send(err)
    })

}