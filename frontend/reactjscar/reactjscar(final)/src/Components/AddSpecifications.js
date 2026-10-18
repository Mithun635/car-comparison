import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddSpecifications.css'; // Import the CSS file for styling

function AddSpecifications() {
    // State to include new fields
    const [specifications, setSpecifications] = useState({
        acceleration: '',
        engine: '',
        engineType: '',
        maxPower: '',
        maxTorque: '',
        maxMotorPerformance: '',
        mileage: '', // Fixed typo
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
        rearBrakeType: '', // Fixed typo
        steeringType: '',
        wheels: '',
        spareWheel: '',
        frontTyres: '',
        rearTyres: ''
    });
    const [variant, setVariant] = useState('');
    const [variants, setVariants] = useState([]);

    useEffect(() => {
        // Fetch the list of car variants when the component mounts
        axios.get('http://localhost:8080/getAllCarVariants')
            .then(response => {
                setVariants(response.data); // Assuming response.data is an array of car variants
            })
            .catch(error => toast.error('Error fetching variants: ' + error.message));
    }, []);

    const handleAddSpecifications = () => {
        // Ensure that a variant is selected
        if (!variant) {
            return toast.error('Please select a car variant.');
        }

        axios.post(`http://localhost:8080/createSpecifications/${variant}`, { ...specifications, carVariant: { variantName: variant } })
            .then(response => {
                toast.success('Specifications added successfully!');
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
                setVariant('');
            })
            .catch(error => toast.error('Error adding specifications: ' + error.message));
    };

    return (
        <div className="form-section">
            <div className="form-container">
                <h2 className="mb-3">Add Specifications</h2>
                <div className="form-group">
                    <label htmlFor="formVariant">Variant Name</label>
                    <select
                        id="formVariant"
                        value={variant}
                        onChange={(e) => setVariant(e.target.value)}
                        className="custom-select" // Apply custom styles
                    >
                        <option value="" disabled>Select variant</option>
                        {variants.map((variantObj, index) => (
                            <option key={index} value={variantObj.variantName}>
                                {variantObj.variantName}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Explicitly add fields for new specifications */}
                <div className="form-group">
                    <label htmlFor="formAcceleration">Acceleration (0-100kmph)</label>
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
                        placeholder="Enter engine type"
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
                <button onClick={handleAddSpecifications} className="btn-primary">Add Specifications</button>
            </div>
        </div>
    );
}

export default AddSpecifications;
