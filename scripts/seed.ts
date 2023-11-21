import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import { getClient } from "@/app/lib/server/db";

async function seed() {
  const client = getClient();
  await client.connect();
  await client.query("begin");
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash("123123", saltRounds);

    console.log("creating demo user");
    await client.query(
      "insert into users (username, password) values ($1, $2) on conflict do nothing",
      ["demo", hash]
    );

    const demoUserRes = await client.query(
      "select id from users where username = 'demo'"
    );
    const demoUser = demoUserRes.rows[0];
    for (let i = 0; i < 10; i++) {
      console.log(`create note ${i} for demo user`);
      await client.query(
        "insert into notes (user_id, title, content) values ($1, $2, $3)",
        [demoUser.id, faker.lorem.sentence(), faker.lorem.paragraphs()]
      );
    }

    for (let i = 0; i < 10; i++) {
      console.log(`creating user ${i}`);
      await client.query(
        "insert into users (username, password) values ($1, $2)",
        [faker.internet.userName(), hash]
      );
    }

    const usersRes = await client.query(
      "select id from users order by created_at desc limit 10"
    );

    for (const row of usersRes.rows) {
      for (let i = 0; i < 10; i++) {
        console.log(`creating note ${i} for user ${row.id}`);
        await client.query(
          "insert into notes (user_id, title, content) values ($1, $2, $3)",
          [row.id, faker.lorem.sentence(), faker.lorem.paragraphs()]
        );
      }
    }

    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    console.error(error);
  } finally {
    await client.end();
  }
}

seed();
