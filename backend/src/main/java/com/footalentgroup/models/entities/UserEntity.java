package com.footalentgroup.models.entities;

import com.footalentgroup.models.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Builder.Default
    @Column(nullable = false)
    private Boolean emailVerified = false;

    private String emailVerificationTokenHash;

    private Instant emailVerificationExpiresAt;

    private String passwordResetTokenHash;

    private Instant passwordResetExpiresAt;

    @Enumerated(EnumType.STRING)
    private Role role;
}
