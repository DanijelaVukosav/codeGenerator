package com.#{ALL_SCHEMA_NAME}#.api.auth.repository;

import com.#{ALL_SCHEMA_NAME}#.api.auth.models.Permission;
import com.#{ALL_SCHEMA_NAME}#.api.auth.models.PermissionEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
  Optional<Permission> findByName(PermissionEnum name);
}
