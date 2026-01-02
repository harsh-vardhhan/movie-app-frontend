variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "ap-south-1"
}

variable "bucket_name" {
  description = "Name of the S3 bucket for the frontend"
  type        = string
  default     = "movie-app-frontend-hosting-harsh-001"
}
