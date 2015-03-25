# TS_Renko
# (c) 2010 http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 16 APR 2010

defineGlobalColor("TrendUp", color.cyan);
defineGlobalColor("TrendDown", color.magenta);

input showBricks = YES;
input priceBarColor = {default BrickColor, Gray, None};
input brickSize = {default ATR, Fixed};
input fixedBrickSize = 1.0;
input ATRLength = 14;
def brick = if brickSize==brickSize.Fixed then fixedBrickSize else AvgTrueRange(high,close,low,ATRLength);

rec state = {default init, long, short};
rec barLow;
rec barHigh;
rec mode;

switch (state[1]) {
case init:
    
    if (close < open) 
    then {
    state = state.short;
    barLow = close;
    barHigh = open; 
    mode = 0;
    } else {
    state = state.long;
    barLow = open;
    barHigh = close;
    mode = 0; 
}
                                                                         
case short:

   if (close < barlow[1]-brick) 
    then {
    state = state.short;
    barLow = barlow[1]-(floor((barlow[1]-close)/brick)*brick);
    barHigh = barlow[1];
    mode = if mode[1]==0 then 1 else 0;
    } else if (close <= barHigh[1]+brick ) then {
    state = state.short;
    barLow = barlow[1];
    barHigh = barhigh[1];
    mode = if mode[1]==0 then 0 else 1;
    } else {
    state = state.long;
    barLow = barhigh[1];
    barhigh = barhigh[1]+(floor((close-barhigh[1])/brick)*brick);
    mode = if mode[1]==0 then 1 else 0;
}

case long:
    if (close > barHigh[1]+brick) 
    then {
    state = state.long;
    barLow = barhigh[1];
    barHigh = barhigh[1]+(floor((close-barhigh[1])/brick)*brick); 
    mode = if mode[1]==0 then 1 else 0;
    } else if (close >= barLow[1]-brick) then {
    state = state.long;
    barLow = barLow[1];
    barHigh = barhigh[1];
    mode = if mode[1]==0 then 0 else 1;
    } else {
    state=state.short;
    barLow = barlow[1]-(floor((barlow[1]-close)/brick)*brick);
    barhigh = barlow[1];
    mode = if mode[1]==0 then 1 else 0;
}
}

assignPriceColor(if pricebarColor==priceBarColor.BrickColor then if state==state.long then globalColor("TrendUp") else globalColor("TrendDown") else if priceBarColor==priceBarColor.Gray then color.dark_gray else color.current);

plot h1;
plot h2;
plot l1;
plot l2;

if mode == 0 then {
h1 = if (!isNan(close) and showBricks) then if state==state.long then barhigh else barLow else double.nan;
l1 = if (!isNan(close) and showBricks) then if state==state.long then barlow else barHigh else double.nan;
h2 = double.nan;
l2 = double.nan;
} else {
h1 = double.nan;
l1 = double.nan;
h2 = if (!isNan(close) and showBricks)  then if state==state.long then barhigh else barlow else double.nan;
l2 = if (!isNan(close) and showBricks)  then if state==state.long then barlow else barhigh else double.nan;
} 

h1.setPaintingStrategy(paintingStrategy.DASHES);
h2.setPaintingStrategy(paintingStrategy.DASHES);
l1.setPaintingStrategy(paintingStrategy.DASHES);
l2.setPaintingStrategy(paintingStrategy.DASHES);

h1.assignValueColor(if state==state.long then globalColor("TrendUp") else globalColor("TrendDown"));
h2.assignValueColor(if state==state.long then globalColor("TrendUp") else globalColor("TrendDown"));
l1.assignValueColor(if state==state.long then globalColor("TrendUp") else globalColor("TrendDown"));
l2.assignValueColor(if state==state.long then globalColor("TrendUp") else globalColor("TrendDown"));

h1.setLineWeight(3);
h2.setLineWeight(3);
l1.setLineWeight(3);
l2.setLineWeight(3);

addCloud(h1, l1,globalColor("TrendUp"), globalColor("TrendDown"));
addCloud(h2, l2,globalColor("TrendUp"), globalColor("TrendDown"));

