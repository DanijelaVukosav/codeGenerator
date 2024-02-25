package com.#{ALL_DATABASE_NAME}##{ALL_TABLE_NAME}#;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface #{FUL_TABLE_NAME}#Repository extends JpaRepository<#{FUL_TABLE_NAME}#, #{PRIMARY_KEY_SPRING_TYPE}#> {
}
