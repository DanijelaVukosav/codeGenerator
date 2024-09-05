package com.#{ALL_SCHEMA_NAME}#.api.#{ALL_TABLE_NAME}#;

#{IMPORT_FOREIGN_REPOSITORIES_AND_MODELS}#

import com.#{ALL_SCHEMA_NAME}#.api.utils.FilterCriteria;
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
public class #{FUL_TABLE_NAME}#Service {

    private final #{FUL_TABLE_NAME}#Repository #{FLL_TABLE_NAME}#Repository;

    #{INSTANCE_FOREIGN_REPOSITORIES}#

    @Autowired
        public #{FUL_TABLE_NAME}#Service(#{SERVICE_CONSTRUCTOR_PARAMS}#) {
        #{SERVICE_CONSTRUCTOR_VALUE_ASSIGMENT}#
    }

    @Transactional(readOnly = true)
    public #{FUL_TABLE_NAME}# findById(#{PRIMARY_KEY_SPRING_TYPE}# id) {
        Optional<#{FUL_TABLE_NAME}#> #{FLL_TABLE_NAME}# = #{FLL_TABLE_NAME}#Repository.findById(id);
        return #{FLL_TABLE_NAME}#.orElse(null);
    }

    @Transactional
    public #{FUL_TABLE_NAME}# create(#{FUL_TABLE_NAME}# #{FLL_TABLE_NAME}#) {
        #{SERVICE_CREATE_FOREIGN_OBJECTS}#
        return #{FLL_TABLE_NAME}#Repository.save(#{FLL_TABLE_NAME}#);
    }

    @Transactional
    public #{FUL_TABLE_NAME}# update(#{PRIMARY_KEY_SPRING_TYPE}# id, #{FUL_TABLE_NAME}# updated#{FUL_TABLE_NAME}#) {
        Optional<#{FUL_TABLE_NAME}#> existing#{FUL_TABLE_NAME}# = #{FLL_TABLE_NAME}#Repository.findById(id);
        if (existing#{FUL_TABLE_NAME}#.isPresent()) {
            updated#{FUL_TABLE_NAME}#.#{SET_PRIMARY_KEY}#(id);
            return #{FLL_TABLE_NAME}#Repository.save(updated#{FUL_TABLE_NAME}#);
        }
        return null;
    }

    @Transactional(readOnly = true)
    public Page<#{FUL_TABLE_NAME}#> getAllByFilters(
            ArrayList<FilterCriteria> criteria, Pageable pageable) {

        #{FUL_TABLE_NAME}#Specification specification = #{FUL_TABLE_NAME}#Specification.of(criteria);

        return #{FLL_TABLE_NAME}#Repository.findAll(specification, pageable);
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