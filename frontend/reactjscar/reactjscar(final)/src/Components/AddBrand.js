import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddBrand() {
    const [brand, setBrand] = useState('');
    const [logo, setLogo] = useState('');

    // Handle file input change
    const handleLogo = (event) => {
        let file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setLogo(reader.result);
        }
    };

    // Handle the form submission
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
            await axios.post(' http://localhost:8080/createCarBrand', {brandName:brand, logo})
            toast.success('Brand added successfully!');
            setBrand('');
            document.getElementById("formLogo").value=null;
        } catch (error) {
            toast.error('Error adding brand: ' + error.message);
        }
    };

    return (
        <div className="form-section">
            <div className="form-container">
                <h2 className="mb-3">Add Brand</h2>
                <div className="form-group">
                    <label htmlFor="formBrand">Brand Name</label>
                    <input
                        id="formBrand"
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="Enter brand name"
                        className="form-control" // Apply custom styles
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formLogo" className="form-label">Brand Logo</label>
                    <input
                        id="formLogo"
                        type="file"
                        className="form-control"
                        onChange={handleLogo}
                    />
                </div>
                <button onClick={handleAddBrand} className="btn-primary">Add Brand</button>
            </div>
        </div>
    );
}

export default AddBrand;
