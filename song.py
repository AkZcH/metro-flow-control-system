import time
import datetime
import pygame
import os

# === CONFIGURATION ===
# Full path to the song file (MP3 or WAV)
SONG_PATH = "C:/Users/KIIT0001/Downloads/9 45-(PagalWorld) (1).mp3"
# Set the target time in 24-hour format: "HH:MM"
ALARM_TIME = "08:42"

# === INITIALIZATION ===
pygame.mixer.init()

def play_song():
    if os.path.exists(SONG_PATH):
        pygame.mixer.music.load(SONG_PATH)
        pygame.mixer.music.play()
        print(f"🎵 Playing song: {SONG_PATH}")
        while pygame.mixer.music.get_busy():
            time.sleep(1)
    else:
        print("🚫 Song file not found.")

def main():
    print(f"⏰ Alarm set for {ALARM_TIME}. Waiting...")
    while True:
        now = datetime.datetime.now().strftime("%H:%M")
        if now == ALARM_TIME:
            play_song()
            break
        time.sleep(10)

if __name__ == "__main__":
    main()


