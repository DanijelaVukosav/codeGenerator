package com.schema.api.narudzbe;
import com.schema.api.utils.FilterAndSortUtils;
import com.schema.api.utils.FilterCriteria;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;
public class NarudzbeSpecification implements Specification<Narudzbe> {
    private final ArrayList<FilterCriteria> filterCriteriaList;
    public static NarudzbeSpecification of(ArrayList<FilterCriteria> filterCriteriaList) {
        return new NarudzbeSpecification(filterCriteriaList);
    }
    private NarudzbeSpecification(ArrayList<FilterCriteria> filterCriteriaList) {
        this.filterCriteriaList = filterCriteriaList;
    }
    @Override
    public Predicate toPredicate
            (Root<Narudzbe> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        return FilterAndSortUtils.getPredicate(root, builder, filterCriteriaList);
    }
}
