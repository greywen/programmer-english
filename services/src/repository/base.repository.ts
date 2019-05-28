import sqlmap from "./core/dataContextHelper";

export const Table: string = null;

export class BaseRepository<T> {
    public sqlmap = sqlmap;
    private model: BaseRepositoryModel;

    constructor(model: BaseRepositoryModel) {
        this.model = model;
    }

    async getAsync(t: Partial<T>): Promise<T[]> {
        let sqlResult = assembledSelectSql(this.model.table, t);
        let data = await sqlmap.queryAsync(sqlResult.sql, sqlResult.values);
        return data;
    }

    async getFirstOrDefaultAsync(t: Partial<T>): Promise<T> {
        let sqlResult = assembledSelectSql(this.model.table, t);
        let data = await sqlmap.queryAsync(sqlResult.sql, sqlResult.values);
        return data.length > 0 ? data[0] : null;
    }

    async getByIdAsync(id: number): Promise<T> {
        let sqlResult = assembledSelectSql(this.model.table, { id: id });
        let data = await sqlmap.queryAsync(sqlResult.sql, sqlResult.values);
        return data.length > 0 ? data[0] : null;
    }

    async insertAsync(t: T): Promise<number> {
        let sqlResult = assembledInsertSql(this.model.table, t);
        let data = await <SqlResultModel>sqlmap.queryAsync(sqlResult.sql, sqlResult.values);
        return data.insertId;
    }

    async updateAsync(updateFields: Partial<T>, queryFields: Partial<T>): Promise<number> {
        let sqlResult = assembledUpdateSql(this.model.table, updateFields, queryFields);
        let data = await <SqlResultModel>sqlmap.queryAsync(sqlResult.sql, sqlResult.values);
        return data.affectedRows;
    }

    async deleteAsync(t: Partial<T>): Promise<boolean> {
        let sqlResult = assembledDeleteSql(this.model.table, t);
        let data = await <SqlResultModel>sqlmap.queryAsync(sqlResult.sql, sqlResult.values);
        return data.affectedRows > 0;
    }
}

export interface BaseRepositoryModel {
    table: string,
}

function assembledSelectSql(table: string, queryFields: any, returnColumns: Array<string> = []): SqlModel {
    let returnColumnString = returnColumns && returnColumns.length == 0 ? "*" : returnColumns.join(",");

    let sql = `select ${returnColumnString} from ${table} where `;
    let columns = [], values = [];

    for (let field in queryFields) {
        columns.push(field + " = ?");
        values.push(queryFields[field]);
    }

    sql += columns.join(" and ");
    sql += ";";

    return <SqlModel>{ sql: sql, values: values };
}

function assembledInsertSql(table: string, insertFields: any): SqlModel {
    let sql = `insert into ${table} set ?`;
    return <SqlModel>{ sql: sql, values: insertFields };
}

function assembledDeleteSql(table: string, queryFields: any) {
    let sql = `delete from ${table} where `;

    let columns = [], values = [];
    for (let field in queryFields) {
        columns.push(field + " = ?");
        values.push(queryFields[field]);
    }

    sql += columns.join(" and ");
    sql += ";";
    return <SqlModel>{ sql: sql, values: values };
}

function assembledUpdateSql(table: string, updateFields: any, queryFields: any) {
    let sql = `update ${table} set `;

    let columns = [], values = [];
    for (let field in updateFields) {
        columns.push(field + " = ?");
        values.push(updateFields[field]);
    }
    sql += columns.join(",");

    columns = [];
    for (let field in queryFields) {
        columns.push(field + " = ?");
        values.push(queryFields[field]);
    }
    sql += " where " + columns.join(" and ");
    sql += ";";

    return <SqlModel>{ sql: sql, values: values };
}

interface SqlModel {
    sql: string,
    values: any[]
}

interface SqlResultModel {
    affectedRows: number,
    insertId: number,
    changedRows: number
}
