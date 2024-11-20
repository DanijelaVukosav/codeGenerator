package com.schema.api.narudzbe;

import com.schema.api.korisnici.Korisnici;
import com.schema.api.korisnici.KorisniciRepository;
import com.schema.api.proizvodi.Proizvodi;
import com.schema.api.proizvodi.ProizvodiRepository;
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
public class NarudzbeService {
    private final NarudzbeRepository narudzbeRepository;
    private final KorisniciRepository korisniciRepository;
    private final ProizvodiRepository proizvodiRepository;

    @Autowired
    public NarudzbeService(NarudzbeRepository narudzbeRepository, KorisniciRepository korisniciRepository, ProizvodiRepository proizvodiRepository) {
        this.narudzbeRepository = narudzbeRepository;
        this.korisniciRepository = korisniciRepository;
        this.proizvodiRepository = proizvodiRepository;
    }

    @Transactional(readOnly = true)
    public Narudzbe findById(Integer id) {
        Optional<Narudzbe> narudzbe = narudzbeRepository.findById(id);
        return narudzbe.orElse(null);
    }

    @Transactional
    public Narudzbe create(Narudzbe narudzbe) {
        Optional<Korisnici> existingForeignkorisnik_id = korisniciRepository.findById(narudzbe.getKorisnik_id());
        if (existingForeignkorisnik_id.isPresent()) {
            narudzbe.setKorisnici_korisnik_id(existingForeignkorisnik_id.get());
        } else {
            Korisnici newKorisnici = narudzbe.getKorisnici_korisnik_id();
            korisniciRepository.save(newKorisnici);
            narudzbe.setKorisnici_korisnik_id(newKorisnici);
        }
        Optional<Proizvodi> existingForeignproizvod_id = proizvodiRepository.findById(narudzbe.getProizvod_id());
        if (existingForeignproizvod_id.isPresent()) {
            narudzbe.setProizvodi_proizvod_id(existingForeignproizvod_id.get());
        } else {
            Proizvodi newProizvodi = narudzbe.getProizvodi_proizvod_id();
            proizvodiRepository.save(newProizvodi);
            narudzbe.setProizvodi_proizvod_id(newProizvodi);
        }
        return narudzbeRepository.save(narudzbe);
    }

    @Transactional
    public Narudzbe update(Integer id, Narudzbe updatedNarudzbe) {
        Optional<Narudzbe> existingNarudzbe = narudzbeRepository.findById(id);
        if (existingNarudzbe.isPresent()) {
            updatedNarudzbe.setId(id);
            return narudzbeRepository.save(updatedNarudzbe);
        }
        return null;
    }

    @Transactional(readOnly = true)
    public Page<Narudzbe> getAllByFilters(
            ArrayList<FilterCriteria> criteria, Pageable pageable) {
        NarudzbeSpecification specification = NarudzbeSpecification.of(criteria);
        return narudzbeRepository.findAll(specification, pageable);
    }

    public List<Narudzbe> getAll() {
        return narudzbeRepository.findAll();
    }

    public boolean deleteById(Integer id) {
        Optional<Narudzbe> narudzbe = narudzbeRepository.findById(id);
        if (narudzbe.isPresent()) {
            narudzbeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
