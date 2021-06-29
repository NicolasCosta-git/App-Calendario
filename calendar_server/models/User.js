const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class User {
  async new(email, password) {
    try {
      let hash = await bcrypt.hash(password, Math.random());
      await knex.insert({ email, password: hash }).table("Users");
    } catch (err) {
      console.log(err);
    }
  }

  async findEmail(email) {
    try {
      let result = await knex.select("*").from("Users").where({ email });
      if (result.length > 0) return true;
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async findByEmail(email) {
    try {
      let result = await knex
        .select(["id", "email", "password"])
        .where({ email })
        .table("Users");

      if (result.length > 0) return result[0];
      return undefined;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  async changePassword(password, id, token) {
    let hash = await bcrypt.hash(password, Math.random());
    await knex.update({ password: hash }).where({ id }).table("Users");
    await PasswordToken.setUsed(token);
  }
}

module.exports = new User();
const PasswordToken = require("./PasswordToken");
