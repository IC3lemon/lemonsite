from oops import *
import msvcrt

last_rendered = ""

def clear():
    os.system('cls' if os.name == 'nt' else 'clear')

def menu():
    options = ["video to ascii", "image to ascii", "stream to ascii"]
    selected = 0

    while True:
        clear()
        print("\n\t\t\t\t\t\033[96mMENU\033[0m\n")
        print("#" * 90 + "\n")

        for i, option in enumerate(options):
            if i == selected:
                print(f"\t\t\033[92m> {option.upper()} <\033[0m")
            else:
                print(f"\t\t  {option}")

        print("\n" + "#" * 90)
        print("\nUse ↑ ↓ arrows. Press Enter to select.")
        print("Press \033[91mX\033[0m to exit")

        key = msvcrt.getch()
        if key in b'xX':
            os.system('cls')
            return 'quit'

        if key in b'wW':
            selected = (selected - 1) % len(options)
        if key in b'sS':
            selected = (selected + 1) % len(options)

        if key == b'\xe0':
            arrow = msvcrt.getch()
            if arrow == b'H':  # Up
                selected = (selected - 1) % len(options)
            elif arrow == b'P':  # Down
                selected = (selected + 1) % len(options)
        elif key == b'\r':  # Enter
            return options[selected]

if __name__ == "__main__":
    while True:
        choice = menu()
        print(f"\nselected: \033[93m{choice}\033[0m\n")
        # stream_webcam_to_ascii()
        os.system('cls')
        if choice == 'stream to ascii':
            os.system('cls')
            last_rendered = stream_webcam_to_ascii()
            os.system('cls')
        elif choice == 'image to ascii':
            os.system('cls')
            path = input('Enter image path : ')
            last_rendered = image_to_ascii(path)
            if path == '':
                path = 'C:\\Users\\madha\\Oopscii\\images\\alrighty.jpg'
            os.system('cls')
            print(f"rendering : \033[93m{path}\033[0m")
            print(last_rendered)
            print("Press \033[91mX\033[0m to exit")
            while True:
                key = msvcrt.getch()
                if key in b'xX':
                    os.system('cls')
                    break

        elif choice == "video to ascii":
            os.system('cls')
            path = input('Enter video path : ')
            last_rendered = video_to_ascii(path)
            if path == '':
                path = 'C:\\Users\\madha\\Oopscii\\images\\chainsaw.mp4'
            os.system('cls')
            print(f"rendering : \033[93m{path}\033[0m")
            print(last_rendered)
            print("Press \033[91mX\033[0m to exit")
            while True:
                key = msvcrt.getch()
                if key in b'xX':
                    os.system('cls')
                    break
                
        elif choice == "quit":
            os.system('cls')
            break
    print('\033[93mlast rendered . . .\033[0m')
    print(last_rendered)

