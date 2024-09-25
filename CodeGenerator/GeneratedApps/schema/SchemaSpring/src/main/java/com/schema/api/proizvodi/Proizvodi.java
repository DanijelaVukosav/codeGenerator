package com.schema.api.proizvodi;
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
@Table(name = "proizvodi")
@SQLDelete(sql = "UPDATE proizvodi SET is_deleted = true WHERE id=?")
@SQLRestriction(value = "is_deleted=false")
public class Proizvodi {
        private static final long serialVersionUID = 1L;
@Id
@GeneratedValue(strategy=GenerationType.AUTO)
@NotNull
@Column(name="id")
private Integer id;
 
@NotNull
@Column(name="naziv")
private String naziv;
 
@NotNull
@Column(name="cijena")
private Double cijena;
 
@NotNull
@Column(name="kolicina_na_skladistu")
private Integer kolicina_na_skladistu;
 

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
        public Proizvodi() {
        }
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setCijena(Double cijena) {
        this.cijena = cijena;
    }

    public Double getCijena() {
        return cijena;
    }

    public void setKolicina_na_skladistu(Integer kolicina_na_skladistu) {
        this.kolicina_na_skladistu = kolicina_na_skladistu;
    }

    public Integer getKolicina_na_skladistu() {
        return kolicina_na_skladistu;
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
