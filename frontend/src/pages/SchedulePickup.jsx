import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Divider,
  Snackbar,
  Alert,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Logo from '../images/schedule.jpg'; // Replace with your own image

const URL = "http://localhost:4000/appointments"; // You can replace this with your actual URL

function SchedulePickup() {
  const [pickup, setPickup] = useState({
    customerName: '',
    contactNumber: '',
    email: '',
    pickupDate: '',
    pickupTime: '',
    serviceType: '',
    notes: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPickup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL, pickup);
      console.log('Pickup scheduled:', response.data);
      setSuccess(true);
      setPickup({
        customerName: '',
        contactNumber: '',
        email: '',
        pickupDate: '',
        pickupTime: '',
        serviceType: '',
        notes: '',
      });
    } catch (err) {
      setError('Error scheduling pickup. Please try again.');
      console.error("Error:", err.message);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
    setError(null);
  };

  return (
    <Box sx={{ backgroundColor: '#F5F5F5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 5 }}>
        <Paper elevation={6} sx={{ paddingRight: 4, paddingLeft: 4, paddingTop: 4, borderRadius: 2, maxWidth: 900, backgroundColor: '#FFFFFF' }}>
          <Grid container spacing={4}>
            {/* Left Column: Image Section */}
            <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E0E0E0', borderRadius: 2 }}>
              <img src={Logo} alt="Yakadabadu.lk" style={{ width: 'auto', maxHeight: '60vh', paddingRight: '4.5vh'}} />
            </Grid>

            {/* Right Column: Form Section */}
            <Grid item xs={12} sm={7}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333333' }}>
                Schedule Pickup
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 2, color: '#777777' }}>
                We help you with your waste management!
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Customer Name"
                  variant="outlined"
                  name="customerName"
                  value={pickup.customerName}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 2, backgroundColor: '#FFFFFF', borderRadius: 2 }}
                />
                <TextField
                  fullWidth
                  placeholder="Contact Number"
                  variant="outlined"
                  name="contactNumber"
                  value={pickup.contactNumber}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 2, backgroundColor: '#FFFFFF', borderRadius: 2 }}
                />
                <TextField
                  fullWidth
                  placeholder="Email"
                  variant="outlined"
                  name="email"
                  value={pickup.email}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 2, backgroundColor: '#FFFFFF', borderRadius: 2 }}
                />
                <TextField
                  fullWidth
                  placeholder="Pickup Date"
                  type="date"
                  variant="outlined"
                  name="pickupDate"
                  value={pickup.pickupDate}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 2, backgroundColor: '#FFFFFF', borderRadius: 2 }}
                />
                <TextField
                  fullWidth
                  placeholder="Pickup Time"
                  type="time"
                  variant="outlined"
                  name="pickupTime"
                  value={pickup.pickupTime}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 2, backgroundColor: '#FFFFFF', borderRadius: 2 }}
                />
                <InputLabel id="service-type-label" sx={{ color: '#333333' }}>Service Type</InputLabel>
                <Select
                  fullWidth
                  labelId="service-type-label"
                  variant="outlined"
                  name="serviceType"
                  value={pickup.serviceType}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 2, backgroundColor: '#FFFFFF', borderRadius: 2 }}
                >
                  <MenuItem value="" disabled>Select a Service</MenuItem>
                  <MenuItem value="pickup">Pickup</MenuItem>
                  <MenuItem value="disposal">Disposal</MenuItem>
                </Select>
                <TextField
                  fullWidth
                  placeholder="Notes"
                  variant="outlined"
                  name="notes"
                  multiline
                  rows={4}
                  value={pickup.notes}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 2, backgroundColor: '#FFFFFF', borderRadius: 2 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    paddingY: 1.5,
                    borderRadius: 2,
                    boxShadow: 'none',
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Schedule Pickup
                </Button>
                <Divider sx={{ marginY: 2 }} />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Pickup scheduled successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Footer />
    </Box>
  );
}

export default SchedulePickup;
