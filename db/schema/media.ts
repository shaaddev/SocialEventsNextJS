import { pgTable, timestamp, text, index, integer  } from "drizzle-orm/pg-core";
import { posts } from "./posts";

let l = 1;

export const media = pgTable('media', {
    id: integer('id').notNull().primaryKey().default(l++),
    type: text('type').notNull(),
    user_id: text('user_id')
        .notNull()
        .references(() => posts.kindeAuthId),
    post_id: text('post_id')
        .references(() => posts.id),
    url: text('url').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})