package com.todo.todo_list.service;

import com.todo.todo_list.config.AuthenticationResponse;
import com.todo.todo_list.dtos.AuthenticationRequest;
import com.todo.todo_list.dtos.RegisterRequest;
import com.todo.todo_list.dtos.RegistrationResponse;
import com.todo.todo_list.model.User;
import com.todo.todo_list.model.Role;
import com.todo.todo_list.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public RegistrationResponse register(RegisterRequest request) {
        String username = request.getUsername();
//        var user = User.builder()
//                .username(request.getUsername())
//                .password(passwordEncoder.encode(request.getPassword()))
//                .role(Role.User)
//                .build();
//            //validate if user pre-exist in db
//
//            repository.save(user);
//            var jwtToken = jwtService.generateToken(user);
//            return RegistrationResponse.builder()
//                .message("Successfully user registered")
//                .build();
        Optional<User> existingUser = repository.findByUsername(username);
        if (existingUser.isPresent()) {
            return RegistrationResponse.builder()
                    .message("User Already exists")
                    .build();
        } else {
            var user = User.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.User)
                    .build();

            repository.save(user);
            var jwtToken = jwtService.generateToken(user);

            return RegistrationResponse.builder()
                    .message("Successfully registered")
                    .build();
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = repository.findByUsername(request.getUsername())
            .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
