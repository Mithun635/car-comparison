package com.example.api.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
        import lombok.Data;

import java.util.List;

@Entity
@Data
public class CarVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String variantName;

    private String varianttype;

    private String variantsubtype;

    private String price;

    @ManyToOne
    @JoinColumn(name = "car_model_id", nullable = false)
    private CarModel carModel; // Foreign key to CarModel



    @OneToMany(mappedBy = "carVariant")
    @JsonIgnore
    List<Specifications> specificationList;


}
