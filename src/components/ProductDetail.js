import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Container, Card, CardContent, CardMedia, Button, Box } from '@mui/material';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`/api/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!product) return <div>Loading...</div>;

    const discountPercentage = ((product.mainPrice - product.discountedPrice) / product.mainPrice * 100).toFixed(2);

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>

            <Typography
                sx={{ flexGrow: 1, mb: 2, mt: 2, textAlign: 'center', fontWeight: 'bold' }}
                variant="h4"
                component="h1"
                gutterBottom>
                Product List
            </Typography>

            <Card elevation={5} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ objectFit: 'contain', width: '300px', height: '300px', ml: 2 }}
                    image={product.imageUrl}
                    alt={product.name}
                />
                <CardContent sx={{ flex: 1, px: 3 }}>
                    <Typography variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                        {product.description}
                    </Typography>
                    <Typography variant="h6">
                        Price: ${product.mainPrice}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Discounted Price: ${product.discountedPrice}
                    </Typography>
                    <Typography variant="body1" color="text.primary" sx={{ marginBottom: 2 }}>
                        Discount: {discountPercentage}%
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="contained" color="primary">
                            Add to Cart
                        </Button>
                        <Button variant="contained" color="secondary">
                            Buy Now
                        </Button>
                    </Box>
                </CardContent>
            </Card>

        </Container>
    );
};

export default ProductDetail;
