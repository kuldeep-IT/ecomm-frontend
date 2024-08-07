import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardActionArea, CardMedia, CardContent, Button, Box } from '@mui/material';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    const calculateDiscountPercentage = (mainPrice, discountedPrice) => {
        return ((mainPrice - discountedPrice) / mainPrice * 100).toFixed(2);
    };

    const handleCreateCombo = () => {
        navigate('/combos');
    };

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        }}>
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Box sx={{}} />
                <Typography
                    sx={{ mb: 2, mt: 2, textAlign: 'center', fontWeight: 'bold' }}
                    variant="h4"
                    component="h1"
                    gutterBottom>
                    Product List
                </Typography>

                <Button sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                    variant="contained"
                    color="primary"
                    onClick={handleCreateCombo}
                >
                    Create Combo
                </Button>
            </Box>
            <Grid container spacing={4} sx={{
                mt: 2,
                mb: 6
            }}>
                {products.map(product => {

                    if (!product) return <div>Loading...</div>;

                    return (
                        <Grid item xs={12} sm={6} md={4} key={product._id}>
                            <Card>
                                <CardActionArea component={Link} to={`/products/${product._id}`}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        sx={{ objectFit: 'cover' }}
                                        image={product.imageUrl} // Ensure the image URL is correct
                                        alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Main Price: ${product.mainPrice}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: '700' }}>
                                            Discounted Price: ${product.discountedPrice}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '700' }}>
                                            Discount: {calculateDiscountPercentage(product.mainPrice, product.discountedPrice)}%
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    );
};

export default ProductList;
