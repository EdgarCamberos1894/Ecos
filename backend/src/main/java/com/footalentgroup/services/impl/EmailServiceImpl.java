package com.footalentgroup.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.footalentgroup.exceptions.EmailSendingException;
import com.footalentgroup.exceptions.NotFoundException;
import com.footalentgroup.models.dtos.request.ContactRequestDto;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.repositories.MusicianProfileRepository;
import com.footalentgroup.services.EmailService;
import com.footalentgroup.services.EmailTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private static final URI RESEND_EMAILS_URI = URI.create("https://api.resend.com/emails");

    private final MusicianProfileRepository musicianRepository;
    private final ObjectMapper objectMapper;
    private final EmailTemplateService emailTemplateService;

    @Value("${resend.api-key}")
    private String apiKey;

    @Value("${resend.email}")
    private String fromEmail;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Override
    public void sendEmail(ContactRequestDto contact) {
        send(
                getMusicianEmail(contact.getMusicianId()),
                contact.getSubject(),
                contact.getMessage(),
                emailTemplateService.contactEmail(contact.getSubject(), contact.getMessage(), contact.getSenderEmail()),
                contact.getSenderEmail()
        );
    }

    @Override
    public void sendVerificationEmail(UserEntity user, String token) {
        String link = createLink("/verify-email", token);
        send(
                user.getEmail(),
                "Verifica tu cuenta de Ecos",
                "Hola " + user.getName() + ",\n\nConfirma tu correo para activar tu cuenta de Ecos:\n" + link
                        + "\n\nEste enlace vence en 24 horas.",
                emailTemplateService.actionEmail(
                        "Activa tu cuenta",
                        "Verifica tu correo",
                        "Hola " + user.getName() + ",",
                        "Confirma tu correo para activar tu cuenta y empezar a formar parte de la escena Ecos.",
                        "Verificar mi cuenta",
                        link,
                        "Este enlace vence en 24 horas."
                ),
                null
        );
    }

    @Override
    public void sendPasswordResetEmail(UserEntity user, String token) {
        String link = createLink("/reset-password", token);
        send(
                user.getEmail(),
                "Restablece tu contraseña de Ecos",
                "Hola " + user.getName() + ",\n\nSolicitaste restablecer tu contraseña. Crea una nueva aquí:\n" + link
                        + "\n\nEste enlace vence en una hora. Si no lo solicitaste, ignora este correo.",
                emailTemplateService.actionEmail(
                        "Seguridad de tu cuenta",
                        "Restablece tu contrasena",
                        "Hola " + user.getName() + ",",
                        "Recibimos una solicitud para crear una nueva contrasena para tu cuenta de Ecos.",
                        "Crear nueva contrasena",
                        link,
                        "Este enlace vence en una hora. Si no lo solicitaste, puedes ignorar este correo."
                ),
                null
        );
    }

    private void send(String to, String subject, String text, String html, String replyTo) {
        if (apiKey.isBlank() || fromEmail.isBlank()) {
            throw new EmailSendingException("El servicio de correo no está configurado.");
        }

        try {
            ObjectNode body = objectMapper.createObjectNode();
            body.put("from", fromEmail);
            body.putArray("to").add(to);
            body.put("subject", subject);
            body.put("text", text);
            body.put("html", html);
            if (replyTo != null) body.put("reply_to", replyTo);

            HttpRequest request = HttpRequest.newBuilder(RESEND_EMAILS_URI)
                    .timeout(Duration.ofSeconds(10))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body)))
                    .build();

            HttpResponse<String> response = HttpClient.newHttpClient()
                    .send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new EmailSendingException("Resend no pudo enviar el correo.");
            }
        } catch (IOException ex) {
            throw new EmailSendingException("No fue posible conectar con el servicio de correo.");
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new EmailSendingException("El envío del correo fue interrumpido.");
        }
    }

    private String createLink(String path, String token) {
        return frontendUrl.replaceAll("/+$", "") + path + "?token="
                + URLEncoder.encode(token, StandardCharsets.UTF_8);
    }

    private String getMusicianEmail(Long id) {
        return musicianRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Músico/Banda no encontrado: " + id))
                .getUser().getEmail();
    }
}
