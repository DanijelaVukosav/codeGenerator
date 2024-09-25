package com.schema.api.korisnici;

import com.schema.api.utils.FilterCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class KorisniciService {
    private final KorisniciRepository korisniciRepository;

    @Autowired
        public KorisniciService(KorisniciRepository korisniciRepository) {
this.korisniciRepository = korisniciRepository;
    }
    @Transactional(readOnly = true)
    public Korisnici findById(Integer id) {
        Optional<Korisnici> korisnici = korisniciRepository.findById(id);
        return korisnici.orElse(null);
    }
    @Transactional
    public Korisnici create(Korisnici korisnici) {

        return korisniciRepository.save(korisnici);
    }
    @Transactional
    public Korisnici update(Integer id, Korisnici updatedKorisnici) {
        Optional<Korisnici> existingKorisnici = korisniciRepository.findById(id);
        if (existingKorisnici.isPresent()) {
            updatedKorisnici.setId(id);
            return korisniciRepository.save(updatedKorisnici);
        }
        return null;
    }
    @Transactional(readOnly = true)
    public Page<Korisnici> getAllByFilters(
            ArrayList<FilterCriteria> criteria, Pageable pageable) {
        KorisniciSpecification specification = KorisniciSpecification.of(criteria);
        return korisniciRepository.findAll(specification, pageable);
    }
    public List<Korisnici> getAll() {
        return korisniciRepository.findAll();
    }
    public boolean deleteById(Integer id) {
        Optional<Korisnici> korisnici = korisniciRepository.findById(id);
        if (korisnici.isPresent()) {
        korisniciRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
