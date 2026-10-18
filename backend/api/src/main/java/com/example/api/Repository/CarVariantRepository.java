package com.example.api.Repository;

import com.example.api.Entity.CarVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CarVariantRepository extends JpaRepository<CarVariant, Long> {

    List<CarVariant> findByCarModelModelName(String modelName);

//    Optional<CarVariant> findByVariantName(String variantname);

//    Optional<CarVariant> findById(Long id);
}