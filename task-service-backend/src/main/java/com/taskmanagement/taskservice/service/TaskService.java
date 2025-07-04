package com.taskmanagement.taskservice.service;

import com.taskmanagement.taskservice.client.EmployeeClient;
import com.taskmanagement.taskservice.entity.Task;
import com.taskmanagement.taskservice.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private EmployeeClient employeeClient;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task, String token) {
        // Verify employee exists
        if (!employeeClient.employeeExists(task.getEmployeeId(), token)) {
            throw new RuntimeException("Employee not found");
        }
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task taskDetails, String token) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        
        // Verify employee exists if changed
        if (!task.getEmployeeId().equals(taskDetails.getEmployeeId())) {
            if (!employeeClient.employeeExists(taskDetails.getEmployeeId(), token)) {
                throw new RuntimeException("Employee not found");
            }
        }
        
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        task.setDueDate(taskDetails.getDueDate());
        task.setEmployeeId(taskDetails.getEmployeeId());
        
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepository.delete(task);
    }
}