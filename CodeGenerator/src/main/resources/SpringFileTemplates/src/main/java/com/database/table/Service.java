package com.#{ALL_DATABASE_NAME}##{ALL_TABLE_NAME}#;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class #{FUL_TABLE_NAME}#Service {

    private final #{FUL_TABLE_NAME}#Repository #{FLL_TABLE_NAME}#Repository;

    @Autowired
    public #{FUL_TABLE_NAME}#Service(#{FUL_TABLE_NAME}#Repository #{FLL_TABLE_NAME}#Repository) {
        this.#{FLL_TABLE_NAME}#Repository = #{FLL_TABLE_NAME}#Repository;
    }

    public #{FUL_TABLE_NAME}# findById(#{PRIMARY_KEY_SPRING_TYPE}# id) {
        Optional<#{FUL_TABLE_NAME}#> #{FLL_TABLE_NAME}# = #{FLL_TABLE_NAME}#Repository.findById(id);
        return #{FLL_TABLE_NAME}#.orElse(null);
    }

    public #{FUL_TABLE_NAME}# create(#{FUL_TABLE_NAME}# #{FLL_TABLE_NAME}#) {
        return #{FLL_TABLE_NAME}#Repository.save(#{FLL_TABLE_NAME}#);
    }

    public #{FUL_TABLE_NAME}# update(#{PRIMARY_KEY_SPRING_TYPE}# id, #{FUL_TABLE_NAME}# updated#{FUL_TABLE_NAME}#) {
        Optional<#{FUL_TABLE_NAME}#> existing#{FUL_TABLE_NAME}# = #{FLL_TABLE_NAME}#Repository.findById(id);
        if (existing#{FUL_TABLE_NAME}#.isPresent()) {
            updated#{FUL_TABLE_NAME}#.setId(id);
            return #{FLL_TABLE_NAME}#Repository.save(updated#{FUL_TABLE_NAME}#);
        }
        return null;
    }

    public List<#{FUL_TABLE_NAME}#> getAll() {
        return #{FLL_TABLE_NAME}#Repository.findAll();
    }

    public boolean deleteById(#{PRIMARY_KEY_SPRING_TYPE}# id) {
        Optional<#{FUL_TABLE_NAME}#> #{FLL_TABLE_NAME}# = #{FLL_TABLE_NAME}#Repository.findById(id);
        if (#{FLL_TABLE_NAME}#.isPresent()) {
        #{FLL_TABLE_NAME}#Repository.deleteById(id);
            return true;
        }
        return false;
    }
}