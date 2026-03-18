from PIL import Image
from random import *
import cv2
import time
import os
# by default windows terminal -> 30 x 120
def scatter_weights(n):
    if n == 1:
        return [0.0]
    return [i / (n - 1) for i in range(n)]

def find_weight(n):
    left, right = 0, len(weights) - 1
    if n <= weights[left]:
        return left
    if n >= weights[right]:
        return right

    while left <= right:
        mid = (left + right) // 2
        if weights[mid] == n:
            return mid
        elif weights[mid] < n:
            left = mid + 1
        else:
            right = mid - 1
    if (weights[left] - n) < (n - weights[right]):
        return left
    else:
        return right

def shrink(img, max_width=120, max_height=30, aspect_correction=0.55):
    original_width, original_height = img.size
    adjusted_height = int(original_height * aspect_correction)
    scale_w = max_width / original_width
    scale_h = max_height / adjusted_height
    scale = min(scale_w, scale_h)

    new_width = int(original_width * scale)
    new_height = int(original_height * scale * aspect_correction)

    return img.resize((new_width, new_height), resample=Image.Resampling.LANCZOS)

def rgb_color(r, g, b):
    return f'\033[38;2;{r};{g};{b}m' # https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797

def textify(img: Image):
    img = shrink(img).convert("RGB")
    pixels = img.load()
    width, height = img.size
    text = ""

    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            r_norm = r / 255.0
            g_norm = g / 255.0
            b_norm = b / 255.0
            density = 0.2126 * r_norm + 0.7152 * g_norm + 0.0722 * b_norm
            char = charset[find_weight(density)]
            color = rgb_color(r, g, b)
            text += color + char + '\033[0m'
        text += '\n'

    return text

def frame_to_pil(frame):
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    return Image.fromarray(frame_rgb)

def stream_webcam_to_ascii():
    START = time.time()
    cap = cv2.VideoCapture(0)  
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

    if not cap.isOpened():
        print("Oopsie, Failed to open webcam.")
        return

    fps = 16
    delay = 1.0 / fps

    try:
        while True:
            start = time.time()
            ret, frame = cap.read()
            
            if not ret:
                break

            frame = cv2.flip(frame, 1)
            pil_image = frame_to_pil(frame)
            ascii_output = textify(pil_image)
            os.system('cls')
            print(f'समय : {time.time() - START}')
            print(ascii_output)
            print('oopsie, scroll up nigga, and dont resize, it fucks shit up')
            elapsed = time.time() - start
            time.sleep(max(0, delay - elapsed))

    except KeyboardInterrupt:
        print('Stopped.')
    finally:
        cap.release()
        return ascii_output

def image_to_ascii(img_path):
    if img_path == '':
        img_path = 'images/alrighty.jpg'
    IMG = Image.open(img_path)
    return textify(IMG)
    
def video_to_ascii(vid_path):
    if vid_path == '':
        vid_path = 'images/chainsaw.mp4'

    START = time.time()
    cap = cv2.VideoCapture(vid_path)

    if not cap.isOpened():
        print("Oopsie, failed to open video.")
        return

    fps = cap.get(cv2.CAP_PROP_FPS)
    delay = 1.0 / fps if fps > 0 else 1.0 / 16  # fallback to 16 fps

    try:
        while True:
            start = time.time()
            ret, frame = cap.read()
            if not ret:
                break

            pil_image = frame_to_pil(frame)
            ascii_output = textify(pil_image)

            os.system('cls' if os.name == 'nt' else 'clear')
            print(f'समय : {time.time() - START}')
            print(ascii_output)
            print('Press Ctrl+C to stop.')

            elapsed = time.time() - start
            time.sleep(max(0, delay - elapsed))

    except KeyboardInterrupt:
        print("Stopped.")
    finally:
        cap.release()

    
charset =  " `.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@"[::-1]
weights = scatter_weights(len(charset))

