import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, Typography, Container, Card, CardContent, CardMedia, Grid, Box, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ComboList = () => {
    const [combos, setCombos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/combos')
            .then(response => {
                setCombos(response.data.combos);
                setLoading(false);
            })
            .catch(error => {
                console.error(error)
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <Typography
                sx={{ flexGrow: 1, mb: 2, mt: 2, textAlign: 'center', fontWeight: 'bold' }}
                variant="h4"
                component="h1"
                gutterBottom>
                Combo Deals
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <List>
                    {combos.map(combo => (
                        <ListItem key={combo._id}>
                            <Card variant="outlined" elevation={8} sx={{ width: '100%', mb: 2, boxShadow: 5 }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            mt: 2
                                        }}
                                        variant='h5'
                                        color="text.secondary"
                                        align="center"
                                    >
                                        Combo Price is
                                        <Box component="span" sx={{ color: 'black' }}>${combo.comboPrice}</Box>
                                        and you are saving
                                        <Box component="span" sx={{ color: 'black' }}>${combo.discountPercentage}%</Box>
                                    </Typography>
                                </Box>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={5}>
                                            <CardMedia
                                                component="img"
                                                image={combo.product1.imageUrl}
                                                alt={combo.product1.name}
                                                sx={{ height: "300px", width: "100%" }}
                                            />
                                            <Typography sx={{
                                                mt: 1.5
                                            }} variant="h6" component="div">
                                                {combo.product1.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Main Price: ${combo.product1.mainPrice}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Discounted Price: ${combo.product1.discountedPrice}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} container justifyContent="center">
                                            <AddIcon fontSize="large" />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <CardMedia
                                                component="img"
                                                image={combo.product2.imageUrl}
                                                alt={combo.product2.name}
                                                sx={{ height: "300px", width: "100%" }}
                                            />
                                            <Typography sx={{
                                                mt: 1.5
                                            }} variant="h6" component="div">
                                                {combo.product2.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Main Price: ${combo.product2.mainPrice}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Discounted Price: ${combo.product2.discountedPrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))}
                </List>)}
        </Container>
    );
};

export default ComboList;
