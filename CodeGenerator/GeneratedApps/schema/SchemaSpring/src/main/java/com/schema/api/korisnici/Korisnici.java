package com.schema.api.korisnici;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "korisnici")
@SQLDelete(sql = "UPDATE korisnici SET is_deleted = true WHERE id=?")
@SQLRestriction(value = "is_deleted=false")
public class Korisnici {
        private static final long serialVersionUID = 1L;
@Id
@GeneratedValue(strategy=GenerationType.AUTO)
@NotNull
@Column(name="id")
private Integer id;
 
@NotNull
@Column(name="ime")
private String ime;
 
@NotNull
@Column(name="email", unique = true)
private String email;
 
@NotNull
@Column(name="datum_registracije")
private LocalDateTime datum_registracije;
 

@CreatedDate
    @Column(
            nullable = false,
            updatable = false
    )
    private LocalDateTime createDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModified;


    @CreatedBy
    @Column(
            nullable = false,
            updatable = false
    )
    private String createdBy;

    @LastModifiedBy
    @Column(insertable = false)
    private String lastModifiedBy;
        @JsonIgnore
        private boolean isDeleted = Boolean.FALSE;
        public Korisnici() {
        }
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getIme() {
        return ime;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setDatum_registracije(LocalDateTime datum_registracije) {
        this.datum_registracije = datum_registracije;
    }

    public LocalDateTime getDatum_registracije() {
        return datum_registracije;
    }

public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public LocalDateTime getLastModified() {
        return lastModified;
    }

    public void setLastModified(LocalDateTime lastModified) {
        this.lastModified = lastModified;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

        public boolean isDeleted() {
        return isDeleted;
}
        public void setDeleted(boolean deleted) {
        isDeleted = deleted;
}
}
