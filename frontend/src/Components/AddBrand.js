import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddBrand() {
    const [brand, setBrand] = useState('');
    const [logo, setLogo] = useState(null);
    const [brands, setBrands] = useState([]);
    const [editingRow, setEditingRow] = useState(null); // Track the row being edited

    // Fetch all brands on component mount
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://localhost:8080/getAllBrands');
                setBrands(response.data);
            } catch (error) {
                toast.error('Error fetching brands: ' + (error.response?.data || error.message));
            }
        };
        fetchBrands();
    }, []);

    // Handle file input for new brand
    const handleLogo = (event) => {
        setLogo(event.target.files[0]);
    };

    // Add new brand
    const handleAddBrand = async () => {
        if (!brand.trim()) {
            toast.error('Brand name cannot be empty.');
            return;
        }
        if (!logo) {
            toast.error('Brand logo is required.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('brandName', brand);
            formData.append('logo', logo);

            await axios.post('http://localhost:8080/createCarBrand', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Brand added successfully!');
            setBrand('');
            setLogo(null);
            document.getElementById('formLogo').value = null;

            // Refresh brand list
            const response = await axios.get('http://localhost:8080/getAllBrands');
            setBrands(response.data);
        } catch (error) {
            toast.error('Error adding brand: ' + (error.response?.data || error.message));
        }
    };

    // Update an existing brand
    const handleUpdateBrand = async (brandId) => {
        const formData = new FormData();
        formData.append('brandName', brand);
        if (logo) {
            formData.append('logo', logo);
        }

        try {
            await axios.put(`http://localhost:8080/updateCarBrand/${brandId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Brand updated successfully!');
            setEditingRow(null); // Clear the editing row
            setBrand('');
            setLogo(null);
            document.getElementById('formLogo').value = null;
            

            // Refresh brand list
            const response = await axios.get('http://localhost:8080/getAllBrands');
            setBrands(response.data);
        } catch (error) {
            toast.error('Error updating brand: ' + (error.response?.data || error.message));
        }
    };

    // Start editing a row
    const handleEdit = (brand) => {
        setEditingRow(brand.id);
        setBrand(brand.brandName); // Set the brand name to edit
        setLogo(null); // Reset logo for the edit process
    };

    return (
        <div className="form-section">
            <div className="form-container">
                <h2 className="mb-3">{editingRow ? 'Edit Brand' : 'Add Brand'}</h2>
                <div className="form-group">
                    <label htmlFor="formBrand">Brand Name</label>
                    <input
                        id="formBrand"
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="Enter brand name"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formLogo" className="form-label">Brand Logo</label>
                    <input
                        id="formLogo"
                        type="file"
                        className="form-control"
                        onChange={handleLogo}
                        accept="image/*"
                    />
                </div>
                <button
                    onClick={editingRow ? () => handleUpdateBrand(editingRow) : handleAddBrand}
                    className="btn btn-primary mt-3"
                >
                    {editingRow ? 'Update Brand' : 'Add Brand'}
                </button>
            </div>

            <div className="table-container mt-5">
            <h2>Brand List</h2>
                <table className="table">
               
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Brand Name</th>
                            <th>Logo</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((brand) => (
                            <tr key={brand.id}>
                                <td>{brand.id}</td>
                                <td>{brand.brandName}</td>
                                <td>
                                    <img
                                        src={`data:image/png;base64,${brand.logo}`}
                                        alt="Brand Logo"
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(brand)}
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

export default AddBrand;
