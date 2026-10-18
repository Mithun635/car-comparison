package com.example.api.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Specifications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key for specifications

    private String acceleration;
    private String engine;
    private String engineType;
    private String maxPower;
    private String maxTorque;
    private String maxMotorPerformance;
    private String mileage;
    private String drivetrain;
    private String transmission;
    private String emissionStandard;
    private String turbochargerOrSupercharger;
    private String electricMotor;
    private String length;
    private String width;
    private String height;
    private String wheelbase;
    private String doors;
    private String seatingCapacity;
    private String frontBrakeType;
    private String rearBrakeType;
    private String steeringType;
    private String wheels;
    private String spareWheel;
    private String frontTyres;
    private String rearTyres;



    @ManyToOne
    @JoinColumn(name = "car_variant_id", nullable = false)
    private CarVariant carVariant;



}
