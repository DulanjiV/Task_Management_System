package com.taskmanagement.taskservice.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class EmployeeClient {
    
    @Value("${employee.service.url}")
    private String employeeServiceUrl;
    
    private final RestTemplate restTemplate = new RestTemplate();
    
    public boolean employeeExists(Long employeeId, String token) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<Object> response = restTemplate.exchange(
                employeeServiceUrl + "/employees/" + employeeId,
                HttpMethod.GET,
                entity,
                Object.class
            );
            
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            return false;
        }
    }
}