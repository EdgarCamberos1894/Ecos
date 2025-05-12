package com.footalentgroup.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "musician_follows", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"musician_id", "fan_id"})
})
public class MusicianFollowsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Column(updatable = false)
    private OffsetDateTime created_at;

    @ManyToOne
    @JoinColumn(name = "musician", nullable = false)
    private MusicianProfileEntity musician;

    @ManyToOne
    @JoinColumn(name = "fan", nullable = false)
    private FanProfileEntity fan;
}
