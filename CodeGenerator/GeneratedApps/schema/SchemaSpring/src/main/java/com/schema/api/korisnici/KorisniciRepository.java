package com.schema.api.korisnici;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
@Repository
public interface KorisniciRepository extends JpaRepository<Korisnici, Integer>, JpaSpecificationExecutor<Korisnici> {
}
