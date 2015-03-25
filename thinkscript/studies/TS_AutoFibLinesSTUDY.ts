# TS_AUTOFIBLINES
# http://www.thinkscripter.com
# (c) 2009 All Rights Reserved
# thinkscripter@gmail.com
# Last Update 17 APR 2010

input Required_Reversal_Amount = 1.0;
input Reversal_Mode = {default price, percent}; 
input fib1 = 0.382;
input fib2 = 0.50;
input fib3 = 0.618;
input fib4 = 0.786;
input fib5 = -0.236;
input fib6 = -0.382;
input fib7 = -0.5;

def Required_Reversal;
switch (Reversal_Mode){
case price:
Required_Reversal = Required_Reversal_Amount;
case percent:
Required_Reversal = close*Required_Reversal_Amount/100.0;
}

rec state = {default init, up, down};
rec tsl;
rec tsh;
rec psl;
rec psh;

switch (state[1]) {
case init:
    state = state.up;
    tsl = low;
    tsh = high;
    psl = low;
    psh = high;
   
case down:
    if (close[1]-tsl[1] > required_reversal)
    then {
        state = state.up;
        tsl = tsl[1];
        tsh = high;  
        psl = tsl[1];
        psh = psh[1];     
    } else {
        state = state.down;
        tsl =compoundValue(1,if low < tsl[1] then low else tsl[1],low);
        tsh = high;
        psl = psl[1];
        psh = psh[1];
    }
case up:
    if (tsh[1]-close[1] > required_reversal)
    then {
        state = state.down;
        tsl = low;
        tsh = tsh[1]; 
        psl = psl[1];
        psh = tsh[1];     
    } else {
        state = state.up;
        tsl = low;
        tsh = compoundValue(1,if high > tsh[1] then high else tsh[1],high);
        psl = psl[1];
        psh = psh[1];
    }
}

def prevHigh = psh;;
def prevLow = psl;

def deltaHL = prevHigh - prevLow;
def ret1 = deltaHL * fib1;
def ret2 = deltaHL * fib2;
def ret3 = deltaHL * fib3;
def ret4 = deltaHL * fib4;
def ret5 = deltaHL * fib5;
def ret6 = deltaHL * fib6;
def ret7 = deltaHL * fib7;

def fA = if(state==state.up, prevLow, prevHigh);
plot pivotA = if isNan(close[0]) then fA else double.nan;

pivotA.setDefaultColor(color.white);
pivotA.SetLineWeight(1);
pivotA.setStyle(curve.SHORT_DASH);

def fB = if(state==state.up, prevHigh, prevLow);
plot pivotB = if isNan(close[0]) then fB else double.nan;

pivotB.setDefaultColor(color.white);
pivotB.SetLineWeight(1);
pivotB.setStyle(curve.SHORT_DASH);

def f1c = if(state==state.up , prevLow + ret1, prevHigh - ret1);
plot f1 = if isNan(close[0]) then f1c else double.nan;
f1.SetDefaultColor(color.dark_gray);
f1.SetLineWeight(1);

def f2c = if(state==state.up , prevLow + ret2, prevHigh - ret2);
plot f2 = if isNan(close[0]) then f2c else double.nan;
f2.SetDefaultColor(color.yellow);
f2.SetLineWeight(1);

def f3c = if(state==state.up , prevLow + ret3, prevHigh - ret3);
plot f3 = if isNan(close[0]) then f3c else double.nan;
f3.SetDefaultColor(color.red);
f3.SetLineWeight(1);

def f4c = if(state==state.up , prevLow + ret4,  prevHigh - ret4);
plot f4 = if isNan(close[0]) then f4c else double.nan;
f4.SetDefaultColor(color.dark_gray);
f4.SetLineWeight(1);

def f5c = if(state==state.up , prevLow + ret5, prevHigh - ret5);
plot f5 = if isNan(close[0]) then f5c else double.nan;
f5.SetDefaultColor(color.white);
f5.SetLineWeight(3);
f5.setStyle(curve.SHORT_DASH);

def f6c = if(state==state.up , prevLow + ret6, prevHigh - ret6);
plot f6= if isNan(close[0]) then f6c else double.nan;
f6.SetDefaultColor(color.dark_gray);
f6.SetLineWeight(1);
f6.setStyle(curve.SHORT_DASH);

def f7c = if(state==state.up , prevLow + ret7,  prevHigh - ret7);
plot f7 = if isNan(close[0]) then f7c else double.nan;
f7.SetDefaultColor(color.dark_GRAY);
f7.SetLineWeight(1);
f7.setStyle(curve.SHORT_DASH);

plot revPoint =  if isNan(close[-1]) and !isNan(close) then if state==state.down then tsl+required_Reversal else tsh-required_Reversal else double.nan;
revPoint.setStyle(curve.POINTS);
revPoint.setDefaultColor(color.magenta);
revPoint.setLineWeight(3);

plot modeDown = if isNan(close[0]) and !isNan(close[1]) then if state==state.down then prevHigh else double.nan else double.nan;
modeDown.setPaintingStrategy(paintingStrategy.ARROW_DOWN 
,yes);
modeDown.setDefaultColor(color.red);
modeDown.setLineWeight(3);

plot modeUp = if isNan(close[0])  and !isNan(close[1]) then if state==state.up then prevLow else double.nan else double.nan;
modeUp.setPaintingStrategy(paintingStrategy.ARROW_Up 
,yes);
modeUp.setDefaultColor(color.green);
modeUp.setLineWeight(3);

