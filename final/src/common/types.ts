export type Table = {
    tableName: string;
    columns: Column[];
    columnsMap: Record<string, Column>
}

export type Column = {
    autoIncrement: boolean;
    columnName: string;
    columnSize: number;
    columnType: string;
    defaultValue: string;
    displayName: string;
    foreignKey: boolean;
    foreignTableName: string;
    mappedType: string;
    nullable: boolean;
    primaryKey: boolean;
    tableName: string;
}

export type SchemaData = {
    tables: Record<string, Table >;
    mapOfTableRelationships: Record<string, string[]>;
    databaseName: string;
}