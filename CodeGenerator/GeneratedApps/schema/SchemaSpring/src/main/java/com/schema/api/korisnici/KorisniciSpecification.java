package com.schema.api.korisnici;
import com.schema.api.utils.FilterAndSortUtils;
import com.schema.api.utils.FilterCriteria;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;
public class KorisniciSpecification implements Specification<Korisnici> {
    private final ArrayList<FilterCriteria> filterCriteriaList;
    public static KorisniciSpecification of(ArrayList<FilterCriteria> filterCriteriaList) {
        return new KorisniciSpecification(filterCriteriaList);
    }
    private KorisniciSpecification(ArrayList<FilterCriteria> filterCriteriaList) {
        this.filterCriteriaList = filterCriteriaList;
    }
    @Override
    public Predicate toPredicate
            (Root<Korisnici> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        return FilterAndSortUtils.getPredicate(root, builder, filterCriteriaList);
    }
}
