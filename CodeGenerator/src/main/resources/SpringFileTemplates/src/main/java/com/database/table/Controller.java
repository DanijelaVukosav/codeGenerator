package com.#{ALL_SCHEMA_NAME}#.api.#{ALL_TABLE_NAME}#;

import com.#{ALL_SCHEMA_NAME}#.api.utils.FilterAndSortUtils;
import com.#{ALL_SCHEMA_NAME}#.api.utils.FilterData;
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
@RequestMapping("/api/data/#{TABLE_NAME}#")
public class #{FUL_TABLE_NAME}#Controller {

    private final #{FUL_TABLE_NAME}#Service #{FLL_TABLE_NAME}#Service;

    @Autowired
    public #{FUL_TABLE_NAME}#Controller(#{FUL_TABLE_NAME}#Service #{FLL_TABLE_NAME}#Service) {
        this.#{FLL_TABLE_NAME}#Service = #{FLL_TABLE_NAME}#Service;
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('#{AUL_TABLE_NAME}#_READ')")
    public ResponseEntity<#{FUL_TABLE_NAME}#> get#{FUL_TABLE_NAME}#ById(@PathVariable #{PRIMARY_KEY_SPRING_TYPE}# id) {
        #{FUL_TABLE_NAME}# #{FLL_TABLE_NAME}# = #{FLL_TABLE_NAME}#Service.findById(id);
        if (#{FLL_TABLE_NAME}# != null) {
            return ResponseEntity.ok().body(#{FLL_TABLE_NAME}#);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('#{AUL_TABLE_NAME}#_CREATE')")
    public ResponseEntity<#{FUL_TABLE_NAME}#> create#{FUL_TABLE_NAME}#(@RequestBody #{FUL_TABLE_NAME}# #{FLL_TABLE_NAME}#) {
        #{FUL_TABLE_NAME}# created#{FUL_TABLE_NAME}# = #{FLL_TABLE_NAME}#Service.create(#{FLL_TABLE_NAME}#);
        return ResponseEntity.status(HttpStatus.CREATED).body(created#{FUL_TABLE_NAME}#);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('#{AUL_TABLE_NAME}#_UPDATE')")
    public ResponseEntity<#{FUL_TABLE_NAME}#> update#{FUL_TABLE_NAME}#(@PathVariable #{PRIMARY_KEY_SPRING_TYPE}# id, @RequestBody #{FUL_TABLE_NAME}# updated#{FUL_TABLE_NAME}#) {
        #{FUL_TABLE_NAME}# #{FLL_TABLE_NAME}# = #{FLL_TABLE_NAME}#Service.update(id, updated#{FUL_TABLE_NAME}#);
        if (#{FLL_TABLE_NAME}# != null) {
            return ResponseEntity.ok().body(#{FLL_TABLE_NAME}#);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    @PreAuthorize("hasAuthority('#{AUL_TABLE_NAME}#_READ')")
    public ResponseEntity<List<#{FUL_TABLE_NAME}#>> getAll#{FUL_TABLE_NAME}#s() {
        List<#{FUL_TABLE_NAME}#> #{FLL_TABLE_NAME}#List = #{FLL_TABLE_NAME}#Service.getAll();
        return ResponseEntity.ok().body(#{FLL_TABLE_NAME}#List);
    }

    @PostMapping("/filter")
    @PreAuthorize("hasAuthority('#{AUL_TABLE_NAME}#_READ')")
    public Page<#{FUL_TABLE_NAME}#> getAll#{FUL_TABLE_NAME}#ByFilter(@RequestBody(required = false) FilterData filterData) {
        Pageable pageable = PageRequest.of(filterData.getPage(), filterData.getSize(), Sort.by(FilterAndSortUtils.ParseSortColumns(filterData.getSort())));

        return #{FLL_TABLE_NAME}#Service.getAllByFilters(filterData.getFilter(), pageable);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('#{AUL_TABLE_NAME}#_DELETE')")
    public ResponseEntity<Void> delete#{FUL_TABLE_NAME}#(@PathVariable #{PRIMARY_KEY_SPRING_TYPE}# id) {
        boolean deleted = #{FLL_TABLE_NAME}#Service.deleteById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
