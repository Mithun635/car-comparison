package com.example.api.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class CarModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "modelName", nullable = false) // Model name should not be null
    private String modelName; // Name of the car model

    @Column(name = "year", nullable = false) // Model year should not be null
    private String year; // Year of the model


    @ManyToOne // Many car models can belong to one car brand
    @JoinColumn(name = "car_brand_id", nullable = false) // Foreign key to carBrand table
    private CarBrand carBrand; // Reference to the car brand


    @OneToMany(mappedBy = "carModel")
    @JsonIgnore
    List<CarVariant> variantList;




}