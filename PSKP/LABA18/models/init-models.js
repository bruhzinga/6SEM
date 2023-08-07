import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _AUDITORIUM from  "./AUDITORIUM.js";
import _AUDITORIUM_TYPE from  "./AUDITORIUM_TYPE.js";
import _FACULTY from  "./FACULTY.js";
import _PULPIT from  "./PULPIT.js";
import _SUBJECT from  "./SUBJECT.js";
import _TEACHER from  "./TEACHER.js";

export default function initModels(sequelize) {
  const AUDITORIUM = _AUDITORIUM.init(sequelize, DataTypes);
  const AUDITORIUM_TYPE = _AUDITORIUM_TYPE.init(sequelize, DataTypes);
  const FACULTY = _FACULTY.init(sequelize, DataTypes);
  const PULPIT = _PULPIT.init(sequelize, DataTypes);
  const SUBJECT = _SUBJECT.init(sequelize, DataTypes);
  const TEACHER = _TEACHER.init(sequelize, DataTypes);

  AUDITORIUM.belongsTo(AUDITORIUM_TYPE, { as: "AUDITORIUM_TYPE_AUDITORIUM_TYPE", foreignKey: "AUDITORIUM_TYPE"});
  AUDITORIUM_TYPE.hasMany(AUDITORIUM, { as: "AUDITORIa", foreignKey: "AUDITORIUM_TYPE"});
  PULPIT.belongsTo(FACULTY, { as: "FACULTY_FACULTY", foreignKey: "FACULTY"});
  FACULTY.hasMany(PULPIT, { as: "PULPITs", foreignKey: "FACULTY"});
  SUBJECT.belongsTo(PULPIT, { as: "PULPIT_PULPIT", foreignKey: "PULPIT"});
  PULPIT.hasMany(SUBJECT, { as: "SUBJECTs", foreignKey: "PULPIT"});
  TEACHER.belongsTo(PULPIT, { as: "PULPIT_PULPIT", foreignKey: "PULPIT"});
  PULPIT.hasMany(TEACHER, { as: "TEACHERs", foreignKey: "PULPIT"});

  return {
    AUDITORIUM,
    AUDITORIUM_TYPE,
    FACULTY,
    PULPIT,
    SUBJECT,
    TEACHER,
  };
}
