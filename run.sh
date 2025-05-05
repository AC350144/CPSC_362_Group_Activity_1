#!/bin/bash

set -e

# --- Python Setup ---
echo "Checking for Python 3..."
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Installing..."
    sudo apt-get update
    sudo apt-get install -y python3
fi

echo "Checking for python3-venv..."
if ! python3 -m venv --help > /dev/null 2>&1; then
    echo "python3-venv is not installed. Installing..."
    sudo apt-get install -y python3-venv
else
    echo "python3-venv is already installed."
fi

# Create virtual environment
echo "Creating Python virtual environment..."
python3 -m venv venv

# Verify venv creation
if [ ! -f "venv/bin/activate" ]; then
    echo "Failed to create virtual environment. Exiting."
    exit 1
fi

# Activate venv
echo "Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
if [ -f "requirements.txt" ]; then
    echo "Installing Python dependencies..."
    pip install --upgrade pip
    pip install -r requirements.txt
else
    echo "No requirements.txt found. Skipping Python deps."
fi

# --- Node.js Setup ---
echo "Checking for Node.js and npm..."
if ! command -v npm &> /dev/null || ! command -v node &> /dev/null; then
    echo "Node.js or npm not found. Installing Node.js LTS..."
    sudo apt-get install -y curl
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Node.js and npm are already installed."
fi

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Install additional Node.js packages for backend and testing
echo "Installing mongoose, bcrypt, supertest, and jest..."
npm install mongoose bcrypt supertest
npm install --save-dev jest

# Create jest.config.js if not present
if [ ! -f "jest.config.js" ]; then
    echo "Creating jest.config.js..."
    cat <<EOL > jest.config.js
module.exports = {
  testEnvironment: 'node',
};
EOL
fi

# --- Start the Node.js Server ---
echo "Starting InstantParty (Node.js server)..."
node backend/server.js
