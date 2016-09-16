#!/usr/bin/env python3

import sys
import re

txt = sys.stdin.read()


def logger(msg):
    sys.stderr.write("{}\n".format(msg))

txt = txt.replace("’", "'")
lines = txt.split("\n")
lines = [line.strip() for line in lines]
lines = [line for line in lines if len(line)]

row = None
num = 0
tmpl = "MarketVendor.where(market_id: {}, vendor_id: Vendor.where(name: \"{}\").select(\"id\")).first.update(booth_location: \"{}\")"

market_id = 61

for line in lines:
    parserow = re.findall(" Row ([A-Za-z]+)|(Lawn) ", line)
    if parserow:
        row = parserow[0][0] if parserow[0][0] else parserow[0][1]
        num = 0
        continue

    if not row:
        continue

    parts = line.split(":", 1)
    if len(parts) != 2:
        logger("Can't parse {}".format(line))
        continue
    vendor, desc = parts

    num += 1
    boothid = "{}{}".format(row, num)

    txt = tmpl.format(market_id, vendor, boothid)
    print(txt)
