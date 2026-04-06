package com.example.ppeinventory.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String action; // CREATE/UPDATE/DELETE
    private String entityName;
    private Long entityId;
    private LocalDateTime timestamp = LocalDateTime.now();
    @Column(length=2000)
    private String details;
    private String reasonCode;

    public AuditLog() {}
    public AuditLog(String username, String action, String entityName, Long entityId, String details) {
        this.username = username; this.action = action; this.entityName = entityName; this.entityId = entityId; this.details = details;
    }
    public AuditLog(String username, String action, String entityName, Long entityId, String details, String reasonCode) {
        this.username = username; this.action = action; this.entityName = entityName; this.entityId = entityId; this.details = details; this.reasonCode = reasonCode;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getAction() { return action; }
    public String getEntityName() { return entityName; }
    public Long getEntityId() { return entityId; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public String getDetails() { return details; }
    public String getReasonCode() { return reasonCode; }
}
