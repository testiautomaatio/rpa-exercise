#!/bin/bash

if find . -type f -name "$1" -print -quit | grep -q .; then
    echo "File '$1' was found"
else
    echo "File '$1' was not found"
    exit 1
fi
