const PostgresRepository = require("./repositories/postgresRepository");
const TaskService = require("./services/taskService");

const repository = new PostgresRepository();
const service = new TaskService(repository);

module.exports = service;