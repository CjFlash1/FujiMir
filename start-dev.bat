@echo off
echo ========================================
echo   FUJIMIR Development Environment
echo ========================================
echo.

echo [1/3] Starting MariaDB in WSL...
wsl -d Ubuntu-20.04 -u root -- service mysql start
if %errorlevel% neq 0 (
    echo ERROR: Failed to start MariaDB
    pause
    exit /b 1
)
echo      MariaDB started successfully!
echo.

echo [2/3] Checking database connection...
wsl -d Ubuntu-20.04 -- mysql -u fujimir -pfujimir123 -e "SELECT 'OK' as Status" 2>nul
if %errorlevel% neq 0 (
    echo WARNING: Database connection check failed
) else (
    echo      Database connection OK!
)
echo.

echo [3/3] Starting Next.js development server...
echo.
echo ========================================
echo   Server will start at:
echo   http://localhost:3000
echo ========================================
echo.

npm run dev
