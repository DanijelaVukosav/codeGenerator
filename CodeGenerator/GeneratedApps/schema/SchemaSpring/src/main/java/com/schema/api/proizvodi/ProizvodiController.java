package com.schema.api.proizvodi;
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
@RequestMapping("/api/data/proizvodi")
public class ProizvodiController {
    private final ProizvodiService proizvodiService;
    @Autowired
    public ProizvodiController(ProizvodiService proizvodiService) {
        this.proizvodiService = proizvodiService;
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('PROIZVODI_READ')")
    public ResponseEntity<Proizvodi> getProizvodiById(@PathVariable Integer id) {
        Proizvodi proizvodi = proizvodiService.findById(id);
        if (proizvodi != null) {
            return ResponseEntity.ok().body(proizvodi);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping
    @PreAuthorize("hasAuthority('PROIZVODI_CREATE')")
    public ResponseEntity<Proizvodi> createProizvodi(@RequestBody Proizvodi proizvodi) {
        Proizvodi createdProizvodi = proizvodiService.create(proizvodi);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProizvodi);
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('PROIZVODI_UPDATE')")
    public ResponseEntity<Proizvodi> updateProizvodi(@PathVariable Integer id, @RequestBody Proizvodi updatedProizvodi) {
        Proizvodi proizvodi = proizvodiService.update(id, updatedProizvodi);
        if (proizvodi != null) {
            return ResponseEntity.ok().body(proizvodi);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping
    @PreAuthorize("hasAuthority('PROIZVODI_READ')")
    public ResponseEntity<List<Proizvodi>> getAllProizvodis() {
        List<Proizvodi> proizvodiList = proizvodiService.getAll();
        return ResponseEntity.ok().body(proizvodiList);
    }
    @PostMapping("/filter")
    @PreAuthorize("hasAuthority('PROIZVODI_READ')")
    public Page<Proizvodi> getAllProizvodiByFilter(@RequestBody(required = false) FilterData filterData) {
        Pageable pageable = PageRequest.of(filterData.getPage(), filterData.getSize(), Sort.by(FilterAndSortUtils.ParseSortColumns(filterData.getSort())));
        return proizvodiService.getAllByFilters(filterData.getFilter(), pageable);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('PROIZVODI_DELETE')")
    public ResponseEntity<Void> deleteProizvodi(@PathVariable Integer id) {
        boolean deleted = proizvodiService.deleteById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
