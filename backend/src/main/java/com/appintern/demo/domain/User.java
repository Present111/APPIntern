package com.appintern.demo.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "username"))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    // luôn có default khi dùng Lombok Builder
    @Builder.Default
    @Column(nullable = false, length = 32)
    private String role = "ROLE_USER";

    // lớp bảo hiểm: nếu ai đó set null, trước khi insert sẽ tự fix
    @PrePersist
    void ensureRole() {
        if (role == null || role.isBlank()) {
            role = "ROLE_USER";
        }
    }
}
