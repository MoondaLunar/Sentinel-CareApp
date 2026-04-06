package com.example.ppeinventory.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import java.util.List;

import com.example.ppeinventory.model.PPEItem;
import com.example.ppeinventory.model.AuditLog;
import com.example.ppeinventory.repository.PPEItemRepository;
import com.example.ppeinventory.repository.AuditLogRepository;

@RestController
@RequestMapping("/api/ppe")
public class PPEController {
    private final PPEItemRepository repo;
    private final AuditLogRepository auditRepo;

    public PPEController(PPEItemRepository repo, AuditLogRepository auditRepo) { this.repo = repo; this.auditRepo = auditRepo; }

    @GetMapping
    public List<PPEItem> list() { return repo.findAll(); }

    @PostMapping
    public PPEItem create(@RequestBody PPEItem item, Authentication auth) {
        PPEItem saved = repo.save(item);
        auditRepo.save(new AuditLog(auth==null?"anonymous":auth.getName(), "CREATE", "PPEItem", saved.getId(), "created: name="+saved.getName()));
        return saved;
    }

    @PutMapping("/{id}")
    public ResponseEntity<PPEItem> update(@PathVariable Long id, @RequestBody PPEItem updated, Authentication auth) {
        return repo.findById(id).map(existing -> {
            String before = String.format("name=%s,qty=%d,loc=%s", existing.getName(), existing.getQuantity(), existing.getLocation());
            existing.setName(updated.getName());
            existing.setQuantity(updated.getQuantity());
            existing.setLocation(updated.getLocation());
            PPEItem saved = repo.save(existing);
            String after = String.format("name=%s,qty=%d,loc=%s", saved.getName(), saved.getQuantity(), saved.getLocation());
            auditRepo.save(new AuditLog(auth==null?"anonymous":auth.getName(), "UPDATE", "PPEItem", saved.getId(), "before: "+before+"; after: "+after));
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication auth) {
        return repo.findById(id).map(existing -> {
            String snapshot = String.format("name=%s,qty=%d,loc=%s", existing.getName(), existing.getQuantity(), existing.getLocation());
            repo.delete(existing);
            auditRepo.save(new AuditLog(auth==null?"anonymous":auth.getName(), "DELETE", "PPEItem", id, "deleted: "+snapshot));
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
