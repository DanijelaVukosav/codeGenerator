package com.master.codegenerator.generator;

import com.master.codegenerator.models.Table;
import java.util.ArrayList;
import java.util.HashMap;

@FunctionalInterface
public interface SpringReplaceFunction {
    ArrayList<String> replaceSpringPlaceholders(String line, String databaseName, HashMap<String, Table> tables);
}

