package com.schema.api.narudzbe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
@Repository
public interface NarudzbeRepository extends JpaRepository<Narudzbe, Integer>, JpaSpecificationExecutor<Narudzbe> {
}
