/*
  # SSO Integration Setup

  1. New Tables
    - `sso_providers`
      - Stores SSO provider configurations
      - Columns for provider name, client ID, and other settings
    
    - `user_sso_connections`
      - Links users with SSO providers
      - Stores provider-specific user identifiers
      
  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- SSO Providers table
CREATE TABLE IF NOT EXISTS sso_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_name text NOT NULL UNIQUE,
  client_id text,
  client_secret text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sso_providers ENABLE ROW LEVEL SECURITY;

-- User SSO connections table
CREATE TABLE IF NOT EXISTS user_sso_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  provider_id uuid REFERENCES sso_providers(id) NOT NULL,
  provider_user_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, provider_id)
);

ALTER TABLE user_sso_connections ENABLE ROW LEVEL SECURITY;

-- Policies for sso_providers
CREATE POLICY "Allow read access to authenticated users"
  ON sso_providers
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for user_sso_connections
CREATE POLICY "Users can read their own SSO connections"
  ON user_sso_connections
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own SSO connections"
  ON user_sso_connections
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Update trigger for sso_providers
CREATE OR REPLACE FUNCTION update_sso_providers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_sso_providers_timestamp
  BEFORE UPDATE ON sso_providers
  FOR EACH ROW
  EXECUTE FUNCTION update_sso_providers_updated_at();

-- Update trigger for user_sso_connections
CREATE OR REPLACE FUNCTION update_user_sso_connections_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_sso_connections_timestamp
  BEFORE UPDATE ON user_sso_connections
  FOR EACH ROW
  EXECUTE FUNCTION update_user_sso_connections_updated_at();