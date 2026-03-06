import { neon } from '@netlify/neon';

export async function handler() {
  const sql = neon(); // gebruikt NETLIFY_DATABASE_URL
  const result = await sql`SELECT * FROM planning ORDER BY datum ASC`;
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
}