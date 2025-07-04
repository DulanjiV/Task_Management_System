package com.taskmanagement.employeeservice.repository;

import com.taskmanagement.employeeservice.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}