#!/bin/bash

MARICOPA="$HOME/.maricopa"
CONFIG="$MARICOPA/config"

mkdir -p $MARICOPA
mkdir -p $MARICOPA/_schedule
mkdir -p $CONFIG
touch    $CONFIG/schedule.csv
touch $MARICOPA/_schedule/schedule.json

if [ -z "$(cat $CONFIG/schedule.csv)" ]; then
    echo "name,start,end,beats" >> "$CONFIG/schedule.csv"
fi