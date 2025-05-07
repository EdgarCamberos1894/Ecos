package com.footalentgroup.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class JwtService {
    private static final String EMAIL_CLAIM = "email";
    private static final String NAME_CLAIM = "name";
    private static final String ROLE_CLAIM = "role";
    private static final String ID_CLAIM = "id";

    private final String secret;
    private final String issuer;
    private final int expire;
    private final int refreshExpiration;

    public JwtService(@Value("${jwt.secret}") String secret, @Value("${jwt.issuer}") String issuer, @Value("${jwt.expire}") int expire, @Value("${JWT_REFRESH_EXPIRE}") int refreshExpiration) {
        this.secret = secret;
        this.issuer = issuer;
        this.expire = expire;
        this.refreshExpiration = refreshExpiration;
    }

    public String extractToken(String bearer) {
        if (bearer != null && bearer.startsWith("Bearer ") && 3 == bearer.split("\\.").length) {
            return bearer.substring(7);
        } else {
            return "";
        }
    }

    public String createToken(String email, String name,Long id, String role) {
        return generateToken(email, name, id, role, this.expire);
    }

    public String generateToken(String email, String name, Long id, String role, long expirationTime) {
        return JWT.create()
                .withIssuer(this.issuer)
                .withIssuedAt(new Date())
                .withNotBefore(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime * 1000L))
                .withClaim(EMAIL_CLAIM, email)
                .withClaim(NAME_CLAIM, name)
                .withClaim(ID_CLAIM, id)
                .withClaim(ROLE_CLAIM, role)
                .sign(getAlgorithm());
    }

    public String refreshToken(String email, String name, Long id, String role) {
        return generateToken(email, name,id,  role, this.refreshExpiration);
    }

    public String email(String authorization) {
        return this.verifyToken(authorization)
                .map(jwt -> jwt.getClaim(EMAIL_CLAIM).asString())
                .orElse(null);
    }

    public String name(String authorization) {
        return this.verifyToken(authorization)
                .map(jwt -> jwt.getClaim(NAME_CLAIM).asString())
                .orElse(null);
    }

    public Long id(String authorization) {
        return this.verifyToken(authorization)
                .map(jwt -> jwt.getClaim(ID_CLAIM).asLong())
                .orElse(null);
    }

    public String role(String authorization) {
        return this.verifyToken(authorization)
                .map(jwt -> jwt.getClaim(ROLE_CLAIM).asString())
                .orElse(null);
    }

    private Optional<DecodedJWT> verifyToken(String token) {
        try {
            return Optional.of(
                    JWT.require(getAlgorithm())
                    .withIssuer(this.issuer)
                    .build()
                    .verify(token)
            );
        } catch (JWTVerificationException ex) {
            return Optional.empty();
        }
    }

    public boolean isTokenExpired(String token) {
        Optional<DecodedJWT> decodedJWT = verifyToken(token);
        return decodedJWT.isEmpty() || decodedJWT.get().getExpiresAt().before(new Date());
    }


    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(this.secret);
    }
}
