import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddModel.css'; // Import your custom styles

function AddModel() {
    const [model, setModel] = useState('');
    const [brand, setBrand] = useState('');
    const [year, setYear] = useState(''); // Keep year as a string
    const [brands, setBrands] = useState([]); // State for list of brands
    const [loadingBrands, setLoadingBrands] = useState(true);

    useEffect(() => {
        // Fetch brands when component mounts
        axios.get('http://localhost:8080/GetCaBrand')
            .then(response => {
                setBrands(response.data); // Assume response data is an array of brands
                setLoadingBrands(false);
            })
            .catch(error => {
                toast.error('Error fetching brands: ' + error.message);
                setLoadingBrands(false);
            });
    }, []);

    const handleAddModel = () => {
        if (!brand) {
            toast.error('Please select a brand.');
            return;
        }

        const data = {
            modelName: model,
            carBrand: { brandName: brand },
            year // Send year as a string
        };

        console.log('Sending data:', data);

        axios.post('http://localhost:8080/createCarModel', data)
            .then(response => {
                toast.success('Model added successfully!');
                setModel('');
                setBrand('');
                setYear(''); // Clear the year input
            })
            .catch(error => toast.error('Error adding model: ' + error.message));
    };

    return (
        <div className="form-section">
            <div className="form-container">
                <h2 className="mb-3">Add Model</h2>
                <div className="form-group">
                    <label htmlFor="formBrand">Brand Name</label>
                    {loadingBrands ? (
                        <div className="loading-spinner">Loading...</div>
                    ) : (
                        <select
                            id="formBrand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="custom-select"
                        >
                            <option value="">Select a brand</option>
                            {brands.map((b, index) => (
                                <option key={index} value={b.brandName}>
                                    {b.brandName}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="formModel">Model Name</label>
                    <input
                        id="formModel"
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="Enter model name"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formYear">Model Year</label>
                    <input
                        id="formYear"
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Enter model year"
                        className="form-control"
                    />
                </div>
                <button onClick={handleAddModel} className="btn-primary">Add Model</button>
            </div>
        </div>
    );
}

export default AddModel;
