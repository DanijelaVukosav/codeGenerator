package com.#{ALL_SCHEMA_NAME}#.api.auth.service;

import com.#{ALL_SCHEMA_NAME}#.api.auth.models.Permission;
import com.#{ALL_SCHEMA_NAME}#.api.auth.models.PermissionEnum;
import com.#{ALL_SCHEMA_NAME}#.api.auth.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PermissionService {

    private final PermissionRepository permissionRepository;

    @Autowired
    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public Optional<Permission> findPermissionByName(String permission) {
        return permissionRepository.findByName(PermissionEnum.valueOf(permission));
    }

    public Permission create(Permission permission) {
        return permissionRepository.save(permission);
    }


    public PermissionEnum[] getEnabledPermissions() {
        return PermissionEnum.values();
    }

}
