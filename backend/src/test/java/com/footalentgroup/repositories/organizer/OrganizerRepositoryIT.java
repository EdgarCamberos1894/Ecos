package com.footalentgroup.repositories.organizer;

import com.footalentgroup.TestConfig;
import com.footalentgroup.models.entities.OrganizerUserEntity;
import com.footalentgroup.repositories.OrganizerUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@TestConfig
class OrganizerRepositoryIT {

    @Autowired
    private OrganizerUserRepository organizerUserRepository;

    @Test
    void testFindByUser_Id() {
        assertTrue(this.organizerUserRepository.findByUser_Id(3L).isPresent());

        OrganizerUserEntity organizerUser = this.organizerUserRepository.findByUser_Id(3L).get();

        assertEquals("Bob Smith", organizerUser.getName());
        assertEquals("Masculino", organizerUser.getGender());
        assertEquals("Argentina", organizerUser.getCountry());
        assertEquals("Productor musical con experiencia en festivales y conciertos", organizerUser.getDescription());
    }
}
