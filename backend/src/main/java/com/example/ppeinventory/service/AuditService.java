package com.example.ppeinventory.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.example.ppeinventory.model.AuditLog;
import com.example.ppeinventory.repository.AuditLogRepository;

@Service
public class AuditService {
    private final AuditLogRepository auditRepo;
    private final String version;

    public AuditService(AuditLogRepository auditRepo, @Value("${git.commit.id.abbrev:unknown}") String version) {
        this.auditRepo = auditRepo;
        this.version = version;
    }

    public void log(String username, String action, String entityName, Long entityId, String details) {
        auditRepo.save(new AuditLog(username, action, entityName, entityId, details, null, version));
    }

    public void log(String username, String action, String entityName, Long entityId, String details, String reasonCode) {
        auditRepo.save(new AuditLog(username, action, entityName, entityId, details, reasonCode, version));
    }
}