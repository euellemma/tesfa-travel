#! /bin/bash

for i in {4..10}
do
	echo "[*] Starting U$i.mp4"
	ffmpeg -i "U$i.mp4" -vf scale=1280:720 -c:v libx264 -crf 28 -c:a aac -b:a 96K "U$i-720.mp4";
	echo "video $i done" >> compress.log;
done

