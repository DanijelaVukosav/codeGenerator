package com.#{ALL_SCHEMA_NAME}#.api.#{ALL_TABLE_NAME}#;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface #{FUL_TABLE_NAME}#Repository extends JpaRepository<#{FUL_TABLE_NAME}#, #{PRIMARY_KEY_SPRING_TYPE}#>, JpaSpecificationExecutor<#{FUL_TABLE_NAME}#> {
}
