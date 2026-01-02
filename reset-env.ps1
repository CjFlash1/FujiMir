Write-Host "1. Killing Node processes..."
Stop-Process -Name node -Force -ErrorAction SilentlyContinue

Write-Host "2. Restarting WSL..."
wsl --shutdown
Start-Sleep -Seconds 5
wsl -d Ubuntu-20.04 -- sudo service mariadb start

Write-Host "3. Waiting for DB..."
Start-Sleep -Seconds 10
# Loop check for DB availability
for ($i = 1; $i -le 5; $i++) {
    wsl -d Ubuntu-20.04 -- mysqladmin -u fujimir -pfujimir123 ping
    if ($?) { 
        Write-Host "Database is UP!" 
        break 
    }
    Write-Host "Waiting for DB... ($i/5)"
    Start-Sleep -Seconds 5
}
