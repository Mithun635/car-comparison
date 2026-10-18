package com.example.api.Controller;


import com.example.api.DTO.UserUpdateDto;
import com.example.api.Entity.User;
import com.example.api.Repository.UserRepository;
//import com.example.api.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/checkUser")
//    public ResponseEntity<?> checkUser(@RequestBody Map<String, String> body) {
//        String email = body.get("email");
//        boolean exists = userService.checkUserExists(email);
//
//        if (exists) {
//            return ResponseEntity.ok(Map.of("exists", true));
//        } else {
//            // Register the user with UserType as "User"
//            User newUser = userService.registerUser(email);
//            return ResponseEntity.ok(Map.of("exists", false, "user", newUser));
//        }
//    }


    @PostMapping("/registerUser")
    public ResponseEntity<?> registerUser(@RequestBody User obj) {

        userRepository.save(obj);

        return new ResponseEntity<>("Register Successfully", HttpStatus.OK);
    }



    @GetMapping("/getUser/{username}")
    public ResponseEntity<User> getUser(@PathVariable String usertype) {
        User user = userRepository.findByUsertype(usertype);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(@RequestBody UserUpdateDto userUpdateDto) {
        Optional<User> optionalUser = userRepository.findByEmail(userUpdateDto.getOldEmail());

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            if (userUpdateDto.getOldPassword().equals(existingUser.getPassword())){
                existingUser.setEmail(userUpdateDto.getNewEmail());
                existingUser.setPassword(userUpdateDto.getNewPassword());
                userRepository.save(existingUser);
                return ResponseEntity.ok("Profile updated successfully!");
            }
        }

        return ResponseEntity.status(400).body("Failed to update profile. Invalid old email or password.");
    }
}


