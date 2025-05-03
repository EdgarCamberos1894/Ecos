package com.footalentgroup.configuration;

import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.models.enums.Role;
import com.footalentgroup.repositories.UserRepository;
import com.footalentgroup.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final String AUTHORIZATION = "Authorization";

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        String token = jwtService.extractToken(request.getHeader(AUTHORIZATION));

        if (request.getServletPath().contains("/auth") || token.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        if (jwtService.isTokenExpired(token)) { // si el token expiro

            String refreshToken = extractRefreshTokenFromCookies(request);
            if (refreshToken != null && !jwtService.isTokenExpired(refreshToken)) {
                String email = jwtService.email(refreshToken);
                UserEntity user = userRepository.findByEmail(email).orElse(null);

                if (user != null) {
                    //se genera un nuevo token de acceso
                    String newAccessToken = jwtService.createToken(
                            user.getEmail(),
                            user.getPassword(),
                            user.getRole().name()
                    );
                    response.setHeader("Nuevo-token-acceso", newAccessToken);

                    GrantedAuthority authority = new SimpleGrantedAuthority(Role.PREFIX + jwtService.role(token));
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            token,
                            List.of(authority)
                    );
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
                }
            } else {
                String email = jwtService.email(token);
                GrantedAuthority authority = new SimpleGrantedAuthority(Role.PREFIX + jwtService.role(token));
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        List.of(authority)
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
    }

    private String extractRefreshTokenFromCookies(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("refresh_token")) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}