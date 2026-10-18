package com.example.api.Repository;

import com.example.api.Entity.CarVariant;
import com.example.api.Entity.Specifications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SpecificationsRepository extends JpaRepository<Specifications, Long> {
    List<Specifications> findByCarVariantVariantName(String variantName);

    List<Specifications> findByCarVariant_CarModel_ModelName(String modelName);


    List<Specifications> findByCarVariant_Id(Long id);
}