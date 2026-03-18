import React, { useRef, useEffect, useCallback } from 'react';

interface AsciiBackgroundProps {
    imageUrl?: string;
    videoUrl?: string;
    opacity?: number;
    fontSize?: number;
    /** Number of palette buckets per channel. Total colors = paletteSteps^3. Default 4 → 64 colors. */
    paletteSteps?: number;
}

const CHARSET = " `.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@"
    .split('').reverse().join('');

/** Quantize an 0-255 channel value to the nearest palette step */
const quantize = (v: number, steps: number): number => {
    const bucket = Math.round((v / 255) * (steps - 1));
    return Math.round((bucket / (steps - 1)) * 255);
};

const toKey = (r: number, g: number, b: number): string => `${r},${g},${b}`;

const AsciiBackground: React.FC<AsciiBackgroundProps> = ({
    imageUrl,
    videoUrl,
    opacity = 0.5,
    fontSize = 11,
    paletteSteps = 4,
}) => {
    const outputCanvasRef = useRef<HTMLCanvasElement>(null);
    const samplerCanvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const rafRef = useRef<number | null>(null);
    const playBtnRef = useRef<HTMLButtonElement>(null);
    const charMetrics = useRef({ w: fontSize * 0.6, h: fontSize });

    const measureChar = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.font = `${fontSize}px monospace`;
        charMetrics.current = { w: ctx.measureText('M').width, h: fontSize };
    }, [fontSize]);

    const renderFrame = useCallback((source: HTMLImageElement | HTMLVideoElement) => {
        const outCanvas = outputCanvasRef.current;
        const samplerCanvas = samplerCanvasRef.current;
        if (!outCanvas || !samplerCanvas) return;

        const outCtx = outCanvas.getContext('2d');
        const samplerCtx = samplerCanvas.getContext('2d', { willReadFrequently: true });
        if (!outCtx || !samplerCtx) return;

        const { w: charW, h: charH } = charMetrics.current;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        if (outCanvas.width !== vw || outCanvas.height !== vh) {
            outCanvas.width = vw;
            outCanvas.height = vh;
        }

        const cols = Math.ceil(vw / charW);
        const rows = Math.ceil(vh / charH);

        const srcW = source instanceof HTMLVideoElement ? source.videoWidth : source.width;
        const srcH = source instanceof HTMLVideoElement ? source.videoHeight : source.height;
        if (!srcW || !srcH) return;

        // Cover scale
        const scale = Math.max(cols / srcW, rows / srcH);
        const scaledW = srcW * scale;
        const scaledH = srcH * scale;
        const cropX = (scaledW - cols) / 2;
        const cropY = (scaledH - rows) / 2;

        if (samplerCanvas.width !== cols || samplerCanvas.height !== rows) {
            samplerCanvas.width = cols;
            samplerCanvas.height = rows;
        }

        samplerCtx.clearRect(0, 0, cols, rows);
        samplerCtx.drawImage(source, -cropX, -cropY, scaledW, scaledH);

        const { data: pixels } = samplerCtx.getImageData(0, 0, cols, rows);

        outCtx.clearRect(0, 0, vw, vh);
        outCtx.font = `${fontSize}px monospace`;
        outCtx.textBaseline = 'top';

        // --- Palette-quantized batching ---
        // Map: colorKey → array of {x, y, char}
        const batches = new Map<string, { x: number; y: number; char: string }[]>();

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const i = (row * cols + col) * 4;
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];

                const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
                const char = CHARSET[Math.floor(lum * (CHARSET.length - 1))];
                if (char === ' ') continue;

                // Quantize to palette
                const qr = quantize(r, paletteSteps);
                const qg = quantize(g, paletteSteps);
                const qb = quantize(b, paletteSteps);
                const key = toKey(qr, qg, qb);

                let batch = batches.get(key);
                if (!batch) { batch = []; batches.set(key, batch); }
                batch.push({ x: col * charW, y: row * charH, char });
            }
        }

        // One fillStyle set per palette bucket, then draw all chars in that bucket
        for (const [key, batch] of batches) {
            outCtx.fillStyle = `rgb(${key})`;
            for (const { x, y, char } of batch) {
                outCtx.fillText(char, x, y);
            }
        }
    }, [fontSize, paletteSteps]);

    // Image mode
    useEffect(() => {
        if (!imageUrl) return;
        const outCtx = outputCanvasRef.current?.getContext('2d');
        if (!outCtx) return;
        measureChar(outCtx);

        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;
        img.onload = () => renderFrame(img);

        const onResize = () => renderFrame(img);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [imageUrl, renderFrame, measureChar]);

    // Video mode
    useEffect(() => {
        if (!videoUrl || !videoRef.current) return;
        const video = videoRef.current;
        const outCtx = outputCanvasRef.current?.getContext('2d');
        if (!outCtx) return;
        measureChar(outCtx);

        let running = false;

        const loop = () => {
            if (!running) return;
            renderFrame(video);
            rafRef.current = requestAnimationFrame(loop);
        };

        const onPlay = () => {
            if (playBtnRef.current) playBtnRef.current.style.display = 'none';
            running = true;
            loop();
        };
        const onPause = () => {
            running = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };

        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        video.addEventListener('ended', onPause);
        video.play().catch(() => {
            if (playBtnRef.current) playBtnRef.current.style.display = 'block';
        });

        return () => {
            running = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
            video.removeEventListener('ended', onPause);
        };
    }, [videoUrl, renderFrame, measureChar]);

    return (
        <>
            {videoUrl && (
                <video ref={videoRef} src={videoUrl} muted loop playsInline style={{ display: 'none' }} />
            )}
            <canvas ref={samplerCanvasRef} style={{ display: 'none' }} />
            <canvas
                ref={outputCanvasRef}
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '100vw', height: '100vh',
                    zIndex: 0,
                    pointerEvents: 'none',
                    opacity,
                }}
            />
            <button
                ref={playBtnRef}
                onClick={() => videoRef.current?.play()}
                style={{
                    display: 'none',
                    position: 'fixed',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    padding: '10px 20px',
                    fontSize: '20px',
                    cursor: 'pointer',
                }}
            >
                ▶ Play
            </button>
        </>
    );
};

export default AsciiBackground;