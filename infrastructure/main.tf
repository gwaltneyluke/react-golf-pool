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
  region  = "us-west-1"
}

### locals

locals {
  resource_prefix = "jimstick-golf-pool"
}

### dynamo tables

resource "aws_dynamodb_table" "leaderboard_table" {
  name           = "${local.resource_prefix}-leaderboard-table"
  billing_mode   = "PROVISIONED"
  read_capacity  = 3
  write_capacity = 1
  hash_key       = "PlayerName"

  attribute {
    name = "PlayerName"
    type = "S"
  }
}

resource "aws_dynamodb_table" "picks_table" {
  name           = "${local.resource_prefix}-picks-table"
  billing_mode   = "PROVISIONED"
  read_capacity  = 3
  write_capacity = 1
  hash_key       = "UserId"

  attribute {
    name = "UserId"
    type = "S"
  }
}

### cognito infrastructure