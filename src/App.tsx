import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShipmentDetails from './pages/ShipmentDetails'; // Import your ShipmentDetails component

const App: React.FC = () => {
  const sampleShipment = {
    id: 1,
    date: '2023-09-15',
    from: 'Source City',
    to: 'Destination City',
  };
  return (
    <Router>
      <Routes>
        {/* Define the route for the ShipmentDetails page */}
        <Route
          path='/shipmentDetails/:shipmentId'
          element={<ShipmentDetails shipment={sampleShipment} />}
        />
        {/* Define the route for the HomePage */}
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
