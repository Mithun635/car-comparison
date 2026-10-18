import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddModel() {
    const [model, setModel] = useState('');
    const [brand, setBrand] = useState('');
    const [year, setYear] = useState('');
    const [brands, setBrands] = useState([]);
    const [carModels, setCarModels] = useState([]);
    const [editingModel, setEditingModel] = useState(null); // Track model being edited

    // Fetch all brands and models on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const brandsResponse = await axios.get('http://localhost:8080/getAllBrands');
                setBrands(brandsResponse.data);
                
                const modelsResponse = await axios.get('http://localhost:8080/getAllCarModels');
                setCarModels(modelsResponse.data);
            } catch (error) {
                toast.error('Error fetching data: ' + (error.response?.data || error.message));
            }
        };

        fetchData();
    }, []);

    // Add new model
    const handleAddModel = async () => {
        if (!brand || !model.trim()) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            const data = {
                modelName: model,
                carBrand: { brandName: brand },
                year
            };

            const response = await axios.post('http://localhost:8080/createCarModel', data);
            toast.success('Model added successfully!');
            setModel('');
            setBrand('');
            setYear('');
            setCarModels([...carModels, response.data]); // Update car models list
        } catch (error) {
            toast.error('Error adding model: ' + (error.response?.data || error.message));
        }
    };

    // Edit existing model
    const handleEditModel = (modelToEdit) => {
        setEditingModel(modelToEdit);
        setModel(modelToEdit.modelName);
        setBrand(modelToEdit.carBrand.brandName);
        setYear(modelToEdit.year);
    };

    // Update model
    const handleUpdateModel = async () => {
        if (!brand || !model.trim()) {
            toast.error('Please fill in all fields.');
            return;
        }

        const updatedModel = {
            ...editingModel,
            modelName: model,
            carBrand: { brandName: brand },
            year
        };

        try {
            const response = await axios.put(`http://localhost:8080/updateCarModel/${editingModel.id}`, updatedModel);
            toast.success('Model updated successfully!');
            setEditingModel(null); // Clear editing state
            setModel('');
            setBrand('');
            setYear('');
            setCarModels(carModels.map((m) => (m.id === response.data.id ? response.data : m))); // Update the car models list
        } catch (error) {
            toast.error('Error updating model: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div className="form-section">
            {/* Add Model Card */}
            <div className="form-container">
                <h2 className="mb-3">{editingModel ? 'Edit Model' : 'Add Model'}</h2>
                <div className="form-group">
                    <label htmlFor="formBrand">Brand Name</label>
                    <select
                        id="formBrand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Select a brand</option>
                        {brands.map((b) => (
                            <option key={b.id} value={b.brandName}>
                                {b.brandName}
                            </option>
                        ))}
                    </select>
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
    onChange={(e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, "");
        if (numericValue.length <= 4) { // Limit to 4 digits
            setYear(numericValue);
        }
    }}
    
    placeholder="Enter model year"
    className="form-control"
/>
                </div>
                <button
                    onClick={editingModel ? handleUpdateModel : handleAddModel}
                    className="btn btn-primary mt-3"
                >
                    {editingModel ? 'Update Model' : 'Add Model'}
                </button>
            </div>

            {/* Car Models Table */}
            <div className="table-container mt-5">
                <h3>Car Models</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carModels.map((carModel) => (
                            <tr key={carModel.id}>
                                <td>{carModel.carBrand.brandName}</td>
                                <td>{carModel.modelName}</td>
                                <td>{carModel.year}</td>
                                <td>
                                    <button
                                        onClick={() => handleEditModel(carModel)}
                                        className="btn btn-danger"
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

export default AddModel;
