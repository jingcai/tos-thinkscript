# VALUECHART
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 20 June 2010

declare lower;

input length = 5;
input capSpikesAt = 10;

def VarP = round(length / 5);
def VarA = Highest(high, VarP) - Lowest(low, VarP);
def VarR1 = if VarA == 0 and VarP == 1 then AbsValue(close - close[VarP]) else VarA;
def VarB = Highest(high, VarP)[VarP + 1] - Lowest(low, VarP)[VarP];
def VarR2 = If VarB == 0 and VarP == 1 then AbsValue(close[VarP] - close[VarP * 2]) else VarB;
def VarC = Highest(high, VarP)[VarP * 2] - Lowest(low, VarP)[VarP * 2];
def VarR3 = If VarC == 0 and VarP == 1 then AbsValue(close[VarP * 2] - close[VarP * 3]) else VarC;
def VarD = Highest(high, VarP)[VarP * 3] - Lowest(low, VarP)[VarP * 3];
def VarR4 =
If VarD == 0 and VarP == 1 then AbsValue(close[VarP * 3] - close[VarP * 4]) else VarD;
def VarE = Highest(high, VarP)[VarP * 4] - Lowest(low, VarP)[VarP * 4];
def VarR5 = If VarE == 0 and VarP == 1 then AbsValue(close[VarP * 4] - close[VarP * 5]) else VarE;
def LRange = ((VarR1 + VarR2 + VarR3 + VarR4 + VarR5) / 5) * 0.2;

def Var0 = if AbsValue(close - close[1]) > (high - low) then AbsValue(close - close[1]) else (high - low);
def LRange2 = if high == low then Average(AbsValue(close - close[1]), 5) * 0.2 else Average(Var0, 5) * 0.2;

def range = high + low;
def delta = high - low;
def median = range / 2;
def floatingAxis = Average(median, length);
def dynamicVolatilityUnit = if length <= 7 then LRange2 else LRange;
def relativeHigh = (high - floatingAxis) / dynamicVolatilityUnit;
def relativeLow = (low - floatingAxis) / dynamicVolatilityUnit;
def relativeOpen = (open - floatingAxis) / dynamicVolatilityUnit;
def relativeClose = (close - floatingAxis) / dynamicVolatilityUnit;

def _high = Min(relativeHigh, capSpikesAt);
def _low = Max(relativeLow, -capSpikesAt);

plot backgroundColor = if _low > 0 then _low else if _high < 0 then _high else double.nan;
backgroundColor.SetPaintingStrategy(paintingStrategy.HISTOGRAM);
backgroundColor.SetDefaultColor(color.black);
backgroundColor.SetLineWeight(2);


plot "High" = _high;
"High".SetPaintingStrategy(paintingStrategy.HISTOGRAM);
"High".AssignValueColor(if "High" >= 8 then GetColor(5) else GetColor(1));
"High".SetLineWeight(2);

plot "Low" = _low;
"Low".SetPaintingStrategy(paintingStrategy.HISTOGRAM);
"Low".AssignValueColor(if "Low" <= -8 then GetColor(6) else GetColor(1));
"Low".SetLineWeight(2);


plot "Open" = Min(AbsValue(relativeOpen), capSpikesAt) * relativeOpen / AbsValue(relativeOpen);
"Open".SetStyle(curve.POINTS);
"Open".SetLineWeight(1);
"Open".SetDefaultColor(color.white);
"Open".hide();

plot "Close" =  Min(AbsValue(relativeClose), capSpikesAt) * relativeClose / AbsValue(relativeClose);
"Close".SetStyle(curve.POINTS);
"Close".SetLineWeight(1);
"Close".AssignValueColor(if "Close" < "Open" then GetColor(5) else GetColor(6));
"Close".hide();

plot zero = 0;
zero.SetDefaultColor(color.white);

plot "Moderately O/B" = 4;
plot "Moderately O/S" = -4;
"Moderately O/B".SetDefaultColor(color.yellow);
"Moderately O/S".SetDefaultColor(color.yellow);
plot "Significantly O/B" = 8;
plot "Significantly O/S" = -8;
"Significantly O/B".SetDefaultColor(color.red);
"Significantly O/S".SetDefaultColor(color.red);