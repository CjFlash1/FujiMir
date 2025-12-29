
export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
    })

export interface FrameConfig {
    id: string;
    text: string;
    backgroundColor: string;
    textColor: string;
    pattern?: string; // CSS pattern or image URL
}

export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number },
    frameConfig: FrameConfig
): Promise<Blob | null> {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        return null
    }

    // Output size: 10x15cm @ 300dpi (Fujifilm Frontier 300dpi)
    // 102mm x 152mm => ~1205 x 1795 px
    canvas.width = 1205
    canvas.height = 1795

    // --- 1. Background ---
    ctx.fillStyle = frameConfig.backgroundColor || '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // --- 1.5 Pattern (Quick Hack) ---
    if (frameConfig.id === 'dots') {
        ctx.fillStyle = '#e2e8f0'; // slate-200
        const spacing = 80;
        for (let x = 0; x < canvas.width + spacing; x += spacing) {
            for (let y = 0; y < canvas.height + spacing; y += spacing) {
                const isEven = (x / spacing) % 2 === 0;
                const offsetY = isEven ? 0 : spacing / 2;
                ctx.beginPath();
                ctx.arc(x, y + offsetY, 12, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    // --- 2. Photo Placement (Polaroid Style) ---
    // Top margin: 6mm (~70px)
    // Side margins: 6mm (~70px)
    // Photo is Square => Width = CanvasWidth - 2*Margin
    const margin = 70;
    const photoWidth = canvas.width - (margin * 2); // 1205 - 140 = 1065
    const photoHeight = photoWidth; // Square photo (1065x1065)

    // Draw photo
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        margin,
        margin,
        photoWidth,
        photoHeight
    )

    // --- 3. Text ---
    if (frameConfig.text) {
        ctx.fillStyle = frameConfig.textColor || '#333333';
        // We assume global font is loaded or system font
        ctx.font = '80px "Caveat", "Comic Sans MS", cursive';
        ctx.textAlign = 'center';

        // Text is placed in the "caption" area below the photo
        // Center of the canvas horizontally
        // Vertically: Photo ends at (margin + photoHeight). Let's add ~250px padding.
        const textY = margin + photoHeight + 250;
        ctx.fillText(frameConfig.text, canvas.width / 2, textY);
    }

    // --- 4. Cut Lines & Mini Photos (Bonus Area) ---
    // The "Polaroid" part effectively ends around Y = 1450 (1065 + 70 + ~315 bottom border)
    // 10x12.7cm format is popular (4x5 inch), or just square 10x10.
    // Let's mark a cut line for a Square format (10x10cm + bottom margin) => ~12cm height?
    // Or just make it 10x12cm.

    // Let's draw a light cut line at roughly 13cm mark (~1535px) to simulate a "long polaroid"
    const cutY = margin + photoHeight + 450; // ~1585px

    // Draw Cut Line (dashed)
    ctx.strokeStyle = '#d1d5db'; // gray-300
    ctx.lineWidth = 3;
    ctx.setLineDash([15, 15]);
    ctx.beginPath();
    ctx.moveTo(0, cutY);
    ctx.lineTo(canvas.width, cutY);
    ctx.stroke();

    // Draw "Scissors" icon or text (optional)
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText('✂', 20, cutY - 10);

    // --- 5. Mini Photos in the extra space ---
    // Remaining height is ~210px (1795 - 1585). That's small.
    // Actually 10x15 is 1795px height.
    // Photo + Top Margin = 1135px.
    // 1795 - 1135 = 660px remaining space!
    // We used 450px for the text area. 
    // So cutY = 1135 + 450 = 1585.
    // Remaining: 1795 - 1585 = 210px. 
    // That's enough for very small passport photos or branding.

    const miniSize = 180;
    const miniY = cutY + 15; // padding

    // Mini 1
    ctx.drawImage(
        image,
        pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
        margin, miniY, miniSize, miniSize
    );
    // Mini 2
    ctx.drawImage(
        image,
        pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
        margin + miniSize + 20, miniY, miniSize, miniSize
    );

    // Branding
    ctx.font = '30px sans-serif';
    ctx.fillStyle = '#9ca3af';
    ctx.textAlign = 'right';
    ctx.fillText('fujimir.com.ua', canvas.width - margin, canvas.height - 20);

    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            resolve(file)
        }, 'image/jpeg', 0.95)
    })
}
