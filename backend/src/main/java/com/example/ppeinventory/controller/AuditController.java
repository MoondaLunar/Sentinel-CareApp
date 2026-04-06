package com.example.ppeinventory.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.ppeinventory.model.AuditLog;
import com.example.ppeinventory.repository.AuditLogRepository;

@RestController
@RequestMapping("/api/audit")
public class AuditController {
    private final AuditLogRepository repo;
    public AuditController(AuditLogRepository repo) { this.repo = repo; }
    @GetMapping
    public List<AuditLog> list() { return repo.findAll(); }
}
