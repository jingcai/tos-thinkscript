# TS_TRADEZONES
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 30 JUN 2009

declare fullrange;
input zoneStart = 1500;
input zoneEnd = 1615;
input type = {default NOTRADE, REVERSAL};
plot highBar;
plot lowBar;

switch (type){

case NOTRADE:
highBar = if secondsTillTime(zoneStart) <= 0 and secondsTillTime(zoneEnd) >= 0 then highestAll(high) else double.nan;
lowBar = if secondsTillTime(zoneStart) <= 0 and secondsTillTime(zoneEnd) >= 0 then lowestAll(low) else double.nan;
case REVERSAL:
lowBar = if secondsTillTime(zoneStart) <= 0 and secondsTillTime(zoneEnd) >= 0 then highestAll(high) else double.nan;
highBar = if secondsTillTime(zoneStart) <= 0 and secondsTillTime(zoneEnd) >= 0 then lowestAll(low) else double.nan;
}
highBar.assignValueColor(if highBar>lowBar then color.dark_red else color.green);
lowBar.assignValueColor(if highBar>lowBar then color.dark_red else color.green);
addCloud(lowBar, highBar);


