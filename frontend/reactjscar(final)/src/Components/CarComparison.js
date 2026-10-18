import React, { useEffect, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

const CarComparison = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/scrape-cars');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCars(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Car Comparison</h1>
            <ul>
                {cars.map((car, index) => (
                    <li key={index}>
                        {car.brandName} - {car.modelName} ({car.variantName})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarComparison;
