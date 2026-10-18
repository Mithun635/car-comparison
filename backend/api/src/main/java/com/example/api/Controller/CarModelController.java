package com.example.api.Controller;


import com.example.api.Entity.CarBrand;
import com.example.api.Entity.CarModel;

import com.example.api.Entity.CarVariant;
import com.example.api.Repository.CarBrandRepository;
import com.example.api.Repository.CarModelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*")
public class CarModelController {

    @Autowired
    private CarModelRepository carModelRepository;

    @Autowired
    private CarBrandRepository carBrandRepository;

    @PostMapping("/createCarModel")
    public ResponseEntity<CarModel> createCarModel(@RequestBody CarModel carModel) {
        try {
            // Handle the Optional correctly
            Optional<CarBrand> optionalBrand = carBrandRepository.findByBrandName(carModel.getCarBrand().getBrandName());

            if (!optionalBrand.isPresent()) {
                // Brand not found, return a bad request response
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }

            // Get the CarBrand object from the Optional
            CarBrand brand = optionalBrand.get();

            carModel.setCarBrand(brand); // Set the full brand object to the model
            CarModel savedModel = carModelRepository.save(carModel);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedModel);

        } catch (Exception e) {
            // Handle any other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @GetMapping("/getCarModels/{brandName}")
    public ResponseEntity<List<CarModel>> getCarModels(@PathVariable String brandName) {
        Optional<CarBrand> carBrandOptional = carBrandRepository.findByBrandName(brandName);
        if (!carBrandOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        CarBrand carBrand = carBrandOptional.get();
        List<CarModel> carModels = carModelRepository.findByCarBrandBrandName(brandName);
        return new ResponseEntity<>(carModels, HttpStatus.OK);
    }

    @GetMapping("/getAllCarModels")
    public ResponseEntity<?> getAllCarModels(){
        var CarModel= carModelRepository.findAll();
        return new ResponseEntity<>(CarModel, HttpStatus.OK);
    }
    @PutMapping("/updateCarModel/{id}")
    public ResponseEntity<CarModel> updateCarModel(@PathVariable Long id, @RequestBody CarModel carModel) {
        // Fetch the car model by ID
        Optional<CarModel> existingModelOptional = carModelRepository.findById(id);

        // If the model doesn't exist, return a 404 not found
        if (!existingModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // Get the existing model from the Optional
        CarModel existingModel = existingModelOptional.get();

        // If you are updating the brand, make sure you fetch the CarBrand by its ID
        if (carModel.getCarBrand() != null && carModel.getCarBrand().getId() != null) {
            Optional<CarBrand> carBrandOptional = carBrandRepository.findById(carModel.getCarBrand().getId());
            if (carBrandOptional.isPresent()) {
                existingModel.setCarBrand(carBrandOptional.get());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }

        // Update the fields of the existing model with the new data
        existingModel.setModelName(carModel.getModelName());
        existingModel.setYear(carModel.getYear());

        // Save the updated model
        CarModel updatedModel = carModelRepository.save(existingModel);

        // Return the updated model in the response
        return ResponseEntity.ok(updatedModel);
    }


}