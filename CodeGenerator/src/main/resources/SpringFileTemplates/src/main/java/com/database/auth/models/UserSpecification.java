package com.#{ALL_SCHEMA_NAME}#.api.auth.models;

import com.#{ALL_SCHEMA_NAME}#.api.utils.FilterAndSortUtils;
import com.#{ALL_SCHEMA_NAME}#.api.utils.FilterCriteria;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;

public class UserSpecification implements Specification<User> {

    private ArrayList<FilterCriteria> filterCriteriaList;

    public static UserSpecification of(ArrayList<FilterCriteria> filterCriteriaList) {
        return new UserSpecification(filterCriteriaList);
    }

    private UserSpecification(ArrayList<FilterCriteria> filterCriteriaList) {
        this.filterCriteriaList = filterCriteriaList;
    }

    @Override
    public Predicate toPredicate
            (Root<User> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        return FilterAndSortUtils.getPredicate(root, builder, filterCriteriaList);
    }
}
