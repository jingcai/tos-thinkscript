# TS_OptionProfile
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 16 Sep 2010
# Next3rdFriday code (c) thinkorswim

#hint:<b>TS_OptionProfile</b>\nThe Option Profile plots the open interest of ten call and put strikes centered around the current price on daily charts only. The plot appears in the right extension space of your chart which is set in the style settings. 
#hint series: The option series to be plotted. 1 indicates upcoming expiration.
#hint displayOffset: Number of bars to the of right of the current bar you want the profile to begin.<b>Default: 5</b>
#hint barLength: Number of bars of right extension space minus your input displayOffset.<b>Default: 45</b>
#hint mode: <b>Auto</b> The study attempts to determine the center strike and strike spacing automatically. <b>Manual</b> The user inputs both the center strike and spacing.
#hint manualCenterStrike: Applied when using manual mode. Sets the center strike of the open interest profile.
#hint manualStrikeSpacing: Applied when using manual mode. Sets the spacing between individual strikes.

# Next3rdFriday excerpt
input series = 1;
input show_label = yes;

def CurrentYear = getYear();
def CurrentMonth = getMonth();
def CurrentDOM = getDayOfMonth(getYyyyMmDd());

def Day1DOW1 = getDayOfWeek(CurrentYear * 10000 + CurrentMonth * 100 + 1);
def FirstFridayDOM1 = if Day1DOW1 < 6
    then 6 - Day1DOW1
    else if Day1DOW1 == 6
        then 7
        else 6;
def RollDOM = FirstFridayDOM1 + 14;
def ExpMonth1 = if RollDOM > CurrentDOM
    then CurrentMonth + series - 1
    else CurrentMonth + series;
def ExpMonth2 = if ExpMonth1 > 12
    then ExpMonth1 - 12
    else ExpMonth1;
def ExpYear = if ExpMonth1 > 12
    then CurrentYear + 1
    else CurrentYear;
def Day1DOW = getDayOfWeek(ExpYear * 10000 + ExpMonth2 * 100 + 1);
def FirstFridayDOM = if Day1DOW < 6
    then 6 - Day1DOW
    else if Day1DOW == 6
        then 7
        else 6;
def ExpDOM = FirstFridayDOM + 15;


def maxStrikeSpacing = 25;
input mode = {default AUTO, MANUAL};
input manualCenterStrike = 250.0;
input manualStrikeSpacing = 2.50;

rec centerStrike =  if (mode == mode.AUTO and !IsNaN(close)) then roundDown(close / 10, 0) * 10 else if (mode == mode.MANUAL and !IsNaN(close)) then manualCenterStrike else centerStrike[1];
def strikeSpacingC = fold i = 1 to maxStrikeSpacing with spacing = 0 do if !IsNaN( open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("C", centerStrike + (maxStrikeSpacing - i))))) then maxStrikeSpacing - i else spacing;

rec strikeSpacing = if (mode == mode.AUTO and !IsNaN(close)) then strikeSpacingC else if (mode == mode.MANUAL and !IsNaN(close)) then manualStrikeSpacing else strikeSpacing[1];
rec barOffset = if !IsNaN(close) then strikeSpacing / 10.0 else barOffset[1];

AddChartLabel(show_label, concat("Expiration: ", concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM))), color.white);
AddChartLabel(show_label, concat("Strike Spacing: ", strikeSpacing), color.cyan);

DefineGlobalColor("Calls", color.white);
DefineGlobalColor("Puts", color.orange);

def barWeight = 5;

# Number of bars to right of current bar for display
# Should be a positive number

input displayOffset = 5;

# Number of bars of right space minus 5
input barLength = 45;


rec extBar = if IsNaN(close[displayOffset]) then extBar[1] + 1 else 0;

def c1_OI_d =  open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("C", centerStrike )));
def c2_OI_d =  open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("C", centerStrike - strikeSpacing)));
def c3_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("C", centerStrike - strikeSpacing * 2)));
def c4_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("C", centerStrike - strikeSpacing * 3)));
def c5_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("C", centerStrike + strikeSpacing)));
def c6_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("C", centerStrike + strikeSpacing * 2)));
def c7_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("C", centerStrike + strikeSpacing * 3)));
def c8_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("C", centerStrike - strikeSpacing * 4)));
def c9_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("C", centerStrike + strikeSpacing * 4)));
def c10_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("C", centerStrike - strikeSpacing * 5)));
def c11_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("C", centerStrike + strikeSpacing * 5)));

def p1_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("P", centerStrike)));
def p2_OI_d =  open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("P", centerStrike - strikeSpacing)));
def p3_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("P", centerStrike - strikeSpacing * 2)));
def p4_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("P", centerStrike - strikeSpacing * 3)));
def p5_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("P", centerStrike + strikeSpacing)));
def p6_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("P", centerStrike + strikeSpacing * 2)));
def p7_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("P", centerStrike + strikeSpacing * 3)));
def p8_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("P", centerStrike - strikeSpacing * 4)));
def p9_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("P", centerStrike + strikeSpacing * 4)));
def p10_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("P", centerStrike - strikeSpacing * 5)));
def p11_OI_d = open_interest(concat(concat(".", concat(getSymbolPart(), concat(concat(EXPYear - 2000, if ExpMonth2 <= 9 then concat("0", ExpMonth2) else concat("", ExpMonth2)), if ExpDOM <= 9 then concat("0", ExpDOM) else concat("", ExpDOM)))), concat("P", centerStrike + strikeSpacing * 5)));

def c1_OI = if !IsNaN(c1_OI_d) then c1_OI_d else 0;
def c2_OI = if !IsNaN(c2_OI_d) then c2_OI_d else 0;
def c3_OI = if !IsNaN(c3_OI_d) then c3_OI_d else 0;
def c4_OI = if !IsNaN(c4_OI_d) then c4_OI_d else 0;
def c5_OI = if !IsNaN(c5_OI_d) then c5_OI_d else 0;
def c6_OI = if !IsNaN(c6_OI_d) then c6_OI_d else 0;
def c7_OI = if !IsNaN(c7_OI_d) then c7_OI_d else 0;
def c8_OI = if !IsNaN(c8_OI_d) then c8_OI_d else 0;
def c9_OI = if !IsNaN(c9_OI_d) then c9_OI_d else 0;
def c10_OI = if !IsNaN(c10_OI_d) then c10_OI_d else 0;
def c11_OI = if !IsNaN(c11_OI_d) then c11_OI_d else 0;

def p1_OI = if !IsNaN(p1_OI_d) then p1_OI_d else 0;
def p2_OI = if !IsNaN(p2_OI_d) then p2_OI_d else 0;
def p3_OI = if !IsNaN(p3_OI_d) then p3_OI_d else 0;
def p4_OI = if !IsNaN(p4_OI_d) then p4_OI_d else 0;
def p5_OI = if !IsNaN(p5_OI_d) then p5_OI_d else 0;
def p6_OI = if !IsNaN(p6_OI_d) then p6_OI_d else 0;
def p7_OI = if !IsNaN(p7_OI_d) then p7_OI_d else 0;
def p8_OI = if !IsNaN(p8_OI_d) then p8_OI_d else 0;
def p9_OI = if !IsNaN(p9_OI_d) then p9_OI_d else 0;
def p10_OI = if !IsNaN(p10_OI_d) then p10_OI_d else 0;
def p11_OI = if !IsNaN(p11_OI_d) then p11_OI_d else 0;

def c1t = Max(Max(Max(Max(c1_OI, c2_OI), c3_OI), c4_OI), c5_OI);
def c2t = Max(Max(Max(Max(Max(c6_OI, c7_OI), c8_OI), c9_OI), c10_OI), c11_OI);
def p1t = Max(Max(Max(Max(p1_OI, p2_OI), p3_OI), p4_OI), p5_OI);
def p2t = Max(Max(Max(Max(Max(p6_OI, p7_OI), p8_OI), p9_OI), p10_OI), p11_OI);

def c_OI_max = Max(c1t, c2t);
def p_OI_max = Max(p1t, p2t);
def OI_max = Max(c_OI_max, p_OI_max);

rec c1_D = if IsNaN(close) then c1_D[1] else Ceil((c1_OI / OI_Max) * barLength);
plot C1 = if c1_D >= extBar and extBar != 0 then centerStrike + barOffset else double.nan;
C1.SetDefaultColor(globalColor("Calls") );
C1.SetLineWeight(barWeight);

rec c2_D = if IsNaN(close) then c2_D[1] else Ceil((c2_OI / OI_Max) * barLength);
plot C2 = if c2_D >= extBar and extBar != 0 then centerStrike + barOffset - strikeSpacing else double.nan;
C2.SetDefaultColor(globalColor("Calls"));
C2.SetLineWeight(barWeight);

rec c3_D = if IsNaN(close) then c3_D[1] else Ceil((c3_OI / OI_Max) * barLength);
plot C3 = if c3_D >= extBar and extBar != 0 then centerStrike + barOffset - strikeSpacing * 2 else double.nan;
C3.SetDefaultColor(globalColor("Calls"));
C3.SetLineWeight(barWeight);

rec c4_D = if IsNaN(close) then c4_D[1] else Ceil((c4_OI / OI_Max) * barLength);
plot C4 = if c4_D >= extBar  and extBar != 0 then centerStrike + barOffset - strikeSpacing * 3 else double.nan;
C4.SetDefaultColor(globalColor("Calls"));
C4.SetLineWeight(barWeight);

rec c5_D = if IsNaN(close) then c5_D[1] else Ceil((c5_OI / OI_Max) * barLength);
plot C5 = if c5_D >= extBar  and extBar != 0 then centerStrike + barOffset + strikeSpacing else double.nan;
C5.SetDefaultColor(globalColor("Calls"));
C5.SetLineWeight(barWeight);

rec c6_D = if IsNaN(close) then c6_D[1] else Ceil((c6_OI / OI_Max) * barLength);
plot C6 = if c6_D >= extBar  and extBar != 0 then centerStrike + barOffset + strikeSpacing * 2 else double.nan;
C6.SetDefaultColor(globalColor("Calls"));
C6.SetLineWeight(barWeight);

rec c7_D = if IsNaN(close) then c7_D[1] else Ceil((c7_OI / OI_Max) * barLength);
plot C7 = if c7_D >= extBar  and extBar != 0 then centerStrike + barOffset + strikeSpacing * 3 else double.nan;
C7.SetDefaultColor(globalColor("Calls"));
C7.SetLineWeight(barWeight);

rec c8_D = if IsNaN(close) then c8_D[1] else Ceil((c8_OI / OI_Max) * barLength);
plot C8 = if c8_D >= extBar  and extBar != 0 then centerStrike + barOffset - strikeSpacing * 4 else double.nan;
C8.SetDefaultColor(globalColor("Calls"));
C8.SetLineWeight(barWeight);

rec c9_D = if IsNaN(close) then c9_D[1] else Ceil((c9_OI / OI_Max) * barLength);
plot C9 = if c9_D >= extBar  and extBar != 0 then centerStrike + barOffset + strikeSpacing * 4 else double.nan;
C9.SetDefaultColor(globalColor("Calls"));
C9.SetLineWeight(barWeight);

rec c10_D = if IsNaN(close) then c10_D[1] else Ceil((c10_OI / OI_Max) * barLength);
plot C10 = if c10_D >= extBar  and extBar != 0 then centerStrike + barOffset - strikeSpacing * 5 else double.nan;
C10.SetDefaultColor(globalColor("Calls"));
C10.SetLineWeight(barWeight);


rec c11_D = if IsNaN(close) then c11_D[1] else Ceil((c11_OI / OI_Max) * barLength);
plot C11 = if c11_D >= extBar  and extBar != 0 then centerStrike + barOffset + strikeSpacing * 5 else double.nan;
C11.SetDefaultColor(globalColor("Calls"));
C11.SetLineWeight(barWeight);



rec p1_D = if IsNaN(close) then p1_D[1] else Ceil((p1_OI / OI_Max) * barLength);
plot P1 = if p1_D >= extBar and extBar != 0 then centerStrike - barOffset else double.nan;
P1.SetDefaultColor(globalColor("Puts") );
P1.SetLineWeight(barWeight);

rec p2_D = if IsNaN(close) then p2_D[1] else Ceil((p2_OI / OI_Max) * barLength);
plot P2 = if p2_D >= extBar and extBar != 0 then centerStrike - barOffset - strikeSpacing else double.nan;
P2.SetDefaultColor(globalColor("Puts"));
P2.SetLineWeight(barWeight);

rec p3_D = if IsNaN(close) then p3_D[1] else Ceil((p3_OI / OI_Max) * barLength);
plot P3 = if p3_D >= extBar and extBar != 0 then centerStrike - barOffset - strikeSpacing * 2 else double.nan;
P3.SetDefaultColor(globalColor("Puts"));
P3.SetLineWeight(barWeight);

rec p4_D = if IsNaN(close) then p4_D[1] else Ceil((p4_OI / OI_Max) * barLength);
plot P4 = if p4_D >= extBar  and extBar != 0 then centerStrike - barOffset - strikeSpacing * 3 else double.nan;
P4.SetDefaultColor(globalColor("Puts"));
P4.SetLineWeight(barWeight);

rec p5_D = if IsNaN(close) then p5_D[1] else Ceil((p5_OI / OI_Max) * barLength);
plot P5 = if p5_D >= extBar  and extBar != 0 then centerStrike - barOffset + strikeSpacing else double.nan;
P5.SetDefaultColor(globalColor("Puts"));
P5.SetLineWeight(barWeight);

rec p6_D = if IsNaN(close) then p6_D[1] else Ceil((p6_OI / OI_Max) * barLength);
plot P6 = if p6_D >= extBar  and extBar != 0 then centerStrike - barOffset + strikeSpacing * 2 else double.nan;
P6.SetDefaultColor(globalColor("Puts"));
P6.SetLineWeight(barWeight);

rec p7_D = if IsNaN(close) then p7_D[1] else Ceil((p7_OI / OI_Max) * barLength);
plot P7 = if p7_D >= extBar  and extBar != 0 then centerStrike - barOffset + strikeSpacing * 3 else double.nan;
P7.SetDefaultColor(globalColor("Puts"));
P7.SetLineWeight(barWeight);

rec p8_D = if IsNaN(close) then p8_D[1] else Ceil((p8_OI / OI_Max) * barLength);
plot P8 = if p8_D >= extBar  and extBar != 0 then centerStrike - barOffset - strikeSpacing * 4 else double.nan;
P8.SetDefaultColor(globalColor("Puts"));
P8.SetLineWeight(barWeight);

rec p9_D = if IsNaN(close) then p9_D[1] else Ceil((p9_OI / OI_Max) * barLength);
plot P9 = if p9_D >= extBar  and extBar != 0 then centerStrike - barOffset + strikeSpacing * 4 else double.nan;
P9.SetDefaultColor(globalColor("Puts"));
P9.SetLineWeight(barWeight);

rec p10_D = if IsNaN(close) then p10_D[1] else Ceil((p10_OI / OI_Max) * barLength);
plot P10 = if p10_D >= extBar  and extBar != 0 then centerStrike - barOffset - strikeSpacing * 5 else double.nan;
P10.SetDefaultColor(globalColor("Puts"));
P10.SetLineWeight(barWeight);

rec p11_D = if IsNaN(close) then p11_D[1] else Ceil((p11_OI / OI_Max) * barLength);
plot P11 = if p11_D >= extBar  and extBar != 0 then centerStrike - barOffset + strikeSpacing * 5 else double.nan;
P11.SetDefaultColor(globalColor("Puts"));
P11.SetLineWeight(barWeight);

C1.SetPaintingStrategy(PaintingStrategy.DASHES);
C2.SetPaintingStrategy(PaintingStrategy.DASHES);
C3.SetPaintingStrategy(PaintingStrategy.DASHES);
C4.SetPaintingStrategy(PaintingStrategy.DASHES);
C5.SetPaintingStrategy(PaintingStrategy.DASHES);
C6.SetPaintingStrategy(PaintingStrategy.DASHES);
C7.SetPaintingStrategy(PaintingStrategy.DASHES);
C8.SetPaintingStrategy(PaintingStrategy.DASHES);
C9.SetPaintingStrategy(PaintingStrategy.DASHES);
C10.SetPaintingStrategy(PaintingStrategy.DASHES);
C11.SetPaintingStrategy(PaintingStrategy.DASHES);

P1.SetPaintingStrategy(PaintingStrategy.DASHES);
P2.SetPaintingStrategy(PaintingStrategy.DASHES);
P3.SetPaintingStrategy(PaintingStrategy.DASHES);
P4.SetPaintingStrategy(PaintingStrategy.DASHES);
P5.SetPaintingStrategy(PaintingStrategy.DASHES);
P6.SetPaintingStrategy(PaintingStrategy.DASHES);
P7.SetPaintingStrategy(PaintingStrategy.DASHES);
P8.SetPaintingStrategy(PaintingStrategy.DASHES);
P9.SetPaintingStrategy(PaintingStrategy.DASHES);
P10.SetPaintingStrategy(PaintingStrategy.DASHES);
P11.SetPaintingStrategy(PaintingStrategy.DASHES);

rec c1_OI_e = if IsNaN(close) and !IsNaN(close[1]) then c1_OI[1] else c1_OI_e[1];
rec c2_OI_e = if IsNaN(close) and !IsNaN(close[1]) then c2_OI[1] else c2_OI_e[1];
rec c3_OI_e = if IsNaN(close) and !IsNaN(close[1]) then c3_OI[1] else c3_OI_e[1];
rec c4_OI_e = if IsNaN(close) and !IsNaN(close[1]) then c4_OI[1] else c4_OI_e[1];
rec c5_OI_e = if IsNaN(close) and !IsNaN(close[1]) then c5_OI[1] else c5_OI_e[1];
rec c6_OI_e = if IsNaN(close) and !IsNaN(close[1]) then c6_OI[1] else c6_OI_e[1];
rec c7_OI_e = if IsNaN(close) and !IsNaN(close[1]) then c7_OI[1] else c7_OI_e[1];
rec c8_OI_e = if IsNaN(close) and !IsNaN(close[1]) then c8_OI[1] else c8_OI_e[1];
rec c9_OI_e = if IsNaN(close) and !IsNaN(close[1]) then c9_OI[1] else c9_OI_e[1];
rec c10_OI_e = if IsNaN(close) and !IsNaN(close[1]) then c10_OI[1] else c10_OI_e[1];
rec c11_OI_e = if IsNaN(close) and !IsNaN(close[1]) then c11_OI[1] else c11_OI_e[1];

rec p1_OI_e = if IsNaN(close) and !IsNaN(close[1]) then p1_OI[1] else p1_OI_e[1];
rec p2_OI_e = if IsNaN(close) and !IsNaN(close[1]) then p2_OI[1] else p2_OI_e[1];
rec p3_OI_e = if IsNaN(close) and !IsNaN(close[1]) then p3_OI[1] else p3_OI_e[1];
rec p4_OI_e = if IsNaN(close) and !IsNaN(close[1]) then p4_OI[1] else p4_OI_e[1];
rec p5_OI_e = if IsNaN(close) and !IsNaN(close[1]) then p5_OI[1] else p5_OI_e[1];
rec p6_OI_e = if IsNaN(close) and !IsNaN(close[1]) then p6_OI[1] else p6_OI_e[1];
rec p7_OI_e = if IsNaN(close) and !IsNaN(close[1]) then p7_OI[1] else p7_OI_e[1];
rec p8_OI_e = if IsNaN(close) and !IsNaN(close[1]) then p8_OI[1] else p8_OI_e[1];
rec p9_OI_e = if IsNaN(close) and !IsNaN(close[1]) then p9_OI[1] else p9_OI_e[1];
rec p10_OI_e = if IsNaN(close) and !IsNaN(close[1]) then p10_OI[1] else p10_OI_e[1];
rec p11_OI_e = if IsNaN(close) and !IsNaN(close[1]) then p11_OI[1] else p11_OI_e[1];


AddChartBubble(c1_D == extBar, C1, concat("", c1_OI_e), globalColor("Calls"), yes );
AddChartBubble(c2_D == extBar, C2, concat("", c2_OI_e), globalColor("Calls"), yes );
AddChartBubble(c3_D == extBar, C3, concat("", c3_OI_e), globalColor("Calls"), yes );
AddChartBubble(c4_D == extBar, C4, concat("", c4_OI_e), globalColor("Calls"), yes );
AddChartBubble(c5_D == extBar, C5, concat("", c5_OI_e), globalColor("Calls"), yes );
AddChartBubble(c6_D == extBar, C6, concat("", c6_OI_e), globalColor("Calls"), yes );
AddChartBubble(c7_D == extBar, C7, concat("", c7_OI_e), globalColor("Calls"), yes );
AddChartBubble(c8_D == extBar, C8, concat("", c8_OI_e), globalColor("Calls"), yes );
AddChartBubble(c9_D == extBar, C9, concat("", c9_OI_e), globalColor("Calls"), yes );
AddChartBubble(c10_D == extBar, C10, concat("", c10_OI_e), globalColor("Calls"), yes );
AddChartBubble(c11_D == extBar, C11, concat("", c11_OI_e), globalColor("Calls"), yes );

AddChartBubble(p1_D == extBar, P1, concat("", p1_OI_e), globalColor("Puts"), no );
AddChartBubble(p2_D == extBar, P2, concat("", p2_OI_e), globalColor("Puts"), no );
AddChartBubble(p3_D == extBar, P3, concat("", p3_OI_e), globalColor("Puts"), no );
AddChartBubble(p4_D == extBar, P4, concat("", p4_OI_e), globalColor("Puts"), no );
AddChartBubble(p5_D == extBar, P5, concat("", p5_OI_e), globalColor("Puts"), no );
AddChartBubble(p6_D == extBar, P6, concat("", p6_OI_e), globalColor("Puts"), no );
AddChartBubble(p7_D == extBar, P7, concat("", p7_OI_e), globalColor("Puts"), no );
AddChartBubble(p8_D == extBar, P8, concat("", p8_OI_e), globalColor("Puts"), no );
AddChartBubble(p9_D == extBar, P9, concat("", p9_OI_e), globalColor("Puts"), no );
AddChartBubble(p10_D == extBar, P10, concat("", p10_OI_e), globalColor("Puts"), no );
AddChartBubble(p11_D == extBar, P11, concat("", p11_OI_e), globalColor("Puts"), no );

C1.HideBubble();
C2.HideBubble();
C3.HideBubble();
C4.HideBubble();
C5.HideBubble();
C6.HideBubble();
C7.HideBubble();
C8.HideBubble();
C9.HideBubble();
C10.HideBubble();
C11.HideBubble();

P1.HideBubble();
P2.HideBubble();
P3.HideBubble();
P4.HideBubble();
P5.HideBubble();
P6.HideBubble();
P7.HideBubble();
P8.HideBubble();
P9.HideBubble();
P10.HideBubble();
P11.HideBubble();

C1.HideTitle();
C2.HideTitle();
C3.HideTitle();
C4.HideTitle();
C5.HideTitle();
C6.HideTitle();
C7.HideTitle();
C8.HideTitle();
C9.HideTitle();
C10.HideTitle();
C11.HideTitle();
   
P1.HideTitle();
P2.HideTitle();
P3.HideTitle();
P4.HideTitle();
P5.HideTitle();
P6.HideTitle();
P7.HideTitle();
P8.HideTitle();
P9.HideTitle();
P10.HideTitle();
P11.HideTitle();


