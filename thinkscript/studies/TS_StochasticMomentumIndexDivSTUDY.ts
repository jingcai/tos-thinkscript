# TS_StochasticMomentumIndexDivergence
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 01 Feb 2010

declare lower;

input over_bought = 80.0;
input over_sold = 20.0;
input percentDLength = 3;
input percentKLength = 5;

def min_low = Lowest(low, percentKLength);
def max_high = Highest(high, percentKLength);
def rel_diff = close - (max_high + min_low) / 2;
def diff = max_high - min_low;
def avgrel = ExpAverage(ExpAverage(rel_diff, percentDLength), percentDLength);
def avgdiff = ExpAverage(ExpAverage(diff, percentDLength), percentDLength);
def SMIData = (avgrel / (avgdiff / 2) + 1) * 50;

def isLow = if (SMIData < SMIData[-1] and SMIData < SMIData[1], 1, 0);
def isHigh =   if (SMIData > SMIData[-1] and SMIData > SMIData[1], 1, 0);

rec prevLowSMI = compoundValue(1,if(isLow[1], SMIData[1], prevLowSMI[1]),0);
rec prevHighSMI = compoundValue(1, if(isHigh[1], SMIData[1], prevHighSMI[1]),0);

rec prevLow =  compoundValue(1, if(isLow[1], low, prevLow[1]),low);
rec prevHigh =  compoundValue(1, if(isHigh[1], high, prevHigh[1]),high);

def positiveDivergenceReg = if (SMIData > prevLowSMI and low < prevLow, 1, 0);
def positiveDivergenceHid = if (SMIData < prevLowSMI and low > prevLow, 1, 0);

plot posDiv = if(isLow and (positiveDivergenceReg or positiveDivergenceHid), SMIData, Double.Nan);
posDiv.assignValueColor(if positiveDivergenceReg then color.green else color.white);
posDiv.setPaintingStrategy(paintingStrategy.ARROW_UP);
posDiv.SetLineWeight(2);

def negativeDivergenceReg =  if (SMIData < prevHighSMI and high > prevHigh, 1, 0);
def negativeDivergenceHid = if (SMIData > prevHighSMI and high < prevHigh, 1, 0);

plot negDiv = if(isHigh and ( negativeDivergenceReg or negativeDivergenceHid), SMIData, Double.Nan);
negDiv.setPaintingStrategy(paintingStrategy.ARROW_DOWN);
negDiv.assignValueColor(if negativeDivergenceReg then color.red else color.white);
negDiv.SetLineWeight(2);

plot AvgSMI = ExpAverage(smiData, percentDLength);
avgsmi.SetDefaultColor(color.GRAY);

plot overbought = over_bought;
overbought.SetDefaultColor(color.DARK_RED);
overbought.SetStyle(curve.SHORT_DASH);

plot oversold = over_sold;
oversold.SetDefaultColor(color.DARK_GREEN);
oversold.SetStyle(curve.Short_dash);

plot SMI = SMIData;
smi.assignValueColor(if SMI>SMI[1] then color.green else color.red);
smi.setLineWeight(2);

