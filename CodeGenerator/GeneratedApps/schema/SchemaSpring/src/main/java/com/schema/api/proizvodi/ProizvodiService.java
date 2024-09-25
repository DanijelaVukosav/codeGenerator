package com.schema.api.proizvodi;

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
public class ProizvodiService {
    private final ProizvodiRepository proizvodiRepository;

    @Autowired
        public ProizvodiService(ProizvodiRepository proizvodiRepository) {
this.proizvodiRepository = proizvodiRepository;
    }
    @Transactional(readOnly = true)
    public Proizvodi findById(Integer id) {
        Optional<Proizvodi> proizvodi = proizvodiRepository.findById(id);
        return proizvodi.orElse(null);
    }
    @Transactional
    public Proizvodi create(Proizvodi proizvodi) {

        return proizvodiRepository.save(proizvodi);
    }
    @Transactional
    public Proizvodi update(Integer id, Proizvodi updatedProizvodi) {
        Optional<Proizvodi> existingProizvodi = proizvodiRepository.findById(id);
        if (existingProizvodi.isPresent()) {
            updatedProizvodi.setId(id);
            return proizvodiRepository.save(updatedProizvodi);
        }
        return null;
    }
    @Transactional(readOnly = true)
    public Page<Proizvodi> getAllByFilters(
            ArrayList<FilterCriteria> criteria, Pageable pageable) {
        ProizvodiSpecification specification = ProizvodiSpecification.of(criteria);
        return proizvodiRepository.findAll(specification, pageable);
    }
    public List<Proizvodi> getAll() {
        return proizvodiRepository.findAll();
    }
    public boolean deleteById(Integer id) {
        Optional<Proizvodi> proizvodi = proizvodiRepository.findById(id);
        if (proizvodi.isPresent()) {
        proizvodiRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
