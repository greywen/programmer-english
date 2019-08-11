import * as SqlMap from "sqlmap";
import config from "../../common/config"

SqlMap.SqlMap.loadSqlMapsAsync("sqlmap");
let sqlmap = new SqlMap.SqlMap(config.mysql);

export default sqlmap;
