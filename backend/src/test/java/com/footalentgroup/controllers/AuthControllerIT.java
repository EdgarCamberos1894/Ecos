package com.footalentgroup.controllers;

import com.footalentgroup.models.dtos.request.UserRequestDto;
import com.footalentgroup.models.dtos.response.TokenResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.BodyInserters;

@RestTestConfig
class AuthControllerIT {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    void testRegister() {
        UserRequestDto userDto = UserRequestDto.builder()
                .name("Fan User")
                .email("user@example.com")
                .password("abcd4567")
                .build();

        this.webTestClient
                .post()
                .uri(AuthController.AUTH)
                .body(BodyInserters.fromValue(userDto))
                .exchange()
                .expectStatus().isCreated()
                .expectBody(TokenResponseDto.class)
                .value(System.out::println);
    }

    @Test
    void testRegisterConflict() {
        UserRequestDto userDto = UserRequestDto.builder()
                .name("Doe John")
                .email("john.doe@example.com")  // Email already exists
                .password("12345678")
                .build();

        this.webTestClient
                .post()
                .uri(AuthController.AUTH)
                .body(BodyInserters.fromValue(userDto))
                .exchange()
                .expectStatus().isEqualTo(HttpStatus.CONFLICT);
    }

    @Test
    void testRegisterNotValid() {
        UserRequestDto userDto = UserRequestDto.builder()
                .name("")   // Empty value
                .email("email@example.com")
                .password("12345678")
                .build();

        this.webTestClient
                .post()
                .uri(AuthController.AUTH)
                .body(BodyInserters.fromValue(userDto))
                .exchange()
                .expectStatus().isEqualTo(HttpStatus.BAD_REQUEST);
    }
}
