import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

interface Shipment {
  id: number;
  date: string;
  from: string;
  to: string;
}

interface Comment {
  id: number;
  message: string;
}

interface ShipmentDetailsProps {
  shipment: Shipment;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = () => {
  const { shipmentId } = useParams();
  const location = useLocation();
  const shipment = location.state?.shipment;
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/comments?shipmentId=${shipmentId}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.statusText}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (error: any) {
        console.error('Error fetching comments:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [shipmentId]);

  return (
    <div>
      <div>
        {/* Shipment details */}
        <Card>
          <CardContent>
            <Typography variant='h6'>Shipment Details</Typography>
            <Typography variant='body1'>Date: {shipment.date}</Typography>
            <Typography variant='body1'>From: {shipment.from}</Typography>
            <Typography variant='body1'>To: {shipment.to}</Typography>
          </CardContent>
        </Card>
      </div>

      <div>
        {/* Comments section */}
        <Card>
          <CardContent>
            <Typography variant='h6'>Comments</Typography>
            {error ? (
              <div>Error fetching comments: {error}</div>
            ) : loading ? (
              <div>Loading comments...</div>
            ) : (
              <List>
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <ListItem>
                      <ListItemText primary={comment.message} />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShipmentDetails;
