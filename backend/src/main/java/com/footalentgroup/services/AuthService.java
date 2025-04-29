package com.footalentgroup.services;

import com.footalentgroup.models.entities.UserEntity;

public interface AuthService {
    public void createUser(UserEntity userDto);
}
