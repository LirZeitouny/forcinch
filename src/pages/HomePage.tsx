import React, { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import ShipmentCard from '../components/ShipmentCard';
import './HomePage.css'; // Import the CSS file for background gradient

// Define the type for a single shipment
interface Shipment {
  id: number;
  date: string;
  from: string;
  to: string;
  duration: string;
  cost: string;
}

const itemsPerPage = 20; // Number of items to fetch per scroll

const HomePage: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [allDataLoaded, setAllDataLoaded] = useState<boolean>(false);

  const currentPageRef = useRef<number>(1); // Keep track of the current page
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3001/api/shipments?page=${currentPageRef.current}&perPage=${itemsPerPage}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data: Shipment[] = await response.json();
          if (data.length === 0) {
            setAllDataLoaded(true); // All data has been loaded
          } else {
            setShipments((prevShipments) => [...prevShipments, ...data]);
            currentPageRef.current += 1; // Increment current page
          }
          setLoading(false);
        } else {
          setError('Invalid response format');
          setLoading(false);
        }
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading && !allDataLoaded) {
        fetchData();
      }
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (sentinelRef.current && !allDataLoaded) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, allDataLoaded]);

  return (
    <div className='home-page-container'>
      {' '}
      {/* Apply the CSS class */}
      <h1>Shipments</h1>
      {error ? (
        <div>Error fetching data: {error}</div>
      ) : (
        <>
          <Grid container spacing={10}>
            {shipments.map((shipment) => (
              <Grid item key={shipment.id} xs={12} sm={6} md={4} lg={3}>
                <ShipmentCard shipment={shipment} />
              </Grid>
            ))}
          </Grid>
          {allDataLoaded ? (
            <div>All data loaded</div>
          ) : (
            <div ref={sentinelRef} style={{ height: '10px' }}>
              {loading && <div>Loading...</div>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
