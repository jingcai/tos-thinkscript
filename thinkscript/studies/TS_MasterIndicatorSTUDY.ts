# TS_MasterIndicator
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# (c) 2009 ThinkScripter.com
# Last Update 17 Jan 2008

declare lower;

input MainCCI = 14;
input CCI2 = 50;
input CCI3 = 5;
input stop = 1.5;
input LSMAlength = 34;

def BollingerDeviations = 2.0;
def BollingerLength = 20.0;
def KeltnerFactor = 1.5;
def KeltnerLength = 20;
def price = close;
def ATR = AvgTrueRange(high, close, low);
def EMA = ExpAverage(close, 34);
input centerLineMethod = {default LSMASlope, LSMADelta};
 
plot VolCautionU = if !IsNaN(close) then if ATR > stop then 100 else double.nan else double.nan;
VolCautionU.SetStyle(curve.POINTS);
VolCautionU.SetDefaultColor(color.magenta);

plot VolCautionL = if !IsNaN(close) then if ATR > stop then -100 else double.nan else double.nan;
VolCautionL.SetStyle(curve.POINTS);
VolCautionL.SetDefaultColor(color.magenta);

def over_bought = 80;
def over_sold = 20;
def KPeriod1 = 5;
def DPeriod1 = 2;
def smoothingType1 = 2;
def slowing_period1 = 2;
def KPeriod2 = 17;
def DPeriod2 = 3;
def smoothingType2 = 2;
def slowing_period2 = 5;
def KPeriod3 = 89;
def DPeriod3 = 3;
def smoothingType3 = 2;
def slowing_period3 =5;


def priceH = high;
def priceL = low;
def priceC = close;
def lastBar = if (isNan(close), 1, 0);

def stoch1 = StochasticFull(over_bought,over_sold,KPeriod1,DPeriod1,priceH,priceL,priceC,slowing_Period1,smoothingType1).fullk;
def stoch2 = StochasticFull(over_bought,over_sold,KPeriod2,DPeriod2,priceH,priceL,priceC,slowing_Period2,smoothingType2).fullk;
def stoch3 = StochasticFull(over_bought,over_sold,KPeriod3,DPeriod3,priceH,priceL,priceC,slowing_Period3,smoothingType3).fullk;
def allConditionsSell = if(stoch1>over_bought and stoch2>over_bought and stoch3>over_bought, 1,0);
def allConditionsBuy = if(stoch1<over_sold and stoch2<over_sold and stoch3<over_sold, 1,0);

def stoch4D  = StochasticFull(over_bought,over_sold,5,5,priceH,priceL,priceC,3,1).fulld-50; 
def stoch4K  = StochasticFull(over_bought,over_sold,5,5,priceH,priceL,priceC,3,1).fullk-50; 

plot Stoch = stoch4D*4;
Stoch.setLineWeight(3);
Stoch.setdefaultColor(color.magenta);

def Sbuy = if(stoch4K[-1] > stoch4D[-1] and stoch4K < stoch4D, 1,0);
def Ssell = if(stoch4K[-1] < stoch4D[-1] and stoch4K > stoch4D, 1,0);

plot CCI_Main = CCI("length" = MainCCI, "over_bought" = 100, "over_sold" = -100);
plot CCI_2 = CCI("length" = CCI2, "over_bought" = 100, "over_sold" = -100);
plot CCI_3 = CCI("length" = CCI3, "over_bought" = 100, "over_sold" = -100);

def BolKelDelta = reference BollingerBandsSMA("num_dev_up" = BollingerDeviations, "length" = BollingerLength )."upperband" - reference KeltnerChannels("factor" = KeltnerFactor, "length" = KeltnerLength)."Upper_Band";

def LinReg = Inertia(hlc3, LSMAlength);
def slope = linreg - linreg[1];
def slopeBuffer = AbsValue(averageTrueRange(12) / 12);

CCI_Main.SetPaintingStrategy(paintingStrategy.HISTOGRAM);
CCI_Main.SetDefaultColor(color.red);
CCI_2.SetDefaultColor(color.green);
CCI_3.SetDefaultColor(color.DARK_ORANGE);

plot Plus100 = 100;
Plus100.SetDefaultColor(color.daRK_GRAY);
Plus100.SetStyle(curve.SHORT_DASH);

plot Minus100 = -100;
Minus100.SetDefaultColor(color.DARK_gray);
Minus100.SetStyle(curve.SHORT_DASH);

plot Plus200 = 200;
Plus200.SetDefaultColor(color.daRK_RED);
Plus200.SetStyle(curve.SHORT_DASH);

plot Minus200 = -200;
Minus200.SetDefaultColor(color.DARK_green);
Minus200.SetStyle(curve.SHORT_DASH);

plot squeezeU = if(IsNaN(close), double.nan, if( bolKelDelta < 0, 200, double.nan));
squeezeU.AssignValueColor(Color.Red);
squeezeU.SetPaintingStrategy(PaintingStrategy.POINTS);
squeezeU.SetLineWeight(1);

plot squeezeL = if(IsNaN(close), double.nan, if( bolKelDelta < 0, -200, double.nan));
squeezeL.AssignValueColor(Color.Red);
squeezeL.SetPaintingStrategy(PaintingStrategy.POINTS);
squeezeL.SetLineWeight(1);

plot Zero = 0;
zero.AssignValueColor(if !IsNaN(close) then if centerLineMethod then if close < LinReg then color.red else color.green else if slope < -slopeBuffer then color.red else if slope > slopeBuffer then color.green else color.gray else color.gray);
Zero.SetLineWeight(2);

plot CCILine = CCI_Main;
CCILine.AssignValueColor(color.white);
CCILine.SetLineWeight(2);

plot Avg = wma(wma(CCI_Main, 14), 3);
Avg.SetDefaultColor(color.cyan);
Avg.SetLineWeight(2);
Avg.hide();

plot AllConditions = if !lastBar then if allConditionsBuy or allConditionsSell then CCI_Main else Double.Nan else double.nan;
def dotcolor5 = if(allConditionsBuy, 6, if(allConditionsSell, 5,0));

AllConditions.setDefaultColor(color.yellow);
AllConditions.setStyle(curve.points);
AllConditions.setPaintingStrategy(paintingStrategy.LINE_VS_TRIANGLES);
AllConditions.setLineWeight(1);

plot StochBS = if !IsNaN(close[-1]) then if Sbuy or ssell then stoch else double.nan else double.nan;
StochBS.setStyle(curve.points);
StochBS.setLineWeight(5);
StochBS.assignValueColor(if Sbuy then color.blue else color.red);


