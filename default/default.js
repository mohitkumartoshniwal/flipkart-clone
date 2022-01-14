
import Product from '../model/product.js';
import { products } from './products.js';

const DefaultData = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(products);

        console.log('Data imported Successfully');

    } catch (error) {
        console.log('Error: ', error.message);
    }
}

export default DefaultData;