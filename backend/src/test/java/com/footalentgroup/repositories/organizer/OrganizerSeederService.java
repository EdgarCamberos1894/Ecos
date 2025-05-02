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
import java.time.LocalDateTime;
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
                .name("Bob Smith")
                .gender("Masculino")
                .country("Argentina")
                .description("Productor musical con experiencia en festivales y conciertos")
                .user(UserEntity.builder().id(3L).build())
                .build();
        this.organizerUserRepository.save(organizer);

        LogManager.getLogger(this.getClass()).info("----- Event Initial Load -----");
        EventEntity[] events = {
                EventEntity.builder()
                        .name("Rock en Vivo")
                        .category("Rock")
                        .date(LocalDateTime.of(2025, 2, 5, 20, 45))
                        .location("Estadio Malvinas Argentinas, Mendoza, Argentina")
                        .description("Concierto con bandas de rock nacionales e internacionales")
                        .organizer(organizer)
                        .build(),
                EventEntity.builder()
                        .name("Festival de Jazz")
                        .category("Jazz")
                        .date(LocalDateTime.of(2025, 6, 20, 21, 0))
                        .location("Club de Jazz Buenos Aires, Buenos Aires, Argentina")
                        .description("Evento con los mejores exponentes del jazz argentino")
                        .organizer(organizer)
                        .build(),
        };
        this.eventRepository.saveAll(Arrays.asList(events));
    }

    public void deleteAll() {
        this.organizerUserRepository.deleteAll();
    }
}
