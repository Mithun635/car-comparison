package com.example.api.Controller;

import com.example.api.Entity.CarBrand;
import com.example.api.Entity.CarModel;
import com.example.api.Entity.CarVariant;
import com.example.api.Repository.CarBrandRepository;
import com.example.api.Repository.CarModelRepository;
import com.example.api.Repository.CarVariantRepository;
import com.example.api.Repository.SpecificationsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;


@RestController
@CrossOrigin("*")

public class CarBrandController {

    @Autowired
    private CarBrandRepository carBrandRepository;

    @Autowired
    private CarModelRepository carModelRepository;

    @Autowired
    private CarVariantRepository carVariantRepository;

    @Autowired
    private SpecificationsRepository specificationsRepository;


    @PostMapping("/createCarBrand")
    public ResponseEntity<String> createCarBrand(
            @RequestParam("brandName") String brandName,
            @RequestParam("logo") MultipartFile logo) {
        try {
            if (logo.isEmpty()) {
                return ResponseEntity.badRequest().body("Logo file is empty.");
            }

            byte[] logoBytes = logo.getBytes();
            CarBrand carBrand = new CarBrand();
            carBrand.setBrandName(brandName); // Corrected variable name
            carBrand.setLogo(logoBytes);

            carBrandRepository.save(carBrand);

            return ResponseEntity.ok("Car brand created successfully"); // Corrected message
        } catch (Exception e) {
            // Log the error (use a logger in production)
            System.err.println("Error creating car brand: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating Car Brand: " + e.getMessage()); // Corrected message
        }
    }

    @GetMapping("/getAllBrands")
    public ResponseEntity<List<CarBrand>> getAllBrands() {

        return ResponseEntity.ok(carBrandRepository.findAll());
    }


    @GetMapping("/getCarBrandByName/{brandName}")
    public ResponseEntity<?> getCarBrandByName(@PathVariable("brandName") String brandName) {
        // Find the car brand by its name
        Optional<CarBrand> carBrandOp = carBrandRepository.findByBrandName(brandName);

        if (carBrandOp.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CarBrand not found.");
        }

        // Fetch car models associated with the brand
        List<CarModel> carModels = carModelRepository.findByCarBrandBrandName(brandName);

        // Fetch car variants for all models
        List<CarVariant> carVariants = new ArrayList<>();
        for (CarModel carModel : carModels) {
            List<CarVariant> variantsForModel = carVariantRepository.findByCarModelModelName(carModel.getModelName());
            carVariants.addAll(variantsForModel);
        }

        // Return the result as a map (brand, models, variants)
        Map<String, Object> response = new HashMap<>();
        response.put("brand", carBrandOp.get());
        response.put("models", carModels);
        response.put("variants", carVariants);

        return ResponseEntity.ok(response);
    }


    @PutMapping("/updateCarBrand/{id}")
    public ResponseEntity<String> updateCarBrand(
            @PathVariable Long id,
            @RequestParam("brandName") String brandName,
            @RequestParam(value = "logo", required = false) MultipartFile logo) {
        try {
            // Fetch the brand by ID
            Optional<CarBrand> optionalCarBrand = carBrandRepository.findById(id);
            if (optionalCarBrand.isEmpty()) {
                return ResponseEntity.badRequest().body("Brand not found");
            }

            CarBrand carBrand = optionalCarBrand.get();

            // Update the brand name
            carBrand.setBrandName(brandName);

            // Update the logo if provided
            if (logo != null && !logo.isEmpty()) {
                try {
                    carBrand.setLogo(logo.getBytes());
                } catch (IOException e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing logo file");
                }
            }

            // Save the updated entity
            carBrandRepository.save(carBrand);

            return ResponseEntity.ok("Brand updated successfully");
        } catch (Exception e) {
            // Log the error for debugging purposes
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }


}

