const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST /api/policies — Create a new policy
const REQUIRED_FIELDS = [
  "customerName",
  "dob",
  "gender",
  "mobile",
  "email",
  "address",
  "planType",
  "panNumber",
  "membersCount",
  "nomineeName",
  "premium",
  "policyStartDate",
];

const INSERT_POLICY_QUERY = `
  INSERT INTO policies (
    customer_name, dob, gender, mobile, email, address,
    plan_type, pan_number, members_count, medical_conditions,
    nominee_name, premium, policy_start_date, agent_id
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
  ) RETURNING *`;

const getMissingFields = (body) =>
  REQUIRED_FIELDS.filter((field) => !body[field]);

router.post("/", async (req, res) => {
  const missingFields = getMissingFields(req.body);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      fields: missingFields,
    });
  }

  const {
    customerName,
    dob,
    gender,
    mobile,
    email,
    address,
    planType,
    panNumber,
    membersCount,
    medicalConditions,
    nomineeName,
    premium,
    policyStartDate,
    agentId,
  } = req.body;

  if (!agentId) {
    return res.status(401).json({ error: "Unauthorized: Agent ID not found" });
  }

  const values = [
    customerName,
    dob,
    gender,
    mobile,
    email,
    address,
    planType,
    panNumber,
    membersCount,
    medicalConditions === "Yes",
    nomineeName,
    premium,
    policyStartDate,
    agentId,
  ];

  try {
    // Check if PAN number already exists
    const existing = await pool.query(
      "SELECT id FROM policies WHERE pan_number = $1",
      [panNumber],
    );

    if (existing.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "Policy already exists for this PAN number" });
    }

    const { rows } = await pool.query(INSERT_POLICY_QUERY, values);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Error creating policy:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
// GET /api/policies — Get all policies
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM policies ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching policies:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
