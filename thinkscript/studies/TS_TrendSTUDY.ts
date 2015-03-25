# TS_Trend (Modified Heikin-Ashi Trend)
# (c) 2010 http://www.thinkscripter.com 
# All rights reserved
# thinkscripter@gmail.com
# Last Update 27 June 2010

defineGlobalColor("TrendUp", color.blue);
defineGlobalColor("ReversalDownInsideBar", color.cyan);
defineGlobalColor("TrendDown", color.dark_red);
defineGlobalColor("ReversalUpInsideBar", color.red);

input insideBarFilterLength = 6;
input showInsideBarAltColor = NO;

def haclose = (open + high + low + close) / 4;
rec haopen = CompoundValue(1, (haopen[1] + haclose[1]) / 2, (open[1] + close[1]) / 2);
def cColor = if haclose - haopen > 0 then 1 else 0;

rec color = fold index2 = 1 to insideBarFilterLength with barsBack2 = cColor do 
if haOpen<= max(getValue(haOpen, index2, insideBarFilterLength),getValue(haClose, index2, insideBarFilterLength)) 
and
haOpen>= min(getValue(haOpen, index2, insideBarFilterLength),getValue(haClose, index2, insideBarFilterLength))
and
haClose<= max(getValue(haOpen, index2, insideBarFilterLength),getValue(haClose, index2, insideBarFilterLength)) 
and
haClose>= min(getValue(haOpen, index2, insideBarFilterLength),getValue(haClose, index2, insideBarFilterLength))
then getValue(color,index2,insideBarFilterLength) else barsBack2; 

assignPriceColor(if showInsideBarAltColor and cColor != color then if cColor == 0 then globalColor("ReversalDownInsideBar") else globalColor("ReversalUpInsideBar") else if color then globalColor("TrendUp") else globalColor("TrendDown"));

