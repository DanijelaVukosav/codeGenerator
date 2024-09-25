package com.schema.api.narudzbe;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.schema.api.korisnici.Korisnici;
import com.schema.api.proizvodi.Proizvodi;
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
@Table(name = "narudzbe")
@SQLDelete(sql = "UPDATE narudzbe SET is_deleted = true WHERE id=?")
@SQLRestriction(value = "is_deleted=false")
public class Narudzbe {
        private static final long serialVersionUID = 1L;
@Id
@GeneratedValue(strategy=GenerationType.AUTO)
@NotNull
@Column(name="id")
private Integer id;
 
@NotNull
@Column(name="kolicina")
private Integer kolicina;
 
@NotNull
@Column(name="datum_narudzbe")
private LocalDateTime datum_narudzbe;
 
@NotNull
@Column(name="korisnik_id")
private Integer korisnik_id;
 
@ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
@JoinColumn(name = "id", insertable = false, updatable = false)
private Korisnici Korisnici_korisnik_id;
 
@NotNull
@Column(name="proizvod_id")
private Integer proizvod_id;
 
@ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
@JoinColumn(name = "id", insertable = false, updatable = false)
private Proizvodi Proizvodi_proizvod_id;
 
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
        public Narudzbe() {
        }
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setKorisnik_id(Integer korisnik_id) {
        this.korisnik_id = korisnik_id;
    }

    public Integer getKorisnik_id() {
        return korisnik_id;
    }

    public void setKorisnici_korisnik_id(Korisnici Korisnici_korisnik_id) {
        this.Korisnici_korisnik_id = Korisnici_korisnik_id;
    }

    public Korisnici getKorisnici_korisnik_id() {
        return Korisnici_korisnik_id;
    }

    public void setProizvod_id(Integer proizvod_id) {
        this.proizvod_id = proizvod_id;
    }

    public Integer getProizvod_id() {
        return proizvod_id;
    }

    public void setProizvodi_proizvod_id(Proizvodi Proizvodi_proizvod_id) {
        this.Proizvodi_proizvod_id = Proizvodi_proizvod_id;
    }

    public Proizvodi getProizvodi_proizvod_id() {
        return Proizvodi_proizvod_id;
    }

    public void setKolicina(Integer kolicina) {
        this.kolicina = kolicina;
    }

    public Integer getKolicina() {
        return kolicina;
    }

    public void setDatum_narudzbe(LocalDateTime datum_narudzbe) {
        this.datum_narudzbe = datum_narudzbe;
    }

    public LocalDateTime getDatum_narudzbe() {
        return datum_narudzbe;
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
