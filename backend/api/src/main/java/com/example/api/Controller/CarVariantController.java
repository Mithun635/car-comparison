package com.example.api.Controller;

import com.example.api.Entity.CarBrand;
import com.example.api.Entity.CarModel;
import com.example.api.Entity.CarVariant;
import com.example.api.Repository.CarModelRepository;
import com.example.api.Repository.CarVariantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*")
public class CarVariantController {

    @Autowired
    private CarVariantRepository carVariantRepository;

    @Autowired
    private CarModelRepository carModelRepository;

    @PostMapping("/createCarVariant/{modelId}")
    public ResponseEntity<?> createCarVariant(@RequestBody CarVariant carVariant, @PathVariable Long modelId) {
        try {
            // Find the CarModel by ID
            CarModel carModel = carModelRepository.findById(modelId)
                    .orElseThrow(() -> new RuntimeException("Model with ID " + modelId + " not found"));

            // Set the CarModel in the CarVariant object
            carVariant.setCarModel(carModel);

            // Save the CarVariant to the database
            CarVariant savedVariant = carVariantRepository.save(carVariant);

            // Return the saved CarVariant with a CREATED status
            return new ResponseEntity<>(savedVariant, HttpStatus.CREATED);
        } catch (Exception e) {
            // Return just the error message in the response body
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }






    @GetMapping("/getCarVariants/{modelName}")
    public ResponseEntity<List<CarVariant>> getCarVariants(@PathVariable String modelName) {
        System.out.println("Received model name: " + modelName);  // Log the model name
        try {
            List<CarVariant> carVariants = carVariantRepository.findByCarModelModelName(modelName);
            if (carVariants.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(carVariants, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getAllCarVariants")
    public ResponseEntity<List<CarVariant>> getAllCarVariants() {
        // Retrieve all car variants
        List<CarVariant> carVariants = carVariantRepository.findAll();

        return new ResponseEntity<>(carVariants, HttpStatus.OK);
    }

    @PutMapping("/updateCarVariant/{variantId}")
    public ResponseEntity<?> updateCarVariant(@PathVariable Long variantId, @RequestBody CarVariant updatedVariant) {
        try {
            // Find the CarVariant by ID
            Optional<CarVariant> existingVariantOpt = carVariantRepository.findById(variantId);

            if (!existingVariantOpt.isPresent()) {
                // If the variant doesn't exist, return a 404 response
                return new ResponseEntity<>("Car Variant not found", HttpStatus.NOT_FOUND);
            }

            CarVariant existingVariant = existingVariantOpt.get();

            // Update the fields of the existing variant
            existingVariant.setVariantName(updatedVariant.getVariantName());
            existingVariant.setVarianttype(updatedVariant.getVarianttype());
            existingVariant.setVariantsubtype(updatedVariant.getVariantsubtype());
            existingVariant.setPrice(updatedVariant.getPrice());

            // Optionally, update the CarModel if necessary
            if (updatedVariant.getCarModel() != null) {
                existingVariant.setCarModel(updatedVariant.getCarModel());
            }

            // Save the updated variant to the database
            CarVariant savedVariant = carVariantRepository.save(existingVariant);

            return new ResponseEntity<>(savedVariant, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating car variant: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}