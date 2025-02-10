package com.#{ALL_SCHEMA_NAME}#.api.#{ALL_TABLE_NAME}#;

import com.fasterxml.jackson.annotation.JsonIgnore;
#{IMPORT_FOREIGN_MODELS}#
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
#{ADD_AUDIT_CLASS_DECORATOR}#
@Table(name = "#{TABLE_NAME}#")
@SQLDelete(sql = "UPDATE #{TABLE_NAME}# SET is_deleted = true WHERE id=?")
@SQLRestriction(value = "is_deleted=false")
public class #{FUL_TABLE_NAME}# implements Serializable {
        @Serial
        private static final long serialVersionUID = 1L;
        #{MODEL_ATTRIBUTES}#
        #{MODEL_FOREIGN_ATTRIBUTES}#
        #{MODEL_AUDIT_ATTRIBUTES}#

        @JsonIgnore
        private boolean isDeleted = Boolean.FALSE;

        public #{FUL_TABLE_NAME}#() {
        }

        #{MODEL_SETTERS_AND_GETTERS}#
        #{MODEL_AUDIT_SETTERS_AND_GETTERS}#
        public boolean isDeleted() {
        return isDeleted;
}

        public void setDeleted(boolean deleted) {
        isDeleted = deleted;
}

}