import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import './CarCompare.css'; // Import the CSS file for custom styling

const CarCompare = () => {
    const { setResponseMessage } = useOutletContext();
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [models1, setModels1] = useState([]);
    const [variants1, setVariants1] = useState([]);
    const [models2, setModels2] = useState([]);
    const [variants2, setVariants2] = useState([]);
    const [selectedBrand1, setSelectedBrand1] = useState('');
    const [selectedModel1, setSelectedModel1] = useState('');
    const [selectedVariant1, setSelectedVariant1] = useState('');
    const [selectedBrand2, setSelectedBrand2] = useState('');
    const [selectedModel2, setSelectedModel2] = useState('');
    const [selectedVariant2, setSelectedVariant2] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/getAllBrands')
            .then(response => response.json())
            .then(data => setBrands(data))
            .catch(() => setResponseMessage("Failed to load brands"));
    }, [setResponseMessage]);

    useEffect(() => {
        if (selectedBrand1) {
            fetch(`http://localhost:8080/getCarModels/${selectedBrand1}`)
                .then(response => response.json())
                .then(data => setModels1(data))
                .catch(() => setResponseMessage("Failed to load models for car 1"));
        } else {
            setModels1([]);
            setSelectedModel1('');
        }
    }, [selectedBrand1, setResponseMessage]);

    useEffect(() => {
        if (selectedModel1) {
            fetch(`http://localhost:8080/getCarVariants/${selectedModel1}`)
                .then(response => response.json())
                .then(data => setVariants1(data))
                .catch(() => setResponseMessage("Failed to load variants for car 1"));
        } else {
            setVariants1([]);
            setSelectedVariant1('');
        }
    }, [selectedModel1, setResponseMessage]);

    useEffect(() => {
        if (selectedBrand2) {
            fetch(`http://localhost:8080/getCarModels/${selectedBrand2}`)
                .then(response => response.json())
                .then(data => setModels2(data))
                .catch(() => setResponseMessage("Failed to load models for car 2"));
        } else {
            setModels2([]);
            setSelectedModel2('');
        }
    }, [selectedBrand2, setResponseMessage]);

    useEffect(() => {
        if (selectedModel2) {
            fetch(`http://localhost:8080/getCarVariants/${selectedModel2}`)
                .then(response => response.json())
                .then(data => setVariants2(data))
                .catch(() => setResponseMessage("Failed to load variants for car 2"));
        } else {
            setVariants2([]);
            setSelectedVariant2('');
        }
    }, [selectedModel2, setResponseMessage]);

    const handleCompare = () => {
        if (!selectedVariant1 || !selectedVariant2) {
            setResponseMessage("Please select two cars to compare");
            return;
        }
        navigate(`/userDashboard/carComparePage?car1=${encodeURIComponent(selectedVariant1)}&car2=${encodeURIComponent(selectedVariant2)}`);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
            <h2>Car Compare</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Car 1 Selection */}
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <h3>Select Car 1</h3>
                    <div className="dropdown-container">
                        <h4>Select Brand</h4>
                        <select
                            onChange={(e) => setSelectedBrand1(e.target.value)}
                            value={selectedBrand1}
                            className="custom-select"
                        >
                            <option value="">Select a brand</option>
                            {brands.map((item) => (
                                <option key={item.brandName} value={item.brandName}>
                                    <div className="brand-option">
                                  
                                        <img src={item.logo} alt={`${item.brandName} logo`} className="brand-logo" />
                                        {item.brandName}
                                    </div>
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedBrand1 && (
                        <div className="dropdown-container">
                            <h4>Select Model</h4>
                            <select onChange={(e) => setSelectedModel1(e.target.value)} value={selectedModel1} className="custom-select">
                                <option value="">Select a model</option>
                                {models1.length > 0 ? (
                                    models1.map(model => (
                                        <option key={model.modelName} value={model.modelName}>
                                            {model.modelName}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No models available</option>
                                )}
                            </select>
                        </div>
                    )}

                    {selectedModel1 && (
                        <div className="dropdown-container">
                            <h4>Select Variant</h4>
                            <select onChange={(e) => setSelectedVariant1(e.target.value)} value={selectedVariant1} className="custom-select">
                                <option value="">Select a variant</option>
                                {variants1.length > 0 ? (
                                    variants1.map(variant => (
                                        <option key={variant.variantName} value={variant.variantName}>
                                            {variant.variantName}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No variants available</option>
                                )}
                            </select>
                        </div>
                    )}
                </div>

                {/* Car 2 Selection */}
                <div style={{ flex: 1, marginLeft: '10px' }}>
                    <h3>Select Car 2</h3>
                    <div className="dropdown-container">
                        <h4>Select Brand</h4>
                        <select
                            onChange={(e) => setSelectedBrand2(e.target.value)}
                            value={selectedBrand2}
                            className="custom-select"
                        >
                            <option value="">Select a brand</option>
                            {brands.map((item) => (
                                <option key={item.brandName} value={item.brandName}>
                                    <div className="brand-option">
                                        <img src={item.logo} alt={`${item.brandName} logo`} className="brand-logo" />
                                        {item.brandName}
                                    </div>
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedBrand2 && (
                        <div className="dropdown-container">
                            <h4>Select Model</h4>
                            <select onChange={(e) => setSelectedModel2(e.target.value)} value={selectedModel2} className="custom-select">
                                <option value="">Select a model</option>
                                {models2.length > 0 ? (
                                    models2.map(model => (
                                        <option key={model.modelName} value={model.modelName}>
                                            {model.modelName}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No models available</option>
                                )}
                            </select>
                        </div>
                    )}

                    {selectedModel2 && (
                        <div className="dropdown-container">
                            <h4>Select Variant</h4>
                            <select onChange={(e) => setSelectedVariant2(e.target.value)} value={selectedVariant2} className="custom-select">
                                <option value="">Select a variant</option>
                                {variants2.length > 0 ? (
                                    variants2.map(variant => (
                                        <option key={variant.variantName} value={variant.variantName}>
                                            {variant.variantName}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No variants available</option>
                                )}
                            </select>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
                <button 
                    onClick={handleCompare} 
                    style={{ 
                        border: 'none', 
                        backgroundColor: '#007bff', // Customize the background color
                        color: '#fff', // Customize the text color
                        padding: '10px 20px', // Customize padding
                        borderRadius: '5px', // Customize border-radius
                        cursor: 'pointer' // Change cursor to pointer
                    }}
                >
                    Compare Cars
                </button>
            </div>
        </div>
    );
};

export default CarCompare;
