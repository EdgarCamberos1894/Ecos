package com.footalentgroup.services;

import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

@Service
public class EmailTemplateService {
    public String actionEmail(String eyebrow, String title, String greeting, String message, String actionLabel, String actionUrl, String footnote) {
        String content = """
                <p style="margin:0 0 24px;color:#334155;font-family:Arial,sans-serif;font-size:16px;line-height:25px;">%s</p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 28px;"><tr><td style="border-radius:6px;background:#F28C28;"><a href="%s" style="display:inline-block;padding:13px 20px;color:#14213D;font-family:Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;">%s</a></td></tr></table>
                <p style="margin:0;color:#64748B;font-family:Arial,sans-serif;font-size:13px;line-height:20px;">%s</p>
                """.formatted(escape(message), escapeUrl(actionUrl), escape(actionLabel), escape(footnote));
        return shell(eyebrow, title, greeting, content);
    }

    public String contactEmail(String subject, String message, String senderEmail) {
        String content = """
                <p style="margin:0 0 8px;color:#64748B;font-family:Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Mensaje</p>
                <div style="margin:0 0 24px;padding:18px;border-left:3px solid #F28C28;background:#F8FAFC;color:#334155;font-family:Arial,sans-serif;font-size:16px;line-height:25px;white-space:pre-line;">%s</div>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td style="border-radius:6px;background:#14213D;"><a href="mailto:%s" style="display:inline-block;padding:13px 20px;color:#FFFFFF;font-family:Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;">Responder a %s</a></td></tr></table>
                """.formatted(escape(message), escapeUrl(senderEmail), escape(senderEmail));
        return shell("Contacto directo", subject, "Recibiste un nuevo mensaje a traves de Ecos.", content);
    }

    private String shell(String eyebrow, String title, String greeting, String content) {
        return """
                <!doctype html>
                <html lang="es"><body style="margin:0;padding:0;background:#F3F6FA;">
                <table role="presentation" width="100%%" cellspacing="0" cellpadding="0" border="0" style="background:#F3F6FA;"><tr><td align="center" style="padding:32px 16px;">
                <table role="presentation" width="100%%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#FFFFFF;">
                  <tr><td style="padding:24px 32px;background:#14213D;"><span style="color:#FFFFFF;font-family:Arial,sans-serif;font-size:26px;font-weight:700;letter-spacing:1px;">ECOS</span><span style="margin-left:10px;color:#F6B25C;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Musica independiente</span></td></tr>
                  <tr><td style="padding:36px 32px 32px;"><p style="margin:0 0 10px;color:#D86D12;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">%s</p><h1 style="margin:0 0 14px;color:#14213D;font-family:Arial,sans-serif;font-size:28px;line-height:34px;">%s</h1><p style="margin:0 0 24px;color:#334155;font-family:Arial,sans-serif;font-size:16px;line-height:25px;">%s</p>%s</td></tr>
                  <tr><td style="padding:18px 32px;border-top:1px solid #E2E8F0;color:#64748B;font-family:Arial,sans-serif;font-size:12px;line-height:18px;">Ecos conecta artistas, audiencia y escenarios.</td></tr>
                </table></td></tr></table></body></html>
                """.formatted(escape(eyebrow), escape(title), escape(greeting), content);
    }

    private String escape(String value) { return HtmlUtils.htmlEscape(value == null ? "" : value); }
    private String escapeUrl(String value) { return HtmlUtils.htmlEscape(value == null ? "" : value); }
}
