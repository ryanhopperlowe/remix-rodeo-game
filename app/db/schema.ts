import { pgTable, boolean, timestamp, pgEnum, serial, varchar } from 'drizzle-orm/pg-core';
import { cuid2 } from 'drizzle-cuid2/postgres';

// Define the enum
export const gameStatusEnum = pgEnum('game_status', ['in_progress', 'won', 'lost']);

export const words = pgTable('users', {
    id: cuid2('id').defaultRandom().primaryKey(),
    word: varchar('word', { length: 5 }).notNull(),
    is_solution: boolean('is_solution').notNull().default(false)
});

export const games = pgTable('games', {
    id: cuid2('id').defaultRandom().primaryKey(),
    solution_word_id: cuid2('solution_word_id')
        .notNull()
        .references(() => words.id),
    started_at: timestamp('started_at').notNull().defaultNow(),
    ended_at: timestamp('ended_at'),
    status: gameStatusEnum('status').notNull().default('in_progress')
});

export const guesses = pgTable('guesses', {
    id: cuid2('id').defaultRandom().primaryKey(),
    game_id: cuid2('game_id')
        .notNull()
        .references(() => games.id),
    word: varchar('word', { length: 5 }).notNull(),
    attempt_number: serial('attempt_number').notNull()
});
