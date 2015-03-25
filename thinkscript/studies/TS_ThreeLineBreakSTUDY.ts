# TS_ThreeLineBreak
# (c) 2010 http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 05 Nov 2010


input priceBarColor = {default BrickColor, Gray, None};

rec state = {default bar1, bar2S, bar2L, bar3S, bar3L, bar4S, bar4L};
rec barLow;
rec barHigh;
rec break1;
rec break2;
rec break3;
rec mode;

switch (state[1]) {
case bar1:
    
    if (close < open) 
    then {
    state = state.bar2S;
    barLow = close;
    barHigh = open; 
    break1 = open;
    break2 = open;
    break3 = open;
    mode = 0;
    } else {
    state = state.bar2L;
    barLow = open;
    barHigh = close;
    break1 = close;
    break2 = close;
    break3 = close;
    mode = 0; 
}
                                                                         
case bar2S:

   if (close < barlow[1]) 
    then {
    state = state.bar3S;
    barLow = close;
    barHigh = barlow[1];
    break1 = barhigh[1];
    break2 = break1[1];
    break3 = break2[1];
    mode = if mode[1]==0 then 1 else 0;
    } else if (close <= barHigh[1] ) then {
    state = state.bar2S;
    barLow = barlow[1];
    barHigh = barhigh[1];
    break1 = break1[1];
    break2 = break2[1];
    break3 = break3[1];
    mode = if mode[1]==0 then 0 else 1;
    } else {
    state = state.bar2L;
    barLow = barhigh[1];
    barhigh = close;
    break1 = barhigh[1];
    break2 = barhigh[1];
    break3 = barhigh[1];
    mode = if mode[1]==0 then 1 else 0;
}

case bar3S:

   if (close < barlow[1]) 
    then {
    state = state.bar4S;
    barLow = close;
    barHigh = barlow[1];
    break1 = barhigh[1];
    break2 = break1[1];
    break3 = break2[1];
    mode = if mode[1]==0 then 1 else 0;
    } else if (close <= barHigh[1] ) then {
    state = state.bar3S;
    barLow = barlow[1];
    barHigh = barhigh[1];
    break1 = break1[1];
    break2 = break2[1];
    break3 = break3[1];
    mode = if mode[1]==0 then 0 else 1;
    } else {
    state = state.bar2L;
    barLow = barhigh[1];
    barhigh = close;
    break1 = barhigh[1];
    break2 = barhigh[1];
    break3 = barhigh[1];
    mode = if mode[1]==0 then 1 else 0;
}

case bar4S:

   if (close < barlow[1]) 
    then {
    state = state.bar4S;
    barLow = close;
    barHigh = barlow[1];
    break1 = barhigh[1];
    break2 = break1[1];
    break3 = break2[1];
    mode = if mode[1]==0 then 1 else 0;
    } else if (close <= break2[1] ) then {
    state = state.bar4S;
    barLow = barlow[1];
    barHigh = barhigh[1];
    break1 = break1[1];
    break2 = break2[1];
    break3 = break3[1];
    mode = if mode[1]==0 then 0 else 1;
    } else {
    state = state.bar2L;
    barLow = barhigh[1];
    barhigh = close;
    break1 = barhigh[1];
    break2 = barhigh[1];
    break3 = barhigh[1];
    mode = if mode[1]==0 then 1 else 0;
}



case bar2L:
    if (close > barHigh[1]) 
    then {
    state = state.bar3L;
    barLow = barhigh[1];
    barHigh = close; 
    break1 = barLow[1];
    break2 = break1[1];
    break3 = break2[1];
    mode = if mode[1]==0 then 1 else 0;
    } else if (close >= barLow[1]) then {
    state = state.bar2L;
    barLow = barLow[1];
    barHigh = barhigh[1];
    break1 = break1[1];
    break2 = break2[1];
    break3 = break3[1];
    mode = if mode[1]==0 then 0 else 1;
    } else {
    state=state.bar2S;
    barLow = close; 
    barhigh = barlow[1];
    break1 = barlow[1];
    break2 = barlow[1];
    break3 = barlow[1];
    mode = if mode[1]==0 then 1 else 0;
}

case bar3L:
    if (close > barHigh[1]) 
    then {
    state = state.bar4L;
    barLow = barhigh[1];
    barHigh = close; 
    break1 = barLow[1];
    break2 = break1[1];
    break3 = break2[1];
    mode = if mode[1]==0 then 1 else 0;
    } else if (close >= barLow[1]) then {
    state = state.bar3L;
    barLow = barLow[1];
    barHigh = barhigh[1];
    break1 = break1[1];
    break2 = break2[1];
    break3 = break3[1];
    mode = if mode[1]==0 then 0 else 1;
    } else {
    state=state.bar2S;
    barLow = close; 
    barhigh = barlow[1];
    break1 = barlow[1];
    break2 = barlow[1];
    break3 = barlow[1];
    mode = if mode[1]==0 then 1 else 0;
}



case bar4L:
    if (close > barHigh[1]) 
    then {
    state = state.bar4L;
    barLow = barhigh[1];
    barHigh = close; 
    break1 = barLow[1];
    break2 = break1[1];
    break3 = break2[1];
    mode = if mode[1]==0 then 1 else 0;
    } else if (close >= break2[1]) then {
    state = state.bar4L;
    barLow = barLow[1];
    barHigh = barhigh[1];
    break1 = break1[1];
    break2 = break2[1];
    break3 = break3[1];
    mode = if mode[1]==0 then 0 else 1;
    } else {
    state=state.bar2S;
    barLow = close; 
    barhigh = barlow[1];
    break1 = barlow[1];
    break2 = barlow[1];
    break3 = barlow[1];
    mode = if mode[1]==0 then 1 else 0;
}



}

assignPriceColor(if pricebarColor==priceBarColor.BrickColor then if (state==state.bar2L or state==state.bar3L or state==state.bar4L) then color.gray else color.orange else if priceBarColor==priceBarColor.Gray then color.dark_gray else color.current);

plot h1;
plot h2;
plot l1;
plot l2;

if mode == 0 then {
h1 = if !isNan(close) then if (state==state.bar2L or state==state.bar3L or state==state.bar4L) then barhigh else barLow else double.nan;
l1 = if !isNan(close) then if (state==state.bar2L or state==state.bar3L or state==state.bar4L) then barlow else barHigh else double.nan;
h2 = double.nan;
l2 = double.nan;
} else {
h1 = double.nan;
l1 = double.nan;
h2 = if !isNan(close) then if (state==state.bar2L or state==state.bar3L or state==state.bar4L) then barhigh else barlow else double.nan;
l2 = if !isNan(close) then if (state==state.bar2L or state==state.bar3L or state==state.bar4L) then barlow else barhigh else double.nan;
} 

h1.setPaintingStrategy(paintingStrategy.DASHES);
h2.setPaintingStrategy(paintingStrategy.DASHES);
l1.setPaintingStrategy(paintingStrategy.DASHES);
l2.setPaintingStrategy(paintingStrategy.DASHES);

h1.assignValueColor(if (state==state.bar2L or state==state.bar3L or state==state.bar4L) then color.white else color.yellow);
h2.assignValueColor(if (state==state.bar2L or state==state.bar3L or state==state.bar4L) then color.white else color.yellow);
l1.assignValueColor(if (state==state.bar2L or state==state.bar3L or state==state.bar4L) then color.white else color.yellow);
l2.assignValueColor(if (state==state.bar2L or state==state.bar3L or state==state.bar4L) then color.white else color.yellow);

h1.setLineWeight(3);
h2.setLineWeight(3);
l1.setLineWeight(3);
l2.setLineWeight(3);

addCloud(h1, l1,color.white, color.yellow);
addCloud(h2, l2,color.white, color.yellow);

