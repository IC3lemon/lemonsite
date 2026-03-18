
const charset = " `.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@".split('').reverse().join('');
const weights = scatter_weights(charset.length);

function scatter_weights(n: number): number[] {
    if (n === 1) {
        return [0.0];
    }
    const weights: number[] = [];
    for (let i = 0; i < n; i++) {
        weights.push(i / (n - 1));
    }
    return weights;
}

function find_weight(n: number): number {
    let left = 0;
    let right = weights.length - 1;

    if (n <= weights[left]) {
        return left;
    }
    if (n >= weights[right]) {
        return right;
    }

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (weights[mid] === n) {
            return mid;
        } else if (weights[mid] < n) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    if ((weights[left] - n) < (n - weights[right])) {
        return left;
    } else {
        return right;
    }
}

export interface AsciiCharacter {
    character: string;
    color: string;
}

export function textify(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
): AsciiCharacter[][] {
    const roundedWidth = Math.round(width);
    const roundedHeight = Math.round(height);
    const imageData = ctx.getImageData(0, 0, roundedWidth, roundedHeight);
    const pixels = imageData.data;
    const text: AsciiCharacter[][] = [];

    for (let y = 0; y < roundedHeight; y++) {
        const row: AsciiCharacter[] = [];
        for (let x = 0; x < roundedWidth; x++) {
            const i = (y * roundedWidth + x) * 4;
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            const r_norm = r / 255.0;
            const g_norm = g / 255.0;
            const b_norm = b / 255.0;
            const density = 0.2126 * r_norm + 0.7152 * g_norm + 0.0722 * b_norm;

            const charIndex = find_weight(density);
            const char = charset[charIndex];
            const color = `rgb(${r}, ${g}, ${b})`;

            row.push({ character: char, color: color });
        }
        text.push(row);
    }

    return text;
}
