package com.footalentgroup.services;

import com.footalentgroup.models.dtos.request.ContactRequestDto;
import com.footalentgroup.models.entities.UserEntity;

public interface EmailService {
    void sendEmail(ContactRequestDto contact);
    void sendVerificationEmail(UserEntity user, String token);
    void sendPasswordResetEmail(UserEntity user, String token);
}
