package com.footalentgroup.services;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface CloudinaryService {
    Map<String, Object> uploadImage(MultipartFile file);

    void deleteImage(String publicId);
}
