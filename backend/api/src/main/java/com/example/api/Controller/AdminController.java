package com.example.api.Controller;

import com.example.api.DTO.PasswordUpdateRequest;
import com.example.api.Entity.User;
import com.example.api.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class AdminController {

    @Value("${admin.usertype}")
    private String adminUsertype;

    @Autowired
    private UserRepository userRepository;

    @PutMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody PasswordUpdateRequest request) {
        if (request.getNewPassword() == null || request.getOldPassword() == null || request.getConfirmPassword() == null) {
            return ResponseEntity.badRequest().body("Old password, new password, and confirm password are required.");
        }
        User admin = userRepository.findByUsertype(adminUsertype);
        if (admin == null) {
            return ResponseEntity.status(404).body("Admin user not found.");
        }

        if (!admin.getPassword().equals(request.getOldPassword())) {
            return ResponseEntity.badRequest().body("Invalid current password.");
        }

        admin.setPassword(request.getNewPassword());
        userRepository.save(admin);

        return ResponseEntity.ok("Password updated successfully.");
    }
}