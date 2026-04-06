package com.example.ppeinventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ppeinventory.model.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}
