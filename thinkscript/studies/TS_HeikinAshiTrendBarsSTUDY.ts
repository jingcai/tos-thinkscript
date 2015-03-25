# TS_HeikinAshiTrendBars
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 12 SEP 2009

def haclose = (open + high + low + close) / 4;
rec haopen = CompoundValue(1, (haopen[1] + haclose[1]) / 2, (open[1] + close[1]) / 2);
def diff = haclose - haopen;

plot nullPlot = double.nan;
assignPriceColor(if diff>=0 then color.green else color.red);
