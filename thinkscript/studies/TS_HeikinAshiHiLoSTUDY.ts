# TS_HeikinAshiHiLo
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 16 Aug 2009

def haclose = (open + high + low + close) / 4;
rec haopen = CompoundValue(1, (haopen[1] + haclose[1]) / 2, (open[1] + close[1]) / 2);
def diff = haclose - haopen;

rec HAH = if diff > 0 then high else HAH[1];
rec HAL = if diff < 0 then low else HAL[1];

plot HeikinAshiHigh = HAH;
HeikinAshiHigh.setStyle(curve.points);
HeikinAshiHigh.setlineWeight(1);
HeikinAshiHigh.setDefaultColor(color.red);

plot HeikinAshiLow = HAL;
HeikinAshiLow.setStyle(curve.points);
HeikinAshiLow.setlineWeight(1);
HeikinAshiLow.setDefaultColor(color.blue);
