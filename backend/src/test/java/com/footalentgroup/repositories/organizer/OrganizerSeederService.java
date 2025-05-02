package com.footalentgroup.repositories.organizer;

import com.footalentgroup.models.entities.EventEntity;
import com.footalentgroup.models.entities.OrganizerUserEntity;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.repositories.EventRepository;
import com.footalentgroup.repositories.OrganizerUserRepository;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;

@Service
public class OrganizerSeederService {

    @Autowired
    private OrganizerUserRepository organizerUserRepository;

    @Autowired
    private EventRepository eventRepository;

    public void seedDatabase() {
        LogManager.getLogger(this.getClass()).info("----- Organizer Initial Load -----");
        OrganizerUserEntity organizer = OrganizerUserEntity.builder()
                .user(UserEntity.builder().id(3L).build())
                .build();
        this.organizerUserRepository.save(organizer);

        LogManager.getLogger(this.getClass()).info("----- Event Initial Load -----");
        EventEntity[] events = {
                EventEntity.builder()
                        .name("Rock Fest")
                        .date(LocalDate.of(2025, 5, 4))
                        .location("Mendoza, Argentina")
                        .description("Un festival que reúne a bandas de rock nacionales e internacionales")
                        .image("https://rockfest.jpg")
                        .active(true)
                        .organizer(organizer)
                        .build(),
                EventEntity.builder()
                        .name("Jazz Night")
                        .date(LocalDate.of(2025, 7, 7))
                        .active(false)
                        .organizer(organizer)
                        .build(),
        };
        this.eventRepository.saveAll(Arrays.asList(events));
    }

    public void deleteAll() {
        this.organizerUserRepository.deleteAll();
    }
}
