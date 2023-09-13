import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Shipment {
  id: number;
  date: string;
  from: string;
  to: string;
}

interface ShipmentCardProps {
  shipment: Shipment;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment }) => {
  const navigate = useNavigate();

  const divStyle = {
    cursor: 'pointer',
  };

  return (
    <div
      onClick={() =>
        navigate(`/shipmentDetails/${shipment.id}`, { state: { shipment } })
      }
      style={divStyle}
    >
      <Card variant='outlined' sx={{ minWidth: 200, minHeight: 200 }}>
        <CardActionArea>
          <CardMedia
            component='img'
            height='140'
            src={process.env.PUBLIC_URL + '/cinchlogo.png'}
            alt='cinch'
          />
          <CardContent>
            <Typography variant='h6'>Shipment Date: {shipment.date}</Typography>
            <Typography variant='body1'>From: {shipment.from}</Typography>
            <Typography variant='body1'>To: {shipment.to}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ShipmentCard;
