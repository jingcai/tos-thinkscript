# TS_StochasticMomentumIndexSignals
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 23 May 2010

input over_bought = 70.0;
input over_sold = 30.0;
input percentDLength = 3;
input percentKLength = 5;

def min_low = Lowest(low, percentKLength);
def max_high = Highest(high, percentKLength);
def rel_diff = close - (max_high + min_low) / 2;
def diff = max_high - min_low;
def avgrel = ExpAverage(ExpAverage(rel_diff, percentDLength), percentDLength);
def avgdiff = ExpAverage(ExpAverage(diff, percentDLength), percentDLength);

def SMI = (avgrel / (avgdiff / 2) + 1) * 50;
def AvgSMI = ExpAverage(SMI, percentDLength);

plot buy = if SMI > AvgSMI and SMI[1]<=AvgSMI[1] and SMI < over_sold then low else double.nan;
buy.setLineWeight(5);
buy.setDefaultColor(color.green);
buy.setPaintingStrategy(paintingStrategy.BOOLEAN_ARROW_UP);

plot sell = if SMI < AvgSMI and SMI[1]>=AvgSMI[1] and SMI > over_bought then high else double.nan;
sell.setLineWeight(5);
sell.setDefaultColor(color.red);
sell.setPaintingStrategy(paintingStrategy.BOOLEAN_ARROW_DOWN);




