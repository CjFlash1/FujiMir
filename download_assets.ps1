$ErrorActionPreference = "Continue" # Don't stop on error, report it

New-Item -ItemType Directory -Force -Path "public/images/assets"

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

# Hero Images
Download-Image -Url "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop" -Path "public/images/assets/hero-1.jpg"
Download-Image -Url "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop" -Path "public/images/assets/hero-2.jpg"
Download-Image -Url "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop" -Path "public/images/assets/hero-3.jpg"
# Replacement for Portrait -> Cozy Coffee
Download-Image -Url "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop" -Path "public/images/assets/hero-4.jpg"

# Product Images
Download-Image -Url "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop" -Path "public/images/assets/prod-10x15.jpg"
# NEW Link for Magnets (Polaroids)
Download-Image -Url "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop" -Path "public/images/assets/prod-magnets.jpg"
Download-Image -Url "https://images.unsplash.com/photo-1531219500336-d7667a147824?q=80&w=600&auto=format&fit=crop" -Path "public/images/assets/prod-15x21.jpg"
Download-Image -Url "https://images.unsplash.com/photo-1576158142385-48fa240742f5?q=80&w=600&auto=format&fit=crop" -Path "public/images/assets/prod-20x30.jpg"

Write-Host "Download process finished."
