#!/bin/bash
mkdir -p public/images/assets
cd public/images/assets

# Hero Images (Family, Travel, Friends, Portrait)
curl -L -s -o hero-1.jpg "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop"
curl -L -s -o hero-2.jpg "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop"
curl -L -s -o hero-3.jpg "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop"
curl -L -s -o hero-4.jpg "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"

# Product Images (10x15, Magnet, 15x21, 20x30)
curl -L -s -o prod-10x15.jpg "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop"
curl -L -s -o prod-magnets.jpg "https://plus.unsplash.com/premium_photo-1664115048248-12948c267688?q=80&w=600&auto=format&fit=crop"
curl -L -s -o prod-15x21.jpg "https://images.unsplash.com/photo-1531219500336-d7667a147824?q=80&w=600&auto=format&fit=crop"
curl -L -s -o prod-20x30.jpg "https://images.unsplash.com/photo-1576158142385-48fa240742f5?q=80&w=600&auto=format&fit=crop"

echo "Download Complete"
ls -la
