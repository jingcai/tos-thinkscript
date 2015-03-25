# TS_MULTISTOPS
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 03 DEC 2010

input VolatilityCoefficient = 3.0;
input VolatilityStopLookBackLength = 20;
input allowStopExpansion = NO;
input FibStopLookBackLength = 3;
input FibStopRatio = 1.23;
input method = {default WildersAverage, AveTrueRange, ElderSafeZone, Chandelier, Fibonacci};

def UPenFlag; def UPenDepth; def UFlagCount; def UPenCount; def UPenAvg; def UStop;
def DPenFlag; def DPenDepth; def DFlagCount; def DPenCount; def DPenAvg; def DStop;

DPenFlag = if (high > high[1],1 ,0);
DPenDepth = if (high > high[1], high - high[1], 0); 
DFlagcount = compoundValue(1, sum(DPenFlag, VolatilityStopLookBackLength),0);
DPenCount = compoundValue(1, sum(DPenDepth, VolatilityStopLookBackLength),0);
DPenAvg = if DflagCount != 0 then DPenCount / DFlagCount else 0;
DStop = high[1] + (DPenAvg[1] * VolatilityCoefficient); 
    
UPenFlag = if (low < low[1], 1 , 0);
UPenDepth = if (low < low[1], low[1] - low, 0); 
UFlagCount = compoundValue(1, sum(UPenFlag, VolatilityStopLookBackLength),0);
UPenCount = compoundValue(1,sum(UPenDepth, VolatilityStopLookBackLength),0);
UPenAvg = if UflagCount !=0 then UPenCount / UFlagCount else 0;
UStop = low[1] - (UPenAvg[1] * VolatilityCoefficient) ;

def shortStop;
def longStop;
def volatility;

def hp = highest(high,FibStopLookBackLength);
def lp = lowest(low,FibStopLookBackLength);

def delta = hp-lp;

def fibShort = lp+delta*FibStopRatio; 
def fibLong = hp-delta*FibStopRatio;


switch(method){
case WildersAverage:
volatility = compoundValue(1, WildersAverage(TrueRange(high, close, low), VolatilityStopLookBackLength),3);

shortStop = high + VolatilityCoefficient * volatility;
longStop = low - VolatilityCoefficient * volatility;
case AveTrueRange:
volatility = compoundValue(1, AvgTrueRange(high, close, low, VolatilityStopLookBackLength),3);
shortStop = high + VolatilityCoefficient * volatility;
longStop = low - VolatilityCoefficient * volatility;
case ElderSafeZone:
volatility = compoundValue(1, AvgTrueRange(high, close, low, VolatilityStopLookBackLength),3);
shortStop = DStop;
longStop = UStop;
case Chandelier:
volatility = compoundValue(1, AvgTrueRange(high, close, low, VolatilityStopLookBackLength),3);
longStop = highest(high,VolatilityStopLookBackLength) - VolatilityCoefficient * volatility;
shortStop = lowest(low,VolatilityStopLookBackLength) + VolatilityCoefficient * volatility;
case Fibonacci:
volatility = 3;
longStop = fibLong;
shortStop = fibShort;
}

rec state = {default init, long, short};
rec short;
rec long;
rec stop;


switch (state[1]) {
case init:
    state = state.long;
    short = high;
    long = low;
    stop = long;
    
case short:
    if (close > stop[1])
    then {
        state = state.long;
        short = shortStop;
        long = longStop;
        stop = long;
        
    } else {
        state = state.short;
        if (allowStopExpansion)
        then {
            short = shortStop;
        } else {
            short  = Min(shortStop, short[1]);
        }
        long = longStop;
        stop = short;
        
    }
case long:
    if (close < stop[1])
    then {
        state = state.short;
        long = longStop;
        short = shortStop;
        stop = short;
        
    } else {
        state = state.long;
        if (allowStopExpansion)
        then {
            long = longStop;
        } else {
            long = Max(longStop, long[1]);
           
        }
        short = shortStop;
        stop = long;
       
    }
}

def lastBar = if(isNan(close),1,0);
#def firstBar = if barNumber() == 1 then 1 else 0;
def trendChange = if state != state[1] then 1 else 0;
plot trendChangeDirection = if trendChange and !lastBar then stop[1] else double.nan;
def directionColor = if state==state.long then 6 else 5;
trendChangeDirection.AssignValueColor(GetColor(directionColor));
trendChangeDirection.SetLineWeight(2);
trendChangeDirection.SetStyle(curve.POINTS);
plot trendChangeIndicator = if trendChange and !lastBar then stop[1] else double.nan;
trendChangeIndicator.SetDefaultColor(color.white);
trendChangeIndicator.SetLineWeight(5);
trendChangeIndicator.SetStyle(curve.POINTS);

trendChangeIndicator.hide();
trendChangeDirection.hide();

plot stops = if !lastBar then stop else double.Nan;
stops.AssignValueColor(if state==state.long then color.green else color.red);
stops.SetStyle(curve.short_DASH);
stops.SetLineWeight(2);
stops.hideBubble();

alert((state==state.long and state[1]==state.short), "Short Exit/Long Entry", alert.bar, sound.bell);
alert((state==state.short and state[1]==state.long), "Long Exit/Short Entry", alert.bar, sound.bell);

assignPriceColor(if state==state.long then color.green else color.red);
