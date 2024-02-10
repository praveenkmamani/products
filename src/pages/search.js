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
            const res = await fetch(`https://hvf9284ed5.execute-api.ap-south-1.amazonaws.com/dev/`);
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
        <h2>Searched Products:</h2>
        {product.map((prdt, index) => 
        <div className='product' key={index}>
          <div className='projectName'>{prdt.name}</div>
        </div>)}
        <h2>Recommended Products for suggestion based on user history:</h2>
        {product.map((prdt, index) => 
        <div className='product' key={index}>
          <div className='projectName'>{prdt.recommended}</div>
        </div>)}
        <h2>Stock Details:</h2>
        {product.map((prdt, index) => 
        <div className='product' key={index}>
          <div className='projectName'>{prdt.name} - In stock - 10 units</div>
        </div>)}

    </div>
    );

}