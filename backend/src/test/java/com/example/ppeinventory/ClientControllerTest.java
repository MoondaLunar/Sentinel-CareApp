package com.example.ppeinventory;

import com.example.ppeinventory.config.SecurityConfig;
import com.example.ppeinventory.controller.ClientController;
import com.example.ppeinventory.repository.AuditLogRepository;
import com.example.ppeinventory.repository.ClientRepository;
import com.example.ppeinventory.repository.VitalRepository;
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

@WebMvcTest(ClientController.class)
@Import(SecurityConfig.class)
public class ClientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClientRepository clientRepo;

    @MockBean
    private VitalRepository vitalRepo;

    @MockBean
    private AuditLogRepository auditRepo;

    @Test
    public void testListClients() throws Exception {
        when(clientRepo.findAll()).thenReturn(Collections.emptyList());
        String auth = Base64.getEncoder().encodeToString("admin:password".getBytes());
        mockMvc.perform(get("/api/clients").header("Authorization", "Basic " + auth))
                .andExpect(status().isOk());
    }
}
