import { neon } from '@netlify/neon';

export async function handler(event) {
  const sql = neon();
  const { werknemer, datum, status } = JSON.parse(event.body);

    await sql`INSERT INTO planning (werknemer, datum, status)
    VALUES (${werknemer}, ${datum}, ${status})
    ON CONFLICT (werknemer, datum)
    DO UPDATE SET status = ${status}`;

    return {
            statusCode: 200,
            body: JSON.stringify({ message: "Planning bijgewerkt" })
  };
}