import pool from "../../config/db.js";
import type {
  TCreateIsuee,
  TCustomError,
  TIssue,
  TPayload,
  TReporter,
  TUser,
} from "../../types/issue.type.js";

export const createIssueService = async (
  payload: TCreateIsuee,
  user: TUser | undefined,
) => {
  const { title, description, type } = payload;

  // unauthorized
  if (!user) {
    const error: TCustomError = {
      statusCode: 401,
      message: "Unauthorized Access",
    };

    throw error;
  }

  // validation
  if (!title || !description || !type) {
    const error: TCustomError = {
      statusCode: 400,
      message: "All fields are required",
    };

    throw error;
  }
  if (type !== "bug" && type !== "feature_request") {
    const error: TCustomError = {
      statusCode: 400,
      message: "Type must be bug or feature_request",
    };

    throw error;
  }

  const result = await pool.query(
    `
      INSERT INTO issues (
        title,
        description,
        type,
        reporter_id
      )

      VALUES ($1, $2, $3, $4)

      RETURNING *
    `,
    [title, description, type, user.id],
  );

  return result.rows[0];
};

export const getAllIssuesService = async (queryData: any) => {
  const { sort = "newest", type, status } = queryData;

  let query = `SELECT * FROM issues`;

  const conditions = [];

  const values = [];

  if (type) {
    values.push(type);

    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);

    conditions.push(`status = $${values.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  if (sort === "oldest") {
    query += ` ORDER BY created_at ASC`;
  } else {
    query += ` ORDER BY created_at DESC`;
  }
  const issuesResult = await pool.query(query, values);

  const issues = issuesResult.rows;
  const reporterIds = issues.map((issue: any) => issue.reporter_id);
  const uniqueIds = [...new Set(reporterIds)];

  const usersResult = await pool.query(
    `
        SELECT id, name, role
        FROM users
        WHERE id = ANY($1)
      `,
    [uniqueIds],
  );

  const users = usersResult.rows;

  const finalIssues = issues.map((issue: TIssue) => {
    const reporter = users.find(
      (user: TReporter) => user.id === issue.reporter_id,
    );

    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
  });

  return finalIssues;
};

export const getSingleIssueService = async (id: string) => {
  const issueResult = await pool.query(
    `
        SELECT *
        FROM issues
        WHERE id = $1
      `,
    [id],
  );

  const issue = issueResult.rows[0];

  if (!issue) {
    throw {
      message: "Issue not found",
    };
  }

  const userResult = await pool.query(
    `
        SELECT id, name, role
        FROM users
        WHERE id = $1
      `,
    [issue.reporter_id],
  );

  const reporter = userResult.rows[0];

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

export const updateIssueService = async (
  id: string,
  payload: TPayload,
  user: TUser | undefined,
) => {
  const issueResult = await pool.query(
    `
      SELECT *
      FROM issues
      WHERE id = $1
    `,
    [id],
  );

  const issue = issueResult.rows[0];

  if (!issue) {
    const error: TCustomError = {
      statusCode: 404,
      message: "Issue not found",
    };

    throw error;
  }
  if (!user) {
    const error: TCustomError = {
      statusCode: 401,
      message: "Unauthorized",
    };

    throw error;
  }
  if (user.role !== "maintainer") {
    if (issue.reporter_id !== user.id) {
      const error: TCustomError = {
        statusCode: 403,
        message: "Forbidden Access",
      };

      throw error;
    }
    if (issue.status !== "open") {
      const error: TCustomError = {
        statusCode: 409,
        message: "Cannot update closed issue",
      };

      throw error;
    }
  }

  const fields: string[] = [];

  const values: (string | number)[] = [];

  let count = 1;

  if (payload.title) {
    fields.push(`title = $${count}`);

    values.push(payload.title);

    count++;
  }

  if (payload.description) {
    fields.push(`description = $${count}`);

    values.push(payload.description);

    count++;
  }

  if (payload.type) {
    fields.push(`type = $${count}`);

    values.push(payload.type);

    count++;
  }
  if (fields.length === 0) {
    const error: TCustomError = {
      statusCode: 400,
      message: "No update fields provided",
    };

    throw error;
  }

  fields.push(`updated_at = CURRENT_TIMESTAMP`);

  values.push(id);

  const query = `
    UPDATE issues

    SET ${fields.join(", ")}

    WHERE id = $${count}

    RETURNING *
  `;

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const deleteIssueService = async (
  id: string,
  user: TUser | undefined,
) => {
  const issueResult = await pool.query(
    `
        SELECT *
        FROM issues
        WHERE id = $1
      `,
    [id],
  );

  const issue = issueResult.rows[0];

  if (!issue) {
    const error: TCustomError = {
      statusCode: 404,
      message: "Issue not found",
    };

    throw error;
  }

  if (!user) {
    const error: TCustomError = {
      statusCode: 401,
      message: "Unauthorized Access",
    };

    throw error;
  }

  if (user.role !== "maintainer") {
    const error: TCustomError = {
      statusCode: 403,
      message: "Only maintainer can delete issue",
    };

    throw error;
  }

  await pool.query(
    `
      DELETE FROM issues
      WHERE id = $1
    `,
    [id],
  );
};
