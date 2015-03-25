# TS_AdvanceDeclineBox
# thinkscripter@gmail.com
# Last Update 12 MAY 2010

def A = close("$ADVN");
def D = close ("$DECN");
def ADL = A - D;
def ADR = if A > D then A / D else -D / A;
input mode = {default Ratio, Issues};
def modeSwitch = if mode == mode.Ratio then 1 else 0;

AddChartLabel(yes, concat(
if modeSwitch then ADR else ADL, concat(" ",
if modeSwitch then ":1  A/D RATIO" else " A/D LINE")),
if modeSwitch then if ADR > ADR[1] then color.green else color.red else if ADL > ADL[1] then color.green else color.red);
plot null = double.nan;
