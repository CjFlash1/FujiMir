# Fujimir Development Environment - PowerShell Version

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FUJIMIR Development Environment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start MariaDB
Write-Host "[1/3] Starting MariaDB in WSL..." -ForegroundColor Yellow
wsl -d Ubuntu-20.04 -u root -- service mysql start
Write-Host "      MariaDB started!" -ForegroundColor Green
Write-Host ""

# Check connection
Write-Host "[2/3] Checking database..." -ForegroundColor Yellow
$result = wsl -d Ubuntu-20.04 -- mysql -u fujimir -pfujimir123 fujimir -e "SELECT COUNT(*) FROM Translation" 2>$null
Write-Host "      Database OK!" -ForegroundColor Green
Write-Host ""

# Start dev server
Write-Host "[3/3] Starting Next.js..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  http://localhost:3000" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

npm run dev
