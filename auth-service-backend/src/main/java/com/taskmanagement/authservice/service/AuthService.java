package com.taskmanagement.authservice.service;

import com.taskmanagement.authservice.dto.LoginRequest;
import com.taskmanagement.authservice.dto.LoginResponse;
import com.taskmanagement.authservice.dto.RefreshTokenRequest;
import com.taskmanagement.authservice.dto.TokenResponse;
import com.taskmanagement.authservice.entity.RefreshToken;
import com.taskmanagement.authservice.entity.User;
import com.taskmanagement.authservice.repository.UserRepository;
import com.taskmanagement.authservice.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
	@Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private RefreshTokenService refreshTokenService;
    
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        
        String token = jwtUtil.generateToken(user.getUsername());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
        
        return new LoginResponse(token, refreshToken.getToken());
    }
    
    public TokenResponse refreshToken(RefreshTokenRequest request) {
        String requestRefreshToken = request.getRefreshToken();
        
        return refreshTokenService.findByToken(requestRefreshToken)
            .map(refreshTokenService::verifyExpiration)
            .map(RefreshToken::getUser)
            .map(user -> {
                String token = jwtUtil.generateToken(user.getUsername());
                RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user);
                return new TokenResponse(token, newRefreshToken.getToken());
            })
            .orElseThrow(() -> new RuntimeException("Invalid refresh token"));
    }
    
    public void logout(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        refreshTokenService.deleteByUser(user);
    }
}
