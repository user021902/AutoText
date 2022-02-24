#!/bin/sh
# Example: ./autotext.sh "hello this is a message" "Alex Danilowicz"
# first input: text
# second input: contact
osascript -e 'tell application "Messages" to send "'"$1"'" to buddy "'"$2"'"'

