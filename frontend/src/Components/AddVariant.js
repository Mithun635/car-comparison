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
    const [variants, setVariants] = useState([]); // State to store variants
    const [editingVariantId, setEditingVariantId] = useState(null); // Track variant being edited

    // Fetch car models and variants on component mount
    useEffect(() => {
        axios.get('http://localhost:8080/getAllCarModels')
            .then(response => {
                setModels(response.data); // Assuming response.data is an array of car models
            })
            .catch(error => toast.error('Error fetching models: ' + error.message));

        // Fetch all variants
        axios.get('http://localhost:8080/getAllCarVariants')
            .then(response => {
                setVariants(response.data); // Assuming response.data is an array of car variants
            })
            .catch(error => toast.error('Error fetching variants: ' + error.message));
    }, []);

    // Validate form before submitting
    const validateForm = () => {
        if (!variant || !model || !price || isNaN(price)) {
            toast.error('All fields are required and price must be a valid number');
            return false;
        }
        return true;
    };

    // Handle adding variant
    const handleAddVariant = () => {
        if (!validateForm()) return;

        const requestData = {
            variantName: variant,
            varianttype: variantType,
            variantsubtype: variantType === 'Electric' ? '' : subtype, // Use an empty string for Electric
            price: parseFloat(price)
        };

        const selectedModel = models.find(modelObj => modelObj.modelName === model);
        const modelId = selectedModel ? selectedModel.id : null;

        if (!modelId) {
            toast.error('Selected model not found');
            return;
        }

        // Make the API call with modelId as part of the URL
        axios.post(`http://localhost:8080/createCarVariant/${modelId}`, requestData)
            .then(response => {
                toast.success('Variant added successfully!');
                setVariant('');
                setModel('');
                setVariantType('Manual');
                setSubtype('Petrol');
                setPrice('');
                fetchVariants();
            })
            .catch(error => toast.error('Error adding variant: ' + error.message));
    };

    // Handle updating variant
    const handleUpdateVariant = () => {
        if (!validateForm()) return;

        const requestData = {
            variantName: variant,
            varianttype: variantType,
            variantsubtype: variantType === 'Electric' ? '' : subtype,
            price: parseFloat(price)
        };

        // Make the PUT request to update the variant
        axios.put(`http://localhost:8080/updateCarVariant/${editingVariantId}`, requestData)
            .then(response => {
                toast.success('Variant updated successfully!');
                setVariant('');
                setModel('');
                setVariantType('Manual');
                setSubtype('Petrol');
                setPrice('');
                setEditingVariantId(null); // Reset editing state
                fetchVariants();
            })
            .catch(error => toast.error('Error updating variant: ' + error.message));
    };

    // Fetch updated variants from backend
    const fetchVariants = () => {
        axios.get('http://localhost:8080/getAllCarVariants')
            .then(response => {
                setVariants(response.data);
            })
            .catch(error => toast.error('Error fetching variants: ' + error.message));
    };

    // Handle editing a variant (this will populate the form with the selected variant's data)
    const handleEditVariant = (variantData) => {
        setModel(variantData.carModel.modelName);
        setVariant(variantData.variantName);
        setVariantType(variantData.varianttype);
        setSubtype(variantData.variantsubtype);
        setPrice(variantData.price.toString());
        setEditingVariantId(variantData.id); // Set the id of the variant being edited
    };

    return (
        <div className="form-section">
            <div className="form-container">
                <h2 className="mb-3">{editingVariantId ? 'Edit Variant' : 'Add Variant'}</h2>
                <div className="form-group">
                    <label htmlFor="formModel">Model Name</label>
                    <select
                        id="formModel"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="custom-select"
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
                        className="form-control"
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
    onChange={(e) => {
        const numericValue = e.target.value.replace(/[^0-9.]/g, ""); // Allow numbers and a single dot
        // Ensure only one dot in the input
        const validPrice = numericValue.split('.').length > 2 ? numericValue.slice(0, -1) : numericValue;
        setPrice(validPrice);
    }}
    placeholder="Enter price"
    className="form-control"
/>

                </div>
                <button
                    onClick={editingVariantId ? handleUpdateVariant : handleAddVariant}
                    className="btn-primary"
                >
                    {editingVariantId ? 'Update Variant' : 'Add Variant'}
                </button>
            </div>

            {/* Table to display variants */}
            <div className="variants-table">
                <h3 className="mt-5">Existing Variants</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Variant Name</th>
                            <th>Variant Type</th>
                            <th>Variant Subtype</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {variants.map((variantData, index) => (
                            <tr key={index}>
                                <td>{variantData.variantName}</td>
                                <td>{variantData.varianttype}</td>
                                <td>{variantData.variantsubtype}</td>
                                <td>{variantData.price}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleEditVariant(variantData)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AddVariant;
