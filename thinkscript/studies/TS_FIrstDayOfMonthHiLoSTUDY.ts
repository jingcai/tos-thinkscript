# TS_FirstDayOfMonthHiLo
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 08 JUL 09

def newMonth = if getMonth()!= getMOnth()[1] then 1 else 0;
rec mH = compoundValue(1, if newMonth then high else mH[1], high);
rec mL = compoundValue(1, if newMonth then low else mL[1], low);

plot monthHigh = mH;
plot monthLow = mL;

monthHigh.setDefaultColor(color.green);
monthLow.setDefaultColor(color.red);
monthHigh.setLineWeight(2);
monthLow.setLineWeight(2);
