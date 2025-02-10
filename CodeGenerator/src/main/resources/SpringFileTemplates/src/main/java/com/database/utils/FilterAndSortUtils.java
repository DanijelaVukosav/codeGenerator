package com.#{ALL_SCHEMA_NAME}#.api.utils;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class FilterAndSortUtils {

    public static Sort.Order[] ParseSortColumns(String[] sort) {
        Sort.Order[] orders = new Sort.Order[sort.length];
        for (int i = 0; i < sort.length; i++) {
            String[] parts = sort[i].split(",");
            Sort.Direction direction;

            if (parts.length == 2) {
                direction = Sort.Direction.fromString(parts[1].trim());
            } else {

                direction = Sort.Direction.ASC;
            }
            orders[i] = new Sort.Order(direction, parts[0].trim());
        }
        return orders;
    }

    public static <T> Predicate getPredicate(Root<T> root, CriteriaBuilder builder, List<FilterCriteria> criterias) {
        List<Predicate> predicates = new ArrayList<>();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-d'T'HH:mm:ss");
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

        for (FilterCriteria criteria : criterias) {
            String operation = criteria.getOperation().toLowerCase();
            String key = criteria.getKey();
            Object value = criteria.getValue();

            switch (criteria.getType()) {
                case time:
                case LOCAL_TIME:
                    LocalTime timeValue = LocalTime.parse(value.toString(), timeFormatter);
                    addTimePredicate(predicates, builder, root, key, operation, timeValue);
                    break;
                case date:
                case LOCAL_DATE:
                    LocalDate dateValue = LocalDate.parse(value.toString(), dateFormatter);
                    addDatePredicate(predicates, builder, root, key, operation, dateValue);
                    break;
                case datetime_local:
                case LOCAL_DATE_TIME:
                    LocalDateTime dateTimeValue = LocalDateTime.parse(value.toString(), dateTimeFormatter);
                    addDateTimePredicate(predicates, builder, root, key, operation, dateTimeValue);
                    break;

                case number:
                case NUMBER:
                    Long longValue = Long.parseLong(value.toString());
                    addNumberPredicate(predicates, builder, root, key, operation, longValue);
                    break;

                case checkbox:
                case CHECKBOX:
                    Boolean booleanValue = Boolean.valueOf(value.toString());
                    addBooleanPredicate(predicates, builder, root, key, operation, booleanValue);
                    break;
                default:
                    String stringValue = value.toString();
                    addStringPredicate(predicates, builder, root, key, operation, stringValue);
                    break;
            }
        }

        return builder.and(predicates.toArray(new Predicate[0]));
    }

    private static <T> void addTimePredicate(List<Predicate> predicates, CriteriaBuilder builder, Root<T> root, String key, String operation, LocalTime timeValue) {
        switch (operation) {
            case ">":
                predicates.add(builder.greaterThan(root.get(key), timeValue));
                break;
            case ">=":
                predicates.add(builder.greaterThanOrEqualTo(root.get(key), timeValue));
                break;
            case "<":
                predicates.add(builder.lessThan(root.get(key), timeValue));
                break;
            case "<=":
                predicates.add(builder.lessThanOrEqualTo(root.get(key), timeValue));
                break;
            case "=":
                predicates.add(builder.equal(root.get(key), timeValue));
                break;
            default:
                predicates.add(builder.like(root.get(key), "%" + timeValue + "%"));
                break;
        }
    }

    private static <T> void addDatePredicate(List<Predicate> predicates, CriteriaBuilder builder, Root<T> root, String key, String operation, LocalDate dateValue) {
        switch (operation) {
            case ">":
                predicates.add(builder.greaterThan(root.get(key), dateValue));
                break;
            case ">=":
                predicates.add(builder.greaterThanOrEqualTo(root.get(key), dateValue));
                break;
            case "<":
                predicates.add(builder.lessThan(root.get(key), dateValue));
                break;
            case "<=":
                predicates.add(builder.lessThanOrEqualTo(root.get(key), dateValue));
                break;
            case "=":
                predicates.add(builder.equal(root.get(key), dateValue));
                break;
            default:
                predicates.add(builder.like(root.get(key), "%" + dateValue + "%"));
                break;
        }
    }

    private static <T> void addDateTimePredicate(List<Predicate> predicates, CriteriaBuilder builder, Root<T> root, String key, String operation, LocalDateTime dateTimeValue) {
        switch (operation) {
            case ">":
                predicates.add(builder.greaterThan(root.get(key), dateTimeValue));
                break;
            case ">=":
                predicates.add(builder.greaterThanOrEqualTo(root.get(key), dateTimeValue));
                break;
            case "<":
                predicates.add(builder.lessThan(root.get(key), dateTimeValue));
                break;
            case "<=":
                predicates.add(builder.lessThanOrEqualTo(root.get(key), dateTimeValue));
                break;
            case "=":
                predicates.add(builder.equal(root.get(key), dateTimeValue));
                break;
            default:
                predicates.add(builder.like(root.get(key), "%" + dateTimeValue + "%"));
                break;
        }
    }

    private static <T> void addBooleanPredicate(List<Predicate> predicates, CriteriaBuilder builder, Root<T> root, String key, String operation, Boolean value) {
        predicates.add(builder.equal(root.get(key), value));
    }


    private static <T> void addNumberPredicate(List<Predicate> predicates, CriteriaBuilder builder, Root<T> root, String key, String operation, Long value) {
        switch (operation) {
            case ">":
                predicates.add(builder.greaterThan(root.get(key), value));
                break;
            case ">=":
                predicates.add(builder.greaterThanOrEqualTo(root.get(key), value));
                break;
            case "<":
                predicates.add(builder.lessThan(root.get(key), value));
                break;
            case "<=":
                predicates.add(builder.lessThanOrEqualTo(root.get(key), value));
                break;
            case "=":
                predicates.add(builder.equal(root.get(key), value));
                break;
            default:
                predicates.add(builder.like(root.get(key), "%" + value + "%"));
                break;
        }
    }

    private static <T> void addStringPredicate(List<Predicate> predicates, CriteriaBuilder builder, Root<T> root, String key, String operation, String value) {
        switch (operation) {
            case ">":
                predicates.add(builder.greaterThan(root.get(key), value));
                break;
            case ">=":
                predicates.add(builder.greaterThanOrEqualTo(root.get(key), value));
                break;
            case "<":
                predicates.add(builder.lessThan(root.get(key), value));
                break;
            case "<=":
                predicates.add(builder.lessThanOrEqualTo(root.get(key), value));
                break;
            case "=":
                predicates.add(builder.equal(root.get(key), value));
                break;
            default:
                predicates.add(builder.like(root.get(key), "%" + value + "%"));
                break;
        }
    }

}
