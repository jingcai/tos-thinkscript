# TS_ValueChartDivergence
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 24 Oct 2010

#hint: Displays Value Chart/Price action divergences as arrows.
#hint length: The number of periods used with the associated Value Chart
#hint filterOutSignalsBelow: Threshold required on the Value Chart peaks for divergence signal to be diplayed. The higher the number the more signals that will be filtered out.

input length = 5;
input filterOutSignalsBelow = 6;

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

def h = relativeHigh;
def l = relativeLow;

def sellDivergence = if high > high[1] and relativeHigh < relativeHigh[1] and relativeHigh[1] > filterOutSignalsBelow then 1 else 0;
def buyDivergence = if low < low[1] and relativeLow > relativeLow[1] and relativeLow[1] < -filterOutSignalsBelow then 1 else 0;

def hiddenDivergenceUp = if low > low[1] and relativeLow < relativeLow[1] then 1 else 0;
def hiddenDivergenceDown = if high < high[1] and relativeHigh > relativeHigh[1] then 1 else 0;

plot upArrow = if buyDivergence then low else double.nan;
upArrow.SetPaintingStrategy(paintingStrategy.BOOLEAN_ARROW_UP);
upArrow.SetDefaultColor(color.green);
upArrow.SetLineWeight(3);

plot downArrow = if sellDivergence then high else double.nan;
downArrow.SetPaintingStrategy(paintingStrategy.BOOLEAN_ARROW_DOWN);
downArrow.SetDefaultColor(color.red);
downArrow.SetLineWeight(3);

plot continuationDown = if hiddenDivergenceDown then high else double.nan;
continuationDown.SetPaintingStrategy(paintingStrategy.BOOLEAN_ARROW_DOWN);
continuationDown.SetDefaultColor(color.white);
continuationDown.SetLineWeight(1);
continuationDown.hide();


plot continuationUp = if hiddenDivergenceUp then low else double.nan;
continuationUp.SetPaintingStrategy(paintingStrategy.BOOLEAN_ARROW_UP);
continuationUp.SetDefaultColor(color.white);
continuationUp.SetLineWeight(1);
continuationUp.hide();