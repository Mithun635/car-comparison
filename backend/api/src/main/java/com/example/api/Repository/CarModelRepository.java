package com.example.api.Repository;

import com.example.api.Entity.CarModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarModelRepository extends JpaRepository<CarModel, Long> {

    List<CarModel> findByCarBrandBrandName(String brandName);

    List<CarModel> findByModelName(String modelName);

}