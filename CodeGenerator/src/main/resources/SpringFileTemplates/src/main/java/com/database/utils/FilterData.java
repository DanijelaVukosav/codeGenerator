package com.#{ALL_SCHEMA_NAME}#.api.utils;

import java.util.ArrayList;

public class FilterData {
    private ArrayList<FilterCriteria> filter;
    private int page = 0;
    private int size = 20;
    private String[] sort;

    public ArrayList<FilterCriteria> getFilter() {
        return filter;
    }

    public void setFilter(ArrayList<FilterCriteria> filter) {
        this.filter = filter;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String[] getSort() {
        return sort;
    }

    public void setSort(String[] sort) {
        this.sort = sort;
    }
}
