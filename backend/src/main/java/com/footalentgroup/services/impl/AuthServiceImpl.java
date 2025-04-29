package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.ConflictException;
import com.footalentgroup.models.dtos.request.UserRequestDto;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.repositories.UserRepository;
import com.footalentgroup.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;

    @Override
    public void createUser(UserEntity user) {
        this.assertEmailNotExist(user.getEmail());
        this.userRepository.save(user);
    }

    private void assertEmailNotExist(String email) {
        this.userRepository
                .findByEmail(email)
                .ifPresent(user -> { throw new ConflictException("El correo ya está registrado: " + email); });
    }
}
