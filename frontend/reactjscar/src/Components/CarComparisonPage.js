import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './CarComparisonPage.css'; // Import the CSS file

const CarComparisonPage = () => {
    const [car1, setCar1] = useState(null);
    const [car2, setCar2] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        debugger
        const query = new URLSearchParams(location.search);
        const car1Name = query.get('car1');
        const car2Name = query.get('car2');

        
        if (car1Name && car2Name) {
            setLoading(true);
            Promise.all([
                fetch(`http://localhost:8080/specifications/${encodeURIComponent(car1Name)}`).then(res => res.json()),
                fetch(`http://localhost:8080/specifications/${encodeURIComponent(car2Name)}`).then(res => res.json())
            ])
            .then(([data1, data2]) => {
                setCar1(data1[0]); // Assuming the response is an array and we need the first item
                setCar2(data2[0]); // Same here
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to fetch car details.");
                setLoading(false);
            });
        }
    }, [location.search]);

    if (loading) {
        return <div>Please Select  Cars.......</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!car1 || !car2) {
        return <div>Please Select Cars........</div>;
    }

    // Helper function to capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Helper function to extract relevant key-value pairs and remove `id`
    const extractDetails = (car) => {
        const details = { ...car };
        // Flatten nested objects
        if (details.carVariant) {
            const variant = details.carVariant;
            details['Variant Type'] = variant.varianttype;
            details['Variant Subtype'] = variant.variantsubtype;
            details['Price'] = variant.price;

            if (variant.carModel) {
                const model = variant.carModel;
                details['Model Year'] = model.year;
            }
        }
        // Remove nested objects and `id`
        delete details.carVariant;
        delete details.id;
        return details;
    };

    // Extract and format details
    const car1Details = extractDetails(car1);
    const car2Details = extractDetails(car2);

    // Combine keys from both cars to ensure all are covered, excluding `id`
    const allKeys = new Set([...Object.keys(car1Details), ...Object.keys(car2Details)]);

    return (
        <div className="table-container">
            <h2>Car Comparison</h2>
            <table>
                <thead>
                    <tr>
                        <th>Specification</th>
                        <th>
                            <div className="car-header">
                                <img src={`data:image/png;base64,${car1.carVariant.carModel.carBrand.logo}`} alt={`${car1.carVariant.carModel.carBrand.brandName} logo`} className="brand-logo" />
                                

                                {`${car1.carVariant.carModel.carBrand.brandName} ${car1.carVariant.carModel.modelName} ${car1.carVariant.variantName}`}
                            </div>
                        </th>
                        <th>
                            <div className="car-header">
                                <img src={`data:image/png;base64,${car2.carVariant.carModel.carBrand.logo}`}  alt={`${car2.carVariant.carModel.carBrand.brandName} logo`} className="brand-logo" />
                                {`${car2.carVariant.carModel.carBrand.brandName} ${car2.carVariant.carModel.modelName} ${car2.carVariant.variantName}`}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from(allKeys).map(key => (
                        <tr key={key}>
                            <td>{capitalizeFirstLetter(key)}</td>
                            <td>{car1Details[key] || '-'}</td>
                            <td>{car2Details[key] || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CarComparisonPage;
