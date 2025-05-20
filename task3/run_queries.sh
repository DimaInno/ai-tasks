#!/bin/bash

DB_FILE="sales.db"

# Create database and populate it
sqlite3 $DB_FILE < data/orders.sql

# Run each query and save output
for query in queries/*.sql; do
    echo "Running $query..."
    sqlite3 $DB_FILE < "$query"
    echo ""
done