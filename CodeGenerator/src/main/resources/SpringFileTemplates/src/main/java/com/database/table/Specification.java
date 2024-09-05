package com.#{ALL_SCHEMA_NAME}#.api.#{ALL_TABLE_NAME}#;

import com.#{ALL_SCHEMA_NAME}#.api.utils.FilterAndSortUtils;
import com.#{ALL_SCHEMA_NAME}#.api.utils.FilterCriteria;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;

public class #{FUL_TABLE_NAME}#Specification implements Specification<#{FUL_TABLE_NAME}#> {

    private final ArrayList<FilterCriteria> filterCriteriaList;

    public static #{FUL_TABLE_NAME}#Specification of(ArrayList<FilterCriteria> filterCriteriaList) {
        return new #{FUL_TABLE_NAME}#Specification(filterCriteriaList);
    }

    private #{FUL_TABLE_NAME}#Specification(ArrayList<FilterCriteria> filterCriteriaList) {
        this.filterCriteriaList = filterCriteriaList;
    }

    @Override
    public Predicate toPredicate
            (Root<#{FUL_TABLE_NAME}#> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        return FilterAndSortUtils.getPredicate(root, builder, filterCriteriaList);
    }
}
