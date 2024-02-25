package com.#{ALL_DATABASE_NAME}##{ALL_TABLE_NAME}#;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<#{FUL_TABLE_NAME}#> get#{FUL_TABLE_NAME}#ById(@PathVariable #{PRIMARY_KEY_SPRING_TYPE}# id) {
        #{FUL_TABLE_NAME}# #{FLL_TABLE_NAME}# = #{FLL_TABLE_NAME}#Service.findById(id);
        if (#{FLL_TABLE_NAME}# != null) {
            return ResponseEntity.ok().body(#{FLL_TABLE_NAME}#);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<#{FUL_TABLE_NAME}#> create#{FUL_TABLE_NAME}#(@RequestBody #{FUL_TABLE_NAME}# #{FLL_TABLE_NAME}#) {
        #{FUL_TABLE_NAME}# created#{FUL_TABLE_NAME}# = #{FLL_TABLE_NAME}#Service.create(#{FLL_TABLE_NAME}#);
        return ResponseEntity.status(HttpStatus.CREATED).body(created#{FUL_TABLE_NAME}#);
    }

    @PutMapping("/{id}")
    public ResponseEntity<#{FUL_TABLE_NAME}#> update#{FUL_TABLE_NAME}#(@PathVariable #{PRIMARY_KEY_SPRING_TYPE}# id, @RequestBody #{FUL_TABLE_NAME}# updated#{FUL_TABLE_NAME}#) {
        #{FUL_TABLE_NAME}# #{FLL_TABLE_NAME}# = #{FLL_TABLE_NAME}#Service.update(id, updated#{FUL_TABLE_NAME}#);
        if (#{FLL_TABLE_NAME}# != null) {
            return ResponseEntity.ok().body(#{FLL_TABLE_NAME}#);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<#{FUL_TABLE_NAME}#>> getAll#{FUL_TABLE_NAME}#s() {
        List<#{FUL_TABLE_NAME}#> #{FLL_TABLE_NAME}#s = #{FLL_TABLE_NAME}#Service.getAll();
        return ResponseEntity.ok().body(#{FLL_TABLE_NAME}#s);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete#{FUL_TABLE_NAME}#(@PathVariable #{PRIMARY_KEY_SPRING_TYPE}# id) {
        boolean deleted = #{FLL_TABLE_NAME}#Service.deleteById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
