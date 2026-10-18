import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddSpecifications.css'; // Import the CSS file for styling

function AddSpecifications() {
    const [specifications, setSpecifications] = useState({
        acceleration: '',
        engine: '',
        engineType: '',
        maxPower: '',
        maxTorque: '',
        maxMotorPerformance: '',
        mileage: '',
        drivetrain: '',
        transmission: '',
        emissionStandard: '',
        turbochargerOrSupercharger: '',
        electricMotor: '',
        length: '',
        width: '',
        height: '',
        wheelbase: '',
        doors: '',
        seatingCapacity: '',
        frontBrakeType: '',
        rearBrakeType: '',
        steeringType: '',
        wheels: '',
        spareWheel: '',
        frontTyres: '',
        rearTyres: ''
    });
    
    const [variants, setVariants] = useState([]);
    const [variant, setVariant] = useState({ id: '', variantName: '' });
    const [allSpecifications, setAllSpecifications] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        // Fetch the list of car variants
        axios.get('http://localhost:8080/getAllCarVariants')
            .then(response => {
                setVariants(response.data);
            })
            .catch(error => {
                toast.error('Error fetching variants: ' + error.message);
            });

        // Fetch all specifications for the table
        fetchSpecifications();
    }, []);

    const fetchSpecifications = () => {
        axios.get('http://localhost:8080/specifications')
            .then(response => {
                setAllSpecifications(response.data);
            })
            .catch(error => toast.error('Error fetching specifications: ' + error.message));
    };

    const handleAddSpecifications = () => {
        const specificationsToSend = {
            ...specifications,
            carVariant: { id: variant?.id } // Ensure we're sending just the ID or the whole object as per backend expectations
        };
    
        // Set the endpoint based on whether we're editing an existing specification or creating a new one
        const endpoint = editingId
            ? `http://localhost:8080/specifications/update/${editingId}`  // For PUT request (update)
            : `http://localhost:8080/specifications/create/${variant.id}`;  // For POST request (create)
    
        const method = editingId ? axios.put : axios.post;  // Choose method based on editingId (PUT for update, POST for create)
    
        method(endpoint, specificationsToSend)
            .then(() => {
                toast.success('Specifications saved successfully!');
                resetForm();
                fetchSpecifications(); // Refresh the list after add/edit
            })
            .catch((error) => {
                console.error(error); // Log full error for debugging
                toast.error('Error saving specifications: ' + error.message);
            });
    };
    

   const handleEditSpecifications = (specification) => {
    setEditingId(specification.id);
    setSpecifications({
        ...specification,
        carVariant: specification.carVariant?.id // Make sure you're setting only the ID if backend expects it
    });
    setVariant({ id: specification.carVariant.id, variantName: specification.carVariant.variantName });
};


    const resetForm = () => {
        setSpecifications({
            acceleration: '',
            engine: '',
            engineType: '',
            maxPower: '',
            maxTorque: '',
            maxMotorPerformance: '',
            mileage: '',
            drivetrain: '',
            transmission: '',
            emissionStandard: '',
            turbochargerOrSupercharger: '',
            electricMotor: '',
            length: '',
            width: '',
            height: '',
            wheelbase: '',
            doors: '',
            seatingCapacity: '',
            frontBrakeType: '',
            rearBrakeType: '',
            steeringType: '',
            wheels: '',
            spareWheel: '',
            frontTyres: '',
            rearTyres: ''
        });
        setVariant({ id: '', variantName: '' });
    };

    return (
        <div className="form-section">
            <div className="form-container">
    <h2 className="mb-3">{editingId ? 'Update Specifications' : 'Add Specifications'}</h2>
    <div className="form-group">
        <label htmlFor="formVariant">Variant Name</label>
        <select
            id="formVariant"
            value={variant.id}
            onChange={(e) => {
                const selectedVariant = variants.find(v => v.id === Number(e.target.value));
                setVariant({ id: selectedVariant.id, variantName: selectedVariant.variantName });
            }}
            className="custom-select"
        >
            <option value="" disabled>Select variant</option>
            {variants.map((variantObj) => (
                <option key={variantObj.id} value={variantObj.id}>
                    {variantObj.variantName}
                </option>
            ))}
        </select>
    </div>

    <div className="form-grid">
        <div className="form-group">
            <label htmlFor="formAcceleration">Acceleration</label>
            <input
                id="formAcceleration"
                type="text"
                value={specifications.acceleration}
                onChange={(e) => setSpecifications({ ...specifications, acceleration: e.target.value })}
                placeholder="Enter acceleration"
                className="form-control"
            />
        </div>
        <div className="form-group">
            <label htmlFor="formEngine">Engine</label>
            <input
                id="formEngine"
                type="text"
                value={specifications.engine}
                onChange={(e) => setSpecifications({ ...specifications, engine: e.target.value })}
                placeholder="Enter engine"
                className="form-control"
            />
        </div>
        <div className="form-group">
            <label htmlFor="formEngineType">Engine Type</label>
            <input
                id="formEngineType"
                type="text"
                value={specifications.engineType}
                onChange={(e) => setSpecifications({ ...specifications, engineType: e.target.value })}
                placeholder="Enter Engine Type"
                className="form-control"
            />
        </div>







                <div className="form-group">
                    <label htmlFor="formMaxPower">Max Power (bhp@rpm)</label>
                    <input
                        id="formMaxPower"
                        type="text"
                        value={specifications.maxPower}
                        onChange={(e) => setSpecifications({ ...specifications, maxPower: e.target.value })}
                        placeholder="Enter max power"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formMaxTorque">Max Torque (Nm@rpm)</label>
                    <input
                        id="formMaxTorque"
                        type="text"
                        value={specifications.maxTorque}
                        onChange={(e) => setSpecifications({ ...specifications, maxTorque: e.target.value })}
                        placeholder="Enter max torque"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formMaxMotorPerformance">Max Motor Performance</label>
                    <input
                        id="formMaxMotorPerformance"
                        type="text"
                        value={specifications.maxMotorPerformance}
                        onChange={(e) => setSpecifications({ ...specifications, maxMotorPerformance: e.target.value })}
                        placeholder="Enter max motor performance"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formMileage">Mileage</label>
                    <input
                        id="formMileage"
                        type="text"
                        value={specifications.mileage}
                        onChange={(e) => setSpecifications({ ...specifications, mileage: e.target.value })}
                        placeholder="Enter mileage"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formDrivetrain">Drivetrain</label>
                    <input
                        id="formDrivetrain"
                        type="text"
                        value={specifications.drivetrain}
                        onChange={(e) => setSpecifications({ ...specifications, drivetrain: e.target.value })}
                        placeholder="Enter drivetrain"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formTransmission">Transmission</label>
                    <input
                        id="formTransmission"
                        type="text"
                        value={specifications.transmission}
                        onChange={(e) => setSpecifications({ ...specifications, transmission: e.target.value })}
                        placeholder="Enter transmission"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formEmissionStandard">Emission Standard</label>
                    <input
                        id="formEmissionStandard"
                        type="text"
                        value={specifications.emissionStandard}
                        onChange={(e) => setSpecifications({ ...specifications, emissionStandard: e.target.value })}
                        placeholder="Enter emission standard"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formTurbochargerOrSupercharger">Turbocharger/Supercharger</label>
                    <input
                        id="formTurbochargerOrSupercharger"
                        type="text"
                        value={specifications.turbochargerOrSupercharger}
                        onChange={(e) => setSpecifications({ ...specifications, turbochargerOrSupercharger: e.target.value })}
                        placeholder="Enter turbocharger or supercharger"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formElectricMotor">Electric Motor</label>
                    <input
                        id="formElectricMotor"
                        type="text"
                        value={specifications.electricMotor}
                        onChange={(e) => setSpecifications({ ...specifications, electricMotor: e.target.value })}
                        placeholder="Enter electric motor"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formLength">Length</label>
                    <input
                        id="formLength"
                        type="text"
                        value={specifications.length}
                        onChange={(e) => setSpecifications({ ...specifications, length: e.target.value })}
                        placeholder="Enter length"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formWidth">Width</label>
                    <input
                        id="formWidth"
                        type="text"
                        value={specifications.width}
                        onChange={(e) => setSpecifications({ ...specifications, width: e.target.value })}
                        placeholder="Enter width"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formHeight">Height</label>
                    <input
                        id="formHeight"
                        type="text"
                        value={specifications.height}
                        onChange={(e) => setSpecifications({ ...specifications, height: e.target.value })}
                        placeholder="Enter height"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formWheelbase">Wheelbase</label>
                    <input
                        id="formWheelbase"
                        type="text"
                        value={specifications.wheelbase}
                        onChange={(e) => setSpecifications({ ...specifications, wheelbase: e.target.value })}
                        placeholder="Enter wheelbase"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formDoors">Doors</label>
                    <input
                        id="formDoors"
                        type="text"
                        value={specifications.doors}
                        onChange={(e) => setSpecifications({ ...specifications, doors: e.target.value })}
                        placeholder="Enter number of doors"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formSeatingCapacity">Seating Capacity</label>
                    <input
                        id="formSeatingCapacity"
                        type="text"
                        value={specifications.seatingCapacity}
                        onChange={(e) => setSpecifications({ ...specifications, seatingCapacity: e.target.value })}
                        placeholder="Enter seating capacity"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formFrontBrakeType">Front Brake Type</label>
                    <input
                        id="formFrontBrakeType"
                        type="text"
                        value={specifications.frontBrakeType}
                        onChange={(e) => setSpecifications({ ...specifications, frontBrakeType: e.target.value })}
                        placeholder="Enter front brake type"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formRearBrakeType">Rear Brake Type</label>
                    <input
                        id="formRearBrakeType"
                        type="text"
                        value={specifications.rearBrakeType}
                        onChange={(e) => setSpecifications({ ...specifications, rearBrakeType: e.target.value })}
                        placeholder="Enter rear brake type"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formSteeringType">Steering Type</label>
                    <input
                        id="formSteeringType"
                        type="text"
                        value={specifications.steeringType}
                        onChange={(e) => setSpecifications({ ...specifications, steeringType: e.target.value })}
                        placeholder="Enter steering type"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formWheels">Wheels</label>
                    <input
                        id="formWheels"
                        type="text"
                        value={specifications.wheels}
                        onChange={(e) => setSpecifications({ ...specifications, wheels: e.target.value })}
                        placeholder="Enter wheels"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formSpareWheel">Spare Wheel</label>
                    <input
                        id="formSpareWheel"
                        type="text"
                        value={specifications.spareWheel}
                        onChange={(e) => setSpecifications({ ...specifications, spareWheel: e.target.value })}
                        placeholder="Enter spare wheel"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formFrontTyres">Front Tyres</label>
                    <input
                        id="formFrontTyres"
                        type="text"
                        value={specifications.frontTyres}
                        onChange={(e) => setSpecifications({ ...specifications, frontTyres: e.target.value })}
                        placeholder="Enter front tyres"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formRearTyres">Rear Tyres</label>
                    <input
                        id="formRearTyres"
                        type="text"
                        value={specifications.rearTyres}
                        onChange={(e) => setSpecifications({ ...specifications, rearTyres: e.target.value })}
                        placeholder="Enter rear tyres"
                        className="form-control"
                    />
                </div>

                </div>
                  <button onClick={handleAddSpecifications} className="btn-primary">
                    {editingId ? 'Update Specifications' : 'Add Specifications'}
                </button>
            </div>
            <div className="table-container">
                <h2 className="mb-3">Specifications List</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Variant Name</th>
                            <th>Engine</th>
                            <th>Max Power</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allSpecifications.map((spec, index) => (
                            <tr key={index}>
                                <td>{spec.carVariant.variantName}</td>
                                <td>{spec.engine}</td>
                                <td>{spec.maxPower}</td>
                                <td>
                                    <button
                                        onClick={() => handleEditSpecifications(spec)}
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

export default AddSpecifications;