#!/usr/bin/env python2
# Script to scrape HTML site and emit db commands
# Written by McKay Davis

import sys
import re
import urllib2
import StringIO
import lxml
from lxml import etree
from copy import deepcopy
import string


def main(argv):
    url = "http://hfbf.org/market/kailua-night-weekly-tip-sheet/"
    if len(argv) > 1:
        url = sys.argv[1]

    html = ""

    if not url.lower().startswith("http"):
        with open(url, "r") as f:
            html = f.read()
    else:
        html = load_remote_string(url)

    if not html:
        return -1

    xml_tree = parse_html_to_xml_tree(html)
    lines = get_lines(xml_tree)
    lines = fix_lines_typos(lines)
    cmds = parse_lines_into_db_cmds(lines)
    print "\n".join(cmds)
    return 0


def load_remote_string(url):
    response = urllib2.urlopen(url)
    stringio = StringIO.StringIO(response.read())
    filedata = stringio.getvalue()
    #filedata = filedata.encode('utf-8')
    stringio.close()
    return filedata


def parse_html_to_xml_tree(txt):
    parser = lxml.etree.HTMLParser()
    tree = lxml.etree.fromstring(txt, parser)
    return tree


def logger(msg):
    sys.stderr.write("{}\n".format(msg))


def emit(msg):
    sys.stdout.write("{}\n".format(msg))


# collapse an xml element
def collapse(e, append_tail=False):
    txt = ""
    if e.text is not None:
        txt += e.text

    for i in e.iterchildren():
        txt = txt + collapse(i, True).text

    tail = ""
    if e.tail:
        tail += e.tail

    if append_tail:
        txt = txt + tail
        tail = None

    attrib = deepcopy(e.attrib)  # .iteritems() }
    e.clear()
    for k, v in attrib.items():
        e.set(k, v)

    # e.attrib = attrib
    e.text = txt
    e.tail = tail
    return e


def xlat_utf8(txt):
    # replace non-breaking hyphen and non-breaking space with ascii equiv
    txt = txt.encode('utf-8')
    txt = txt.replace("\uA0", " ")
    txt = txt.replace('\u2011', '-')
    txt = txt.replace("\xe2", "'")
    txt = txt.replace("NEW ", "")
    txt = filter(lambda x: x in string.printable, txt)
    return txt


def fix_line_typos(line):
    line = line.replace("Otsuji Farm ", "Otsuji Farm: ")
    line = line.replace("Hibachi ", "Hibachi: ")
    line = line.replace("Pit Farm ", "Pit Farm: ")
    line = line.replace("Grandma G'", "Grandma G's:")
    return line


def fix_lines_typos(lines):
    return [fix_line_typos(line) for line in lines]


def get_lines(etree):
    elems = etree.xpath("/html/body//article/div")
    #elems = [collapse(e) for e in elems[0].iterchildren()]
    elems = [e for e in elems[0].iterchildren()]
    elems = [collapse(e) for e in elems]
    txt = [e.text for e in elems]
    txt = ["" if t is None else t for t in txt]
    txt = [xlat_utf8(t) for t in txt]
    txt = [t.strip() for t in txt]
    txt = [t for t in txt if t]
    return txt


def parse_lines_into_db_cmds(lines):

    booth_tmpl = "market_vendor.first.update(booth_location: \"{}\")"
    marketvendor_tmpl = ["market_vendor = MarketVendor.where(market_id: market.first.id, vendor_id: vendor.first.id)",
                         "if market_vendor.first then",
                         "  " + booth_tmpl,
                         "else",
                         "  market_vendor = MarketVendor.create(market_id: market.first.id, vendor_id: vendor.first.id, booth_location: \"{}\")",
                         "end"]
    marketvendor_tmpl = "\n".join(marketvendor_tmpl)

    vendor_tmpl = "vendor = Vendor.where(name: \"{}\")"
    desc_tmpl = "if vendor.first then\nvendor.first.update(description: \"{}\")\nend"



    emit('market=Market.where(name: "Kailua Thursday Night Market")')

    row = None
    num = 0
    cmds = []
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

        cmds.append(vendor_tmpl.format(vendor))
        cmds.append(desc_tmpl.format(desc))
        cmds.append(marketvendor_tmpl.format(boothid, boothid))
        cmds.append("")

    return cmds


if __name__ == "__main__":
    sys.exit(main(sys.argv))
