import { sql, relations } from 'drizzle-orm';
import { pgTable, timestamp, text, index, integer  } from "drizzle-orm/pg-core";

let l = 1;


export const posts = pgTable('posts', {
        id: integer('id').notNull().primaryKey().default(l++),
        kindeAuthId: text('kindeauthid'),
        kindeAuthName: text('kindeauthname'),
        title: text('title').notNull(),
        caption: text('caption').notNull(),
        location: text('location').notNull(),
        event_date: text('event_date').notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
})