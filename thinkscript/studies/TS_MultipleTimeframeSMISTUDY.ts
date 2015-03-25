# TS_MultipleTimeframeSMI
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 27 Mar 2010

# FIT STUDIES TO SCREEN OPTION MUST BE DISABLED !!!!!!

input percentDLength = 3;
input percentKLength = 5;
input higherTimeFrame1Multiplier = 2;
input higherTimeFrame2Multiplier = 8;
input sellThreshold = 75;
input buyThreshold = 25;

rec htf1_h = compoundValue(1, if barNumber() / higherTimeFrame1Multiplier == Ceil(barNumber() / higherTimeFrame1Multiplier) then Highest(high, higherTimeFrame1Multiplier) else htf1_h[1], high);
rec htf1_l = compoundValue(1, if barNumber() / higherTimeFrame1Multiplier == Ceil(barNumber() / higherTimeFrame1Multiplier) then Lowest(low, higherTimeFrame1Multiplier) else htf1_l[1], low);
rec htf1_c = compoundValue(1, if barNumber() / higherTimeFrame1Multiplier == Ceil(barNumber() / higherTimeFrame1Multiplier) then close else htf1_c[1], close);

rec htf2_h = compoundValue(1, if barNumber() / higherTimeFrame2Multiplier == Ceil(barNumber() / higherTimeFrame2Multiplier) then Highest(high, higherTimeFrame2Multiplier) else htf2_h[1], high);
rec htf2_l = compoundValue(1, if barNumber() / higherTimeFrame2Multiplier == Ceil(barNumber() / higherTimeFrame2Multiplier) then Lowest(low, higherTimeFrame2Multiplier) else htf2_l[1], low);
rec htf2_c = compoundValue(1, if barNumber() / higherTimeFrame2Multiplier == Ceil(barNumber() / higherTimeFrame2Multiplier) then close else htf2_c[1], close);

def min_low = Lowest(low, percentKLength);
def max_high = Highest(high, percentKLength);
def rel_diff = close - (max_high + min_low) / 2;
def diff = max_high - min_low;
def avgrel = ExpAverage(ExpAverage(rel_diff, percentDLength), percentDLength);
def avgdiff = ExpAverage(ExpAverage(diff, percentDLength), percentDLength);
def SMI = (avgrel / (avgdiff / 2) + 1) * 50;

def min_low1 = Lowest(htf1_l, percentKLength * higherTimeFrame1Multiplier);
def max_high1 = Highest(htf1_h, percentKLength * higherTimeFrame1Multiplier);
def rel_diff1 = htf1_c - (max_high1 + min_low1) / 2;
def diff1 = max_high1 - min_low1;
def avgrel1 = ExpAverage(ExpAverage(rel_diff1, percentDLength * higherTimeFrame1Multiplier), percentDLength * higherTimeFrame1Multiplier);
def avgdiff1 = ExpAverage(ExpAverage(diff1, percentDLength * higherTimeFrame1Multiplier), percentDLength * higherTimeFrame1Multiplier);
def HTF1SMI = (avgrel1 / (avgdiff1 / 2) + 1) * 50;

def min_low2 = Lowest(htf2_l, percentKLength * higherTimeFrame2Multiplier);
def max_high2 = Highest(htf2_h, percentKLength * higherTimeFrame2Multiplier);
def rel_diff2 = htf2_c - (max_high2 + min_low2) / 2;
def diff2 = max_high2 - min_low2;
def avgrel2 = ExpAverage(ExpAverage(rel_diff2, percentDLength * higherTimeFrame2Multiplier), percentDLength * higherTimeFrame2Multiplier);
def avgdiff2 = ExpAverage(ExpAverage(diff2, percentDLength * higherTimeFrame2Multiplier), percentDLength * higherTimeFrame2Multiplier);
def HTF2SMI = (avgrel2 / (avgdiff2 / 2) + 1) * 50;

def sell = if SMI > sellThreshold and HTF1SMI > sellThreshold and HTF2SMI > sellThreshold then 1 else 0;
def buy = if  SMI < buyThreshold and HTF1SMI < buyThreshold and HTF2SMI < buyThreshold then 1 else 0;

rec sellPoint = compoundValue(1, if sell then high else if !buy then sellPoint[1] else double.nan, double.nan); 
rec buyPoint = compoundValue(1, if buy then low else if !sell then buyPoint[1] else double.nan, double.nan);

def lowPoint = 0.01;
def highPoint = 99999.0;

plot signalU = if buy or buy[1] then highPoint else if sell or sell[1] then lowPoint else double.nan;
plot signalL = if buy or buy[1] then lowPoint else if sell or sell[1] then highPoint else double.nan;

addCloud(signalL, signalU, color.red, color.green);