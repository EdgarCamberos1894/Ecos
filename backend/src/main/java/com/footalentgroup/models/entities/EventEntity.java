package com.footalentgroup.models.entities;

import com.footalentgroup.models.enums.EventTicket;
import com.footalentgroup.models.enums.EventType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.type.TrueFalseConverter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "events")
public class EventEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EventType type;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private LocalDate date;

    @Column(nullable = false)
    @Temporal(TemporalType.TIME)
    private LocalTime startTime;

    @Column(nullable = false)
    @Temporal(TemporalType.TIME)
    private LocalTime endTime;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = true)
    private String image;

    @Column(nullable = true)
    private String imagePublicId;

    @Enumerated(EnumType.STRING)
    private EventTicket ticket;

    @Column(nullable = true)
    private BigDecimal price;

    @Convert(converter = TrueFalseConverter.class)
    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "musician_id", nullable = false)
    private MusicianProfileEntity musician;
}
