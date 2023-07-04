import { getConnection, sql, queries } from "../database";

export const getUser = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllUser);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email_id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("email_id", sql.VarChar, email_id)
      .query(queries.getUserByEmail);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createUser = async (req, res) => {
  const {
    user_id,
    ad_user_name,
    email_id,
    group_id,
    role_id,
    subgroup_id,
    name,
    address,
    p_number,
    change_flag,
    status,
    photo,
  } = req.body;

  let { contact_number, room_no, punch_id, hostel, hostel_tower } = req.body;

  // validating
  if (
    user_id == null ||
    ad_user_name == null ||
    email_id == null ||
    group_id == null ||
    role_id == null ||
    subgroup_id == null ||
    name == null ||
    address == null ||
    p_number == null ||
    change_flag == null ||
    status == null ||
    photo == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  if (contact_number == null) contact_number = 0;
  if (room_no == null) room_no = 0;
  if (punch_id == null) punch_id = 0;
  if (hostel == null) hostel = 0;
  if (hostel_tower == null) hostel_tower = 0;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .input("ad_user_name", sql.VarChar, ad_user_name)
      .input("email_id", sql.VarChar, email_id)
      .input("contact_number", sql.VarChar, contact_number)
      .input("group_id", sql.Int, group_id)
      .input("role_id", sql.Int, role_id)
      .input("subgroup_id", sql.Int, subgroup_id)
      .input("name", sql.VarChar, name)
      .input("room_no", sql.VarChar, room_no)
      .input("address", sql.VarChar, address)
      .input("p_number", sql.VarChar, p_number)
      .input("punch_id", sql.Int, punch_id)
      .input("change_flag", sql.BigInt, change_flag)
      .input("hostel", sql.VarChar, hostel)
      .input("hostel_tower", sql.VarChar, hostel_tower)
      .input("status", sql.VarChar, status)
      .input("photo", sql.VarChar, photo)
      .query(queries.addUser);

    res.json({
      user_id,
      ad_user_name,
      email_id,
      contact_number,
      group_id,
      role_id,
      subgroup_id,
      name,
      room_no,
      address,
      p_number,
      punch_id,
      change_flag,
      hostel,
      hostel_tower,
      status,
      photo,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", id)
      .query(queries.getUserById);

    return res.send(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", id)
      .query(queries.deleteUser);

    if (result.rowsAffected[0] === 0) {
      return res.sendStatus(404);
    } else {
      return res.send("User Deleted");
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalUser = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getTotalUser);
    res.json(result.recordset[0][""]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const {
    ad_user_name,
    email_id,
    contact_number,
    group_id,
    role_id,
    subgroup_id,
    name,
    room_no,
    address,
    p_number,
    punch_id,
    change_flag,
    hostel,
    hostel_tower,
    status,
    photo,
  } = req.body;

  // validating
  if (
    ad_user_name == null ||
    email_id == null ||
    contact_number == null ||
    group_id == null ||
    role_id == null ||
    subgroup_id == null ||
    name == null ||
    room_no == null ||
    address == null ||
    p_number == null ||
    punch_id == null ||
    change_flag == null ||
    hostel == null ||
    hostel_tower == null ||
    status == null ||
    photo == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("ad_user_name", sql.VarChar, ad_user_name)
      .input("email_id", sql.VarChar, email_id)
      .input("contact_number", sql.VarChar, contact_number)
      .input("group_id", sql.Int, group_id)
      .input("role_id", sql.Int, role_id)
      .input("subgroup_id", sql.Int, subgroup_id)
      .input("name", sql.VarChar, name)
      .input("room_no", sql.VarChar, room_no)
      .input("address", sql.VarChar, address)
      .input("p_number", sql.VarChar, p_number)
      .input("punch_id", sql.Int, punch_id)
      .input("change_flag", sql.BigInt, change_flag)
      .input("hostel", sql.VarChar, hostel)
      .input("hostel_tower", sql.VarChar, hostel_tower)
      .input("status", sql.VarChar, status)
      .input("photo", sql.VarChar, photo)
      .input("user_id", sql.VarChar, id)
      .query(queries.updateUserById);

    res.json({
      id,
      ad_user_name,
      email_id,
      contact_number,
      group_id,
      role_id,
      subgroup_id,
      name,
      room_no,
      address,
      p_number,
      punch_id,
      change_flag,
      hostel,
      hostel_tower,
      status,
      photo,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
