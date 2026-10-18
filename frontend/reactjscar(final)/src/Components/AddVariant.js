import React, { useState, useEffect } from 'react';
import './Addvariant.css';
import axios from 'axios';
import { toast } from 'react-toastify';


function AddVariant() {
    const [variant, setVariant] = useState('');
    const [model, setModel] = useState('');
    const [models, setModels] = useState([]); // State to store models
    const [variantType, setVariantType] = useState('Manual'); // Default to Manual
    const [subtype, setSubtype] = useState('Petrol'); // Default to Petrol
    const [price, setPrice] = useState('');

    useEffect(() => {
        // Fetch the list of models when the component mounts
        axios.get('http://localhost:8080/getAllCarModels')
            .then(response => {
                setModels(response.data); // Assuming response.data is an array of car models
            })
            .catch(error => toast.error('Error fetching models: ' + error.message));
    }, []);

    const handleAddVariant = () => {
        // Prepare the data to send to the backend
        const requestData = { 
            variantName: variant,
            varianttype: variantType,
            variantsubtype: variantType === 'Electric' ? '' : subtype, // Use an empty string for Electric
            price: price 
        };

        // Make the API call with model as part of the URL
        axios.post(`http://localhost:8080/createCarVariant/${model}`, requestData)
            .then(response => {
                toast.success('Variant added successfully!');
                // Clear form fields after successful addition
                setVariant('');
                setModel('');
                setVariantType('Manual');
                setSubtype('Petrol');
                setPrice('');
            })
            .catch(error => toast.error('Error adding variant: ' + error.message));
    };

    return (
        <div className="form-section">
            <div className="form-container">
                <h2 className="mb-3">Add Variant</h2>
                <div className="form-group">
                    <label htmlFor="formModel">Model Name</label>
                    <select
                        id="formModel"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="custom-select" // Apply custom styles
                    >
                        <option value="" disabled>Select model</option>
                        {models.map((modelObj, index) => (
                            <option key={index} value={modelObj.modelName}>
                                {modelObj.modelName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="formVariant">Variant Name</label>
                    <input
                        id="formVariant"
                        type="text"
                        value={variant}
                        onChange={(e) => setVariant(e.target.value)}
                        placeholder="Enter variant name"
                        className="form-control" // Apply custom styles
                    />
                </div>
                <div className="form-group">
                    <label>Variant Type</label>
                    <div className="horizontal-radio-buttons">
                        <label>
                            <input
                                type="radio"
                                value="Manual"
                                checked={variantType === 'Manual'}
                                onChange={(e) => setVariantType(e.target.value)}
                            />
                            Manual
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Automatic"
                                checked={variantType === 'Automatic'}
                                onChange={(e) => setVariantType(e.target.value)}
                            />
                            Automatic
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Electric"
                                checked={variantType === 'Electric'}
                                onChange={(e) => setVariantType(e.target.value)}
                            />
                            Electric
                        </label>
                    </div>
                </div>
                {variantType !== 'Electric' && (
                    <div className="form-group">
                        <label>Variant Subtype</label>
                        <div className="horizontal-radio-buttons">
                            <label>
                                <input
                                    type="radio"
                                    value="Petrol"
                                    checked={subtype === 'Petrol'}
                                    onChange={(e) => setSubtype(e.target.value)}
                                />
                                Petrol
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="Diesel"
                                    checked={subtype === 'Diesel'}
                                    onChange={(e) => setSubtype(e.target.value)}
                                />
                                Diesel
                            </label>
                        </div>
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="formPrice">Price</label>
                    <input
                        id="formPrice"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                        className="form-control" // Apply custom styles
                    />
                </div>
                <button onClick={handleAddVariant} className="btn-primary">Add Variant</button>
            </div>
        </div>
    );
}

export default AddVariant;
