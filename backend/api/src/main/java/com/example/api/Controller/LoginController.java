package com.example.api.Controller;

import com.example.api.DTO.UserDTO;
import com.example.api.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {

        if (userDTO.getUsertype().equals("User")) {
            var data = userRepository.findByEmailAndUsertype(userDTO.getEmail(), "User")
                    .orElseThrow(() -> new RuntimeException("Email not associated with User type"));

            if (data.getPassword().equals(userDTO.getPassword())) {
                return new ResponseEntity<>("User", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid User Password", HttpStatus.UNAUTHORIZED);
            }


    } else if (userDTO.getEmail().equals("admin@gmail.com")) {
            var data = userRepository.findByEmail(userDTO.getEmail()).orElseThrow(() -> new RuntimeException("Not found"));
            if (data.getPassword().equals(userDTO.getPassword())) {
                return new ResponseEntity<>("Admin", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid user Password", HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>("Invalid usertype",HttpStatus.UNAUTHORIZED);
        }

    }
}