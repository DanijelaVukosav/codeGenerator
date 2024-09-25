package com.schema.api.korisnici;
import com.schema.api.utils.FilterAndSortUtils;
import com.schema.api.utils.FilterData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/data/korisnici")
public class KorisniciController {
    private final KorisniciService korisniciService;
    @Autowired
    public KorisniciController(KorisniciService korisniciService) {
        this.korisniciService = korisniciService;
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('KORISNICI_READ')")
    public ResponseEntity<Korisnici> getKorisniciById(@PathVariable Integer id) {
        Korisnici korisnici = korisniciService.findById(id);
        if (korisnici != null) {
            return ResponseEntity.ok().body(korisnici);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping
    @PreAuthorize("hasAuthority('KORISNICI_CREATE')")
    public ResponseEntity<Korisnici> createKorisnici(@RequestBody Korisnici korisnici) {
        Korisnici createdKorisnici = korisniciService.create(korisnici);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdKorisnici);
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('KORISNICI_UPDATE')")
    public ResponseEntity<Korisnici> updateKorisnici(@PathVariable Integer id, @RequestBody Korisnici updatedKorisnici) {
        Korisnici korisnici = korisniciService.update(id, updatedKorisnici);
        if (korisnici != null) {
            return ResponseEntity.ok().body(korisnici);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping
    @PreAuthorize("hasAuthority('KORISNICI_READ')")
    public ResponseEntity<List<Korisnici>> getAllKorisnicis() {
        List<Korisnici> korisniciList = korisniciService.getAll();
        return ResponseEntity.ok().body(korisniciList);
    }
    @PostMapping("/filter")
    @PreAuthorize("hasAuthority('KORISNICI_READ')")
    public Page<Korisnici> getAllKorisniciByFilter(@RequestBody(required = false) FilterData filterData) {
        Pageable pageable = PageRequest.of(filterData.getPage(), filterData.getSize(), Sort.by(FilterAndSortUtils.ParseSortColumns(filterData.getSort())));
        return korisniciService.getAllByFilters(filterData.getFilter(), pageable);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('KORISNICI_DELETE')")
    public ResponseEntity<Void> deleteKorisnici(@PathVariable Integer id) {
        boolean deleted = korisniciService.deleteById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
