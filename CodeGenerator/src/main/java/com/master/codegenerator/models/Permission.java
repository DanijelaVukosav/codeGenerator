package com.master.codegenerator.models;

import java.util.ArrayList;
import java.util.Collection;

public class Permission {
    private ArrayList<String> create;
    private ArrayList<String> update;
    private ArrayList<String> read;
    private ArrayList<String> delete;

    public Permission() {
        this.create = new ArrayList<>();
        this.update = new ArrayList<>();
        this.read = new ArrayList<>();
        this.delete = new ArrayList<>();
    }
    public Permission(Collection<String> defaultPermission) {
        this.create = new ArrayList<>(defaultPermission);
        this.update = new ArrayList<>(defaultPermission);
        this.read = new ArrayList<>(defaultPermission);
        this.delete = new ArrayList<>(defaultPermission);
    }

    public Permission(ArrayList<String> create, ArrayList<String> update, ArrayList<String> read, ArrayList<String> delete) {
        this.create = create;
        this.update = update;
        this.read = read;
        this.delete = delete;
    }

    public ArrayList<String> getCreate() {
        return create;
    }

    public void setCreate(ArrayList<String> create) {
        this.create = create;
    }

    public ArrayList<String> getUpdate() {
        return update;
    }

    public void setUpdate(ArrayList<String> update) {
        this.update = update;
    }

    public ArrayList<String> getRead() {
        return read;
    }

    public void setRead(ArrayList<String> read) {
        this.read = read;
    }

    public ArrayList<String> getDelete() {
        return delete;
    }

    public void setDelete(ArrayList<String> delete) {
        this.delete = delete;
    }
}
