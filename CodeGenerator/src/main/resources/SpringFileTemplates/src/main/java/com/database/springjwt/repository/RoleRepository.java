package com.#{FLL_DATABASE_NAME}#.springjwt.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.#{FLL_DATABASE_NAME}#.springjwt.models.ERole;
import com.#{FLL_DATABASE_NAME}#.springjwt.models.Role;
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
}