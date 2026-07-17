package com.footalentgroup.repositories.user;

import com.footalentgroup.TestConfig;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.models.enums.Role;
import com.footalentgroup.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@TestConfig
class UserRepositoryIT {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindById() {
        assertTrue(userRepository.findById(1L).isPresent());
        UserEntity userFan = userRepository.findById(1L).get();
        assertEquals("Alice Johnson", userFan.getName());
        assertEquals("alice.johnson@example.com", userFan.getEmail());
        assertEquals(Role.FAN, userFan.getRole());

        assertTrue(userRepository.findById(16L).isPresent());
        UserEntity userMusician = userRepository.findById(16L).get();
        assertEquals("Peter Donovan", userMusician.getName());
        assertEquals("peter.donovan@example.com", userMusician.getEmail());
        assertEquals(Role.MUSICIAN, userMusician.getRole());
    }

    @Test
    void testFindByEmail() {
        assertTrue(userRepository.findByEmail("alice.johnson@example.com").isPresent());
    }
}
