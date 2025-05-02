package com.footalentgroup.repositories;

import com.footalentgroup.repositories.organizer.OrganizerSeederService;
import com.footalentgroup.repositories.user.UserSeederService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DatabaseSeederService {

    //private final EntitySeederService entitySeederService;
    private final UserSeederService userSeederService;
    private final OrganizerSeederService organizerSeederService;

    @Autowired
    public DatabaseSeederService(UserSeederService userSeederService, OrganizerSeederService organizerSeederService) {
        //this.entitySeederService = entitySeederService;
        this.userSeederService = userSeederService;
        this.organizerSeederService = organizerSeederService;
        this.seedDatabase();
    }

    public void seedDatabase() {
        //this.entitySeederService.seedDatabase();
        this.userSeederService.seedDatabase();
        this.organizerSeederService.seedDatabase();
    }

    public void deleteAll() {
        //this.entitySeederService.seedDatabase();
        this.userSeederService.deleteAll();
        this.organizerSeederService.deleteAll();
    }

    public void reSeedDatabase() {
        this.deleteAll();
        this.seedDatabase();
    }
}
