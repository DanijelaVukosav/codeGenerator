package com.schema.api.proizvodi;
import com.schema.api.utils.FilterAndSortUtils;
import com.schema.api.utils.FilterCriteria;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;
public class ProizvodiSpecification implements Specification<Proizvodi> {
    private final ArrayList<FilterCriteria> filterCriteriaList;
    public static ProizvodiSpecification of(ArrayList<FilterCriteria> filterCriteriaList) {
        return new ProizvodiSpecification(filterCriteriaList);
    }
    private ProizvodiSpecification(ArrayList<FilterCriteria> filterCriteriaList) {
        this.filterCriteriaList = filterCriteriaList;
    }
    @Override
    public Predicate toPredicate
            (Root<Proizvodi> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        return FilterAndSortUtils.getPredicate(root, builder, filterCriteriaList);
    }
}
