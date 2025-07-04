package com.taskmanagement.taskservice.repository;

import com.taskmanagement.taskservice.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}