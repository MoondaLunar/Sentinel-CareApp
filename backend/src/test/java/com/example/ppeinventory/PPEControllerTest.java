package com.example.ppeinventory;

import com.example.ppeinventory.config.SecurityConfig;
import com.example.ppeinventory.controller.PPEController;
import com.example.ppeinventory.repository.AuditLogRepository;
import com.example.ppeinventory.repository.PPEItemRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Base64;
import java.util.Collections;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PPEController.class)
@Import(SecurityConfig.class)
public class PPEControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PPEItemRepository repo;

    @MockBean
    private AuditLogRepository auditRepo;

    @Test
    public void testListPPE() throws Exception {
        when(repo.findAll()).thenReturn(Collections.emptyList());
        String auth = Base64.getEncoder().encodeToString("admin:password".getBytes());

        mockMvc.perform(get("/api/ppe").header("Authorization", "Basic " + auth))
                .andExpect(status().isOk());
    }
}
