# Learning Hero Platform - Automatic Deployment Script
# This script will deploy the project to GitHub with minimal user interaction

Write-Host "=== Learning Hero Platform - Automatic Deployment Script ===" -ForegroundColor Green

# Check if Git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Set current directory
Set-Location -Path $PSScriptRoot

# Check if Git repository is already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
}

# Add all files to staging area
Write-Host "Adding files to Git staging area..." -ForegroundColor Yellow
git add .

# Check if there are any uncommitted changes
$status = git status --porcelain
if (-not [string]::IsNullOrWhiteSpace($status)) {
    # Commit changes with default message
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "Automatic deployment commit"
}

# Set remote repository URL
# Note: You need to manually replace <your-username> and <your-repo-name>
$username = "username"  # Replace with actual GitHub username
$repoName = "learning-hero"  # Replace with actual repository name
$remoteUrl = "https://github.com/$username/$repoName.git"

# Check if remote exists and add if it doesn't
$remoteExists = git remote -v | Select-String -Pattern "origin"
if (-not $remoteExists) {
    Write-Host "Setting remote repository URL: $remoteUrl" -ForegroundColor Yellow
    git remote add origin $remoteUrl
}

# Push to GitHub
Write-Host "Pushing code to GitHub..." -ForegroundColor Yellow
Write-Host "Note: This will prompt for GitHub credentials if not already configured." -ForegroundColor Cyan
git push -u origin master

# Check if push was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Code pushed successfully!" -ForegroundColor Green
    
    # Instructions to enable GitHub Pages
    Write-Host "\n=== Enable GitHub Pages ===" -ForegroundColor Green
    Write-Host "Please log in to GitHub, go to your repository page, and follow these steps:" -ForegroundColor Cyan
    Write-Host "1. Click on 'Settings' tab"
    Write-Host "2. Select 'Pages' from the left menu"
    Write-Host "3. Under 'Source', select 'master' or 'main' branch"
    Write-Host "4. Click 'Save' button"
    Write-Host "\nGitHub Pages will be available at: https://$username.github.io/$repoName/" -ForegroundColor Green
    
    # Instructions to update WeChat share links
    Write-Host "\n=== Update WeChat Share Links ===" -ForegroundColor Green
    Write-Host "After GitHub Pages is enabled, please update share links in these files:" -ForegroundColor Cyan
    Write-Host "1. index.html: Find meta tags for og:url and wechat-share-link"
    Write-Host "2. Change the link to: https://$username.github.io/$repoName/"
    Write-Host "3. Commit and push changes: git add . ; git commit -m 'Update share links' ; git push" -ForegroundColor Cyan
} else {
    Write-Host "Code push failed. Please check your GitHub credentials and repository permissions." -ForegroundColor Red
    Write-Host "Alternatively, try running the interactive deployment script: .\deploy-to-github.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host "\n=== Deployment Script Completed ===" -ForegroundColor Green
