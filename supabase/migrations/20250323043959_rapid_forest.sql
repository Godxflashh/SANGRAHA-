/*
  # Create books and related tables

  1. New Tables
    - `books`
      - `id` (uuid, primary key)
      - `title` (text)
      - `author` (text)
      - `description` (text)
      - `cover_url` (text)
      - `genre` (text)
      - `category` (text)
      - `rating` (numeric)
      - `created_at` (timestamp)
    - `user_preferences`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `preferred_genres` (text[])
      - `preferred_categories` (text[])
      - `created_at` (timestamp)
    - `user_book_interactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `book_id` (uuid, references books)
      - `interaction_type` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  description text,
  cover_url text,
  genre text,
  category text,
  rating numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create user preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  preferred_genres text[],
  preferred_categories text[],
  created_at timestamptz DEFAULT now()
);

-- Create user book interactions table
CREATE TABLE IF NOT EXISTS user_book_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  book_id uuid REFERENCES books NOT NULL,
  interaction_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_book_interactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read books"
  ON books
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can read their preferences"
  ON user_preferences
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their preferences"
  ON user_preferences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read their interactions"
  ON user_book_interactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create interactions"
  ON user_book_interactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);