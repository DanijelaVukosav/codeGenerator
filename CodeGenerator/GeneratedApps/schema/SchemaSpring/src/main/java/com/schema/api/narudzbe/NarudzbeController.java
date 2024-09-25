package com.schema.api.narudzbe;
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
@RequestMapping("/api/data/narudzbe")
public class NarudzbeController {
    private final NarudzbeService narudzbeService;
    @Autowired
    public NarudzbeController(NarudzbeService narudzbeService) {
        this.narudzbeService = narudzbeService;
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('NARUDZBE_READ')")
    public ResponseEntity<Narudzbe> getNarudzbeById(@PathVariable Integer id) {
        Narudzbe narudzbe = narudzbeService.findById(id);
        if (narudzbe != null) {
            return ResponseEntity.ok().body(narudzbe);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping
    @PreAuthorize("hasAuthority('NARUDZBE_CREATE')")
    public ResponseEntity<Narudzbe> createNarudzbe(@RequestBody Narudzbe narudzbe) {
        Narudzbe createdNarudzbe = narudzbeService.create(narudzbe);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNarudzbe);
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('NARUDZBE_UPDATE')")
    public ResponseEntity<Narudzbe> updateNarudzbe(@PathVariable Integer id, @RequestBody Narudzbe updatedNarudzbe) {
        Narudzbe narudzbe = narudzbeService.update(id, updatedNarudzbe);
        if (narudzbe != null) {
            return ResponseEntity.ok().body(narudzbe);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping
    @PreAuthorize("hasAuthority('NARUDZBE_READ')")
    public ResponseEntity<List<Narudzbe>> getAllNarudzbes() {
        List<Narudzbe> narudzbeList = narudzbeService.getAll();
        return ResponseEntity.ok().body(narudzbeList);
    }
    @PostMapping("/filter")
    @PreAuthorize("hasAuthority('NARUDZBE_READ')")
    public Page<Narudzbe> getAllNarudzbeByFilter(@RequestBody(required = false) FilterData filterData) {
        Pageable pageable = PageRequest.of(filterData.getPage(), filterData.getSize(), Sort.by(FilterAndSortUtils.ParseSortColumns(filterData.getSort())));
        return narudzbeService.getAllByFilters(filterData.getFilter(), pageable);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('NARUDZBE_DELETE')")
    public ResponseEntity<Void> deleteNarudzbe(@PathVariable Integer id) {
        boolean deleted = narudzbeService.deleteById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
