import { pgTable, boolean, timestamp, pgEnum, serial, varchar, uuid } from 'drizzle-orm/pg-core';

export const gameStatusEnum = pgEnum('game_status', ['in_progress', 'won', 'lost']);

export const words = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    word: varchar('word', { length: 5 }).notNull(),
    is_solution: boolean('is_solution').notNull().default(false)
});

export const games = pgTable('games', {
    id: uuid('id').defaultRandom().primaryKey(),
    solution_word_id: uuid('solution_word_id')
        .notNull()
        .references(() => words.id),
    started_at: timestamp('started_at').notNull().defaultNow(),
    ended_at: timestamp('ended_at'),
    status: gameStatusEnum('status').notNull().default('in_progress')
});

export const guesses = pgTable('guesses', {
    id: uuid('id').defaultRandom().primaryKey(),
    game_id: uuid('game_id')
        .notNull()
        .references(() => games.id),
    word: varchar('word', { length: 5 }).notNull(),
    attempt_number: serial('attempt_number').notNull()
});
