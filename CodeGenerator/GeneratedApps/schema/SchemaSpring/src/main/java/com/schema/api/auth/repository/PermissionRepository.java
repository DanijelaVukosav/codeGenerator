package com.schema.api.auth.repository;

import com.schema.api.auth.models.Permission;
import com.schema.api.auth.models.PermissionEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
  Optional<Permission> findByName(PermissionEnum name);
}
