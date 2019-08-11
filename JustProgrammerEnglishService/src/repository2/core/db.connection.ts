import { Sequelize } from "sequelize-typescript";
// import { ShareWorkLesson, ShareWorkLessonVideo, DataLessonType, UserLessonVideoLog } from "../models"
import config from "../../common/config";

const sequelize = new Sequelize({
    host: config.mysql.host,
    username: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    dialect: "mysql"
});

// sequelize.addModels([ShareWorkLesson]);
// sequelize.addModels([ShareWorkLessonVideo]);
// sequelize.addModels([UserLessonVideoLog]);

// sequelize.addModels([DataLessonType]);

export default sequelize;