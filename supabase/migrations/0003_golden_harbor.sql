/*
  # Add verification codes tables

  1. New Tables
    - `verification_codes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `code` (text)
      - `type` (text) - either 'email' or 'phone'
      - `expires_at` (timestamptz)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS
    - Add policies for code verification
*/

CREATE TABLE IF NOT EXISTS verification_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  code text NOT NULL,
  type text NOT NULL CHECK (type IN ('email', 'phone')),
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own verification codes"
  ON verification_codes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create verification codes"
  ON verification_codes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);