# VervoortCrossover
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 30 MAR 2009

input period = 55;
def price = (high + low + close) / 3;

#-----Typical Price Triple Exponential Moving Average 

def TMA1 = 3 * ExpAverage(price, period)
- 3 * ExpAverage(ExpAverage(price, period), period)
+ ExpAverage(ExpAverage(ExpAverage(price, period), period), period);

def TMA2 = 3 * ExpAverage(TMA1, period)
- 3 * ExpAverage(ExpAverage(TMA1, period), period)
+ ExpAverage(ExpAverage(ExpAverage(TMA1, period), period), period);

def difference = TMA1 - TMA2;
plot TypicalPriceZeroLagTEMA = TMA1 + difference; 
TypicalPriceZeroLagTEMA.SetDefaultColor(color.green); 

#------Heikin-Ashi Close Triple Exponential Moving Average

rec haopen = compoundValue(1, ((open[1] + high[1] + low[1] + close[1]) / 4 + haopen[1]) / 2, hl2);
def haclose = ((open + high + low + close) / 4 + haopen + Max(high, haopen) + Min(low, haopen)) / 4;

def HATMA1 = 3 * ExpAverage(haclose, period)
- 3 * ExpAverage(ExpAverage(haclose, period), period)
+ ExpAverage(ExpAverage(ExpAverage(haclose, period), period), period);

def HATMA2 = 3 * ExpAverage(HATMA1, period)
- 3 * ExpAverage(ExpAverage(HATMA1, period), period)
+ ExpAverage(ExpAverage(ExpAverage(HATMA1, period), period), period);

def HAdifference = HATMA1 - HATMA2;
plot HeikinAshiZeroLagTEMA = HATMA1 + HAdifference;
HeikinAshiZeroLagTEMA.SetDefaultColor(color.red);

def buySignal = if TypicalPriceZeroLagTEMA > HeikinAshiZeroLagTEMA and TypicalPriceZeroLagTEMA[1] <= HeikinAshiZeroLagTEMA[1] then 1 else 0;

def sellSignal = if TypicalPriceZeroLagTEMA < HeikinAshiZeroLagTEMA and TypicalPriceZeroLagTEMA[1] >= HeikinAshiZeroLagTEMA[1] then 1 else 0;

plot signal = if buySignal or sellSignal then TypicalPriceZeroLagTEMA else double.nan;
signal.assignValueColor(if buySignal then color.green else color.red);
signal.setLineWeight(5);
signal.SetStyle(curve.points);