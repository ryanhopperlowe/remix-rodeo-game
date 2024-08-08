DO $$ BEGIN
 CREATE TYPE "public"."game_status" AS ENUM('in_progress', 'won', 'lost');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"solution_word_id" varchar(32) NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"ended_at" timestamp,
	"status" "game_status" DEFAULT 'in_progress' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guesses" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"game_id" varchar(32) NOT NULL,
	"word" varchar(5) NOT NULL,
	"attempt_number" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"word" varchar(5) NOT NULL,
	"is_solution" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_solution_word_id_users_id_fk" FOREIGN KEY ("solution_word_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "guesses" ADD CONSTRAINT "guesses_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
