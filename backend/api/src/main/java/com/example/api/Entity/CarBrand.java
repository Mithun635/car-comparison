package com.example.api.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class CarBrand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically generate the ID
    private Long id;

    @Column(name = "brandName", unique = true, nullable = false) // Make brandName unique
    private String brandName; // Brand name, not the primary key anymore

    @Lob
    @Column(name = "logo", columnDefinition = "LONGBLOB") // Store logo as a byte array
    private byte[] logo;

    @OneToMany(mappedBy = "carBrand")
    @JsonIgnore
    private List<CarModel> modelList; // List of models related to the car brand
}



