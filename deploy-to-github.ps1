# Learning Hero Platform - GitHub Deployment Script
# This script will help you deploy the project to GitHub and enable GitHub Pages

Write-Host "=== Learning Hero Platform - GitHub Deployment Script ===" -ForegroundColor Green

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

# Check if .gitignore file exists
if (-not (Test-Path ".gitignore")) {
    Write-Host "Creating .gitignore file..." -ForegroundColor Yellow
    $gitignoreContent = "# OS generated files`nThumbs.db`n.DS_Store`n`n# Editor directories and files`n.vscode/`n.idea/`n*.swp`n*.swo`n*~`n`n# Log files`n*.log`n`n# Environment variables`n.env`n.env.local`n.env.*.local`n`n# Dependency directories (if any)`nnode_modules/`nbower_components/`n`n# Build outputs (if any)`ndist/`nbuild/`n`n# Temporary files`n*.tmp`n*.temp"
    $gitignoreContent | Out-File -FilePath ".gitignore" -Encoding ASCII
}

# Add all files to staging area
Write-Host "Adding files to Git staging area..." -ForegroundColor Yellow
git add .

# Check if there are any uncommitted changes
$status = git status --porcelain
if (-not [string]::IsNullOrWhiteSpace($status)) {
    # Commit changes
    $commitMessage = Read-Host "Enter commit message (default: Deploy to GitHub)"
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "Deploy to GitHub"
    }
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "$commitMessage"
}

# Get GitHub username and repository name
$username = Read-Host "Enter your GitHub username"
$repoName = Read-Host "Enter repository name (default: learning-hero)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "learning-hero"
}

# Set remote repository URL
$remoteUrl = "https://github.com/$username/$repoName.git"
Write-Host "Setting remote repository URL: $remoteUrl" -ForegroundColor Yellow
git remote add origin $remoteUrl

# Push to GitHub
Write-Host "Pushing code to GitHub..." -ForegroundColor Yellow
Write-Host "Note: You will be prompted for GitHub credentials on first push" -ForegroundColor Cyan
git push -u origin master

# Check if push was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Code pushed successfully!" -ForegroundColor Green
    
    # Instructions to enable GitHub Pages
    Write-Host "`n=== Enable GitHub Pages ===" -ForegroundColor Green
    Write-Host "Please log in to GitHub, go to your repository page, and follow these steps:" -ForegroundColor Cyan
    Write-Host "1. Click on 'Settings' tab"
    Write-Host "2. Select 'Pages' from the left menu"
    Write-Host "3. Under 'Source', select 'master' or 'main' branch"
    Write-Host "4. Click 'Save' button"
    Write-Host "`nGitHub Pages will be available at: https://$username.github.io/$repoName/" -ForegroundColor Green
    
    # Instructions to update WeChat share links
    Write-Host "`n=== Update WeChat Share Links ===" -ForegroundColor Green
    Write-Host "After GitHub Pages is enabled, please update share links in these files:" -ForegroundColor Cyan
    Write-Host "1. index.html: Find meta tags for og:url and wechat-share-link"
    Write-Host "2. Change the link to: https://$username.github.io/$repoName/"
    Write-Host "3. Commit and push changes: git add . ; git commit -m 'Update share links' ; git push" -ForegroundColor Cyan
} else {
    Write-Host "Code push failed. Please check your GitHub credentials and repository permissions." -ForegroundColor Red
    exit 1
}

Write-Host "`n=== Deployment Script Completed ===" -ForegroundColor Green
Write-Host "If you have any issues, please check the script output or contact support" -ForegroundColor Gray