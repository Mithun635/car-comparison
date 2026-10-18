package com.example.api.Controller;


import com.example.api.Entity.CarVariant;
import com.example.api.Entity.Specifications;
import com.example.api.Repository.CarVariantRepository;
import com.example.api.Repository.SpecificationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/specifications")
public class SpecificationsController {

    @Autowired
    private SpecificationsRepository specificationsRepository;

    @Autowired
    private CarVariantRepository carVariantRepository;

    // Get all specifications
    @GetMapping
    public List<Specifications> getAllSpecifications() {
        return specificationsRepository.findAll();
    }

  

    @GetMapping("/{variantName}")
    public ResponseEntity<?> getSpecificationsByModel(@PathVariable String variantName) {
       List<Specifications> specifications = specificationsRepository.findByCarVariantVariantName(variantName);
        if (specifications.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(specifications);
    }



    @PostMapping("/create/{variantId}")
    public Specifications createSpecification(@PathVariable Long variantId, @RequestBody Specifications specifications) {
        CarVariant carVariant = carVariantRepository.findById(variantId)
                .orElseThrow(() -> new RuntimeException("CarVariant not found with id " + variantId));

        specifications.setCarVariant(carVariant);

        // Save the specification
        return specificationsRepository.save(specifications);
    }


    // Update an existing specification
    @PutMapping("/update/{id}")
    public Specifications updateSpecification(@PathVariable Long id, @RequestBody Specifications specifications) {
        if (specificationsRepository.existsById(id)) {
            specifications.setId(id);
            return specificationsRepository.save(specifications);
        }
        return null;  // Handle case where specification doesn't exist
    }



  
}