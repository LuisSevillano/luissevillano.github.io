#!/usr/bin/env bash

INPUT="$1"
OUTPUT="${2:-output.jpg}"

magick "$INPUT" \
  -resize 1500x \
  -strip \
  -interlace Plane \
  -sampling-factor 4:2:0 \
  -quality 75 \
  -colorspace sRGB \
  "$OUTPUT"