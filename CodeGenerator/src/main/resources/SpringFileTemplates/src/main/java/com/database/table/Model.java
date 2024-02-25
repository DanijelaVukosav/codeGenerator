package com.#{ALL_DATABASE_NAME}##{ALL_TABLE_NAME}#;

import java.io.Serializable;
import javax.persistence.*;

#{IMPORT_MODELS_WHICH_REFERENCED_BY_TABLE}#
#{IMPORT_MODELS_WHICH_REFERENCE_TABLE}#
//#{IMPORT_COLUMN_TYPES}#
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.*;

@Entity
@Table(name = "#{TABLE_NAME}#")
public class #{FUL_TABLE_NAME}# {
        private static final long serialVersionUID = 1L;
        #{COLUMNS_TO_ATTRIBUTES}#
        #{FOREIGN_KEYS_TO_ATTRIBUTES}#
        #{MODELS_WHICH_REFERENCE_TABLE_TO_ATTRIBUTES}#

        public #{FUL_TABLE_NAME}#() {
        }

        #{MODEL_SETTERS_AND_GETTERS}#
        #{FOREIGN_OBJECTS_SETTERS_AND_GETTERS}#
        #{MODELS_WHICH_REFERENCE_TABLE_SETTERS_AND_GETTERS}#
}