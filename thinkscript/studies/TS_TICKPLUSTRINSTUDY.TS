# TICKPLUSTRIN
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 05 Aug 2009

declare lower;

input highExtreme = 1000;
input LowExtreme = -1200;
input emaPeriod = 2;
input wideRangeThreshold = 1600;
input bar_coloring = {default EMA, EMA_TREND};
input colorWideRangeBars = YES;
input trinMethodology = {default SMA_Slope, Trend};

def tick_h =  high("$TICK");
def tick_l = low("$TICK");
def tick_c = close("$TICK");
def tickAve = ExpAverage((tick_h + tick_l + tick_c) / 3, emaPeriod);
def tickAve9 = MovAvgWeighted((tick_h + tick_l + tick_c) / 3, 9, 0);
def extremeBar = if AbsValue(tick_h - tick_l) > wideRangeThreshold then 1 else 0;
def comparator = if bar_coloring then tickAve9[1] else 0; 

def barColor = if !extremeBar and tickAve9 > comparator then 6 else if extremeBar  and colorWideRangeBars then 0 else 5;

plot HT = tick_h;
HT.SetPaintingStrategy(paintingStrategy.HISTOGRAM);
HT.AssignValueColor(GetColor(barColor));
HT.SetLineWeight(3);

plot LT = tick_l;
LT.AssignValueColor(GetColor(barColor));
LT.SetPaintingStrategy(paintingStrategy.HISTOGRAM);
LT.SetLineWeight(3);

plot backGround = if tick_l > 0 then tick_l else if tick_h < 0 then tick_h else double.nan;
backGround.SetPaintingStrategy(paintingStrategy.HISTOGRAM);
backGround.SetDefaultColor(color.black);
backGround.SetLineWeight(3); 

def newDay = if(getDay() > getDay()[1], 1, 0);
rec highTick = if(!newDAy and tick_h > highTick[1], tick_h, if(IsNaN(tick_h) or newDAy, 0, highTick[1]));
rec lowTick = if(!newday and tick_l < lowTick[1], tick_l, if(IsNaN(tick_l) or NewDay, 0, lowTick[1]));

plot HighestTick = highTick;
HighestTick.SetStyle(curve.SHORT_DASH);
plot LowestTick = lowTick;
LowestTick.SetStyle(curve.SHORT_DASH);
HighestTick.SetDefaultColor(color.red);
LowestTick.SetDefaultColor(color.green);
HighestTick.SetLineWeight(1);
LowestTick.SetLineWeight(1);

plot zero = 0;
zero.SetDefaultColor(color.white);

plot midH = 600;
midH.SetDefaultColor(color.darK_GRAY);

plot midL = -600;
midL.SetDefaultColor(color.darK_GRAY);

plot extH = highExtreme;
extH.SetDefaultColor(color.red);

plot extL = LowExtreme;
extL.SetDefaultColor(color.green);

plot tickClose = tick_c;
tickClose.SetStyle(curve.POINTS);
tickClose.SetDefaultColor(color.white);

plot EMA = tickAve;
EMA.SetDefaultColor(color.yellow);
EMA.SetLineWeight(2);

plot EMA9 = tickAve9;
EMA9.SetDefaultColor(color.white);
EMA9.SetLineWeight(3);

plot extreme = if(tick_h > highExtreme, tick_h, if(tick_l < lowExtreme, tick_l, double.nan));
extreme.SetDefaultColor(color.yellow);
extreme.SetStyle(curve.POINTS);
extreme.SetPaintingStrategy(paintingStrategy.LINE_VS_TRIANGLES);

def trin_h =  high("$TRIN");
def trin_l = low("$TRIN");
def trin_c = close("$TRIN");

def secondBarClosed = if(IsNaN(trin_c[-2]), 0, 1);
def thirdBarClosed = if(IsNaN(trin_c[-3]), 0, 1);

def triggerDown = if(trin_c[-1] < trin_c, 1, 0);
def triggerUp = if(trin_c[-1] > trin_c, 1, 0);

def secondBarDownConfirmation = if(secondBarClosed and trin_c[-2] < trin_l[-1], 1, 0);
def secondBarUpConfirmation = if(secondBarClosed and trin_c[-2] > trin_h[-1], 1, 0);

def thirdBarDownConfirmation = if(thirdBarClosed and trin_c[-3] < trin_l[-1], 1, 0);
def thirdBarUpConfirmation = if(thirdBarClosed and trin_c[-3] > trin_h[-1], 1, 0);

def Sell = if(triggerDown and (secondBarDownConfirmation  or thirdBarDownConfirmation), 1, 0);
def Buy = if(triggerUp and (secondBarUpConfirmation or thirdBarUpConfirmation), 1, 0);

rec upDownSwitch = if(Sell, 1, if(Buy, 0, upDownSwitch[1]));
 
def trinAve = Average(trin_c, 3);
def slope = if(trinAve > trinAve[1], 1, 0);
def trinColor = if(trinMethodology, if(upDownSwitch[1], 6, 5), if(slope, 5, 6));
plot trinLine = if(!isNan(close),0, double.nan);
trinLine.AssignValueColor(GetColor(trinColor));
trinLine.SetLineWeight(5);
