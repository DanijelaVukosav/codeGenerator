package com.master.codegenerator.generator;

import com.master.codegenerator.models.Table;

import java.util.ArrayList;
import java.util.HashMap;

@FunctionalInterface
public interface ReplaceFunction {
    ArrayList<String> replaceReactPlaceholders(String line, HashMap<String, Table> tables);
}