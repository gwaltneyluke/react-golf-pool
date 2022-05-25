terraform {
  cloud {
    organization = "luke-gwaltney-personal"

    workspaces {
      name = "jimstick-golf-pool"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

### variables

variable "google_idp_client_id" {
  type        = string
  description = "Client ID for the Google Identity Provider"
}

variable "google_idp_client_secret" {
  type        = string
  description = "Client secret for the Google Identity Provider"
}

### locals

locals {
  resource_prefix = "jimstick-golf-pool"
}

### dynamo tables

resource "aws_dynamodb_table" "players_table" {
  name           = "${local.resource_prefix}-players-table"
  billing_mode   = "PROVISIONED"
  read_capacity  = 3
  write_capacity = 1
  hash_key       = "name"

  attribute {
    name = "name"
    type = "S"
  }
}

resource "aws_ssm_parameter" "players_table_arn" {
  name        = "/${local.resource_prefix}/players-table/arn"
  type        = "String"
  value       = aws_dynamodb_table.players_table.arn
  description = "the ARN of the players table for the jimstick golf pool"
  overwrite   = true
}

resource "aws_ssm_parameter" "players_table_name" {
  name        = "/${local.resource_prefix}/players-table/name"
  type        = "String"
  value       = aws_dynamodb_table.players_table.name
  description = "the name of the players table for the jimstick golf pool"
  overwrite   = true
}

resource "aws_dynamodb_table" "gents_table" {
  name           = "${local.resource_prefix}-gents-table"
  billing_mode   = "PROVISIONED"
  read_capacity  = 3
  write_capacity = 1
  hash_key       = "userId"

  attribute {
    name = "userId"
    type = "S"
  }
}

resource "aws_ssm_parameter" "gents_table_arn" {
  name        = "/${local.resource_prefix}/gents-table/arn"
  type        = "String"
  value       = aws_dynamodb_table.gents_table.arn
  description = "the ARN of the gents table for the jimstick golf pool"
  overwrite   = true
}

resource "aws_ssm_parameter" "gents_table_name" {
  name        = "/${local.resource_prefix}/gents-table/name"
  type        = "String"
  value       = aws_dynamodb_table.gents_table.name
  description = "the name of the gents table for the jimstick golf pool"
  overwrite   = true
}

### cognito infrastructure

resource "aws_cognito_user_pool" "user_pool" {
  name = "${local.resource_prefix}-user-pool"
}

resource "aws_cognito_user_pool_domain" "user_pool_domain" {
  domain       = local.resource_prefix
  user_pool_id = aws_cognito_user_pool.user_pool.id
}

resource "aws_cognito_identity_provider" "google" {
  user_pool_id  = aws_cognito_user_pool.user_pool.id
  provider_name = "Google"
  provider_type = "Google"

  provider_details = {
    authorize_scopes = "email profile openid"
    client_id        = var.google_idp_client_id
    client_secret    = var.google_idp_client_secret
  }

  attribute_mapping = {
    email       = "email"
    username    = "sub"
    given_name  = "given_name"
    family_name = "family_name"
  }
}

resource "aws_cognito_user_pool_client" "app_client" {
  name                                 = "${local.resource_prefix}-app-client"
  user_pool_id                         = aws_cognito_user_pool.user_pool.id
  callback_urls                        = [ "http://localhost:3000" ]
  logout_urls                          = [ "http://localhost:3000/logout" ]
  allowed_oauth_flows                  = [ "code" ]
  allowed_oauth_scopes                 = [ "email", "profile", "openid" ]
  allowed_oauth_flows_user_pool_client = true
  supported_identity_providers         = [ aws_cognito_identity_provider.google.provider_name ]
}
