import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './search.css';
import LoadingSpinner from '@/app/components/laodingspinner';

export default function searchproducts() {
    const [loading, setLoading] = useState(false)
    const [product, setproduct] = useState([])
    const callAPI = async () => {
        try {
            setLoading(true)
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            const data = await res.json();
            console.log(data);
            setLoading(false)
            setproduct(data);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    return (
    <div className='search'>
        {loading === false && product ?
        <div className='searchproducts'>
            <h1>Enter the products to search</h1>
            <TextField id="standard-basic" label="Search..." variant="standard" />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={callAPI}
                >
                Search
            </Button>
        </div>
        : <LoadingSpinner/>}
        {product.map((prdt, index) => 
        <div className='product' key={index}>
          <div className='projectName'>{prdt.title}</div>
        </div>)}
    </div>
    );

}