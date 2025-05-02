package com.footalentgroup.repositories.organizer;

import com.footalentgroup.TestConfig;
import com.footalentgroup.models.entities.EventEntity;
import com.footalentgroup.repositories.EventRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@TestConfig
class EventRepositoryIT {

    @Autowired
    private EventRepository eventRepository;

    @Test
    void testFindAllByOrganizer_Id() {
        List<EventEntity> events = this.eventRepository.findAllByOrganizer_Id(1L);
        assertEquals(2, events.size());
    }
}
