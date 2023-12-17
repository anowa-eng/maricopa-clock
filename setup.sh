MARICOPA="~/.maricopa"
CONFIG="$MARICOPA/config"

mkdir -p $CONFIG
touch    $CONFIG/schedule.csv

if [[ -z "$(cat $CONFIG/schedule.csv)" ]]; then
    echo "name,start,end,beats" >> "$CONFIG/schedule.csv"
fi
