$ErrorActionPreference = "Continue"

function Download-Image {
    param ($Url, $Path)
    try {
        Invoke-WebRequest -Uri $Url -OutFile $Path
        Write-Host "Downloaded: $Path" -ForegroundColor Green
    } catch {
        Write-Host "FAILED to download: $Path from $Url" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

# 15x21 Replacement (Frame on table/shelf)
Download-Image -Url "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop" -Path "public/images/assets/prod-15x21.jpg"

# 20x30 Replacement (Large Art/Photo)
Download-Image -Url "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop" -Path "public/images/assets/prod-20x30.jpg"

Write-Host "Fix complete."
