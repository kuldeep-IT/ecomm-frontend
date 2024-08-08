import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Container sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
                404
            </Typography>
            <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
                Page Not Found
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 5 }}>
                Sorry, the page you are looking for does not exist. You can always go back to the homepage.
            </Typography>
            <Box>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default NotFoundPage;
