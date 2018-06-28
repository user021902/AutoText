#!/bin/sh
# Example: ./autotext.sh "hell message" "Teddy Ni"
# first input: text
# second input: contact
osascript -e 'tell application "Messages" to send "'"$1"'" to buddy "'"$2"'"'
