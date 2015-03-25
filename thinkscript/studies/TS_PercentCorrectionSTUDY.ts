# TS_PercentCorrection
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 22 May 2010

# Designed for use on daily charts

input startDateYYYYMMDD = 20100101;
input mode = {default Bull, Bear};
input spacing = 1.0;

def start = if getYyyyMmDd() > startDateYYYYMMDD then 1 else 0;

rec highPrint = compoundValue(1, if start then if high > highPrint[1] then high else highPrint[1] else high , high);
rec lowPrint = compoundValue(1, if start then if low < lowPrint[1] then low else lowPrint[1] else low , low);

def onePercent = if mode == mode.Bull then highPrint * 0.01 else -lowPrint * 0.01;
def base = if mode == mode.Bull then highPrint else lowPrint;

plot hp = if start then base else double.nan;
plot p1 = if start then base - onePercent * 1 * spacing else double.nan;
plot p2 = if start then base - onePercent * 2 * spacing else double.nan;
plot p3 = if start then base - onePercent * 3 * spacing else double.nan;
plot p4 = if start then base - onePercent * 4 * spacing else double.nan;
plot p5 = if start then base - onePercent * 5 * spacing else double.nan;
plot p6 = if start then base - onePercent * 6 * spacing else double.nan;
plot p7 = if start then base - onePercent * 7 * spacing else double.nan;
plot p8 = if start then base - onePercent * 8 * spacing else double.nan;
plot p9 = if start then base - onePercent * 9 * spacing else double.nan;
plot p10 = if start then base - onePercent * 10 * spacing else double.nan;

hp.HideBubble();
p1.HideBubble();
p2.HideBubble();
p3.HideBubble();
p4.HideBubble();
p5.HideBubble();
p6.HideBubble();
p7.HideBubble();
p8.HideBubble();
p9.HideBubble();
p10.HideBubble();

AddChartBubble(yes, if IsNaN(close[-1]) then p1 else double.nan, concat("-", concat(1.0 * spacing, "%")), color.white);
AddChartBubble(yes,  if IsNaN(close[-1]) then p2 else double.nan, concat("-", concat(2.0 * spacing, "%")), color.white);
AddChartBubble(yes, if IsNaN(close[-1]) then  p3 else double.nan, concat("-", concat(3 * spacing, "%")), color.white);
AddChartBubble(yes, if IsNaN(close[-1]) then  p4 else double.nan, concat("-", concat(4 * spacing, "%")), color.white);
AddChartBubble(yes, if IsNaN(close[-1]) then  p5 else double.nan, concat("-", concat(5 * spacing, "%")), color.white);
AddChartBubble(yes, if IsNaN(close[-1]) then  p6 else double.nan, concat("-", concat(6 * spacing, "%")), color.white);
AddChartBubble(yes, if IsNaN(close[-1]) then  p7 else double.nan, concat("-", concat(7 * spacing, "%")), color.white);
AddChartBubble(yes,  if IsNaN(close[-1]) then p8 else double.nan, concat("-", concat(8 * spacing, "%")), color.white);
AddChartBubble(yes, if IsNaN(close[-1]) then  p9 else double.nan, concat("-", concat(9 * spacing, "%")), color.white);
AddChartBubble(yes,  if IsNaN(close[-1]) then p10 else double.nan, concat("-", concat(10 * spacing, "%")), color.white);

hp.HideTitle();
p1.HideTitle();
p2.HideTitle();
p3.HideTitle();
p4.HideTitle();
p5.HideTitle();
p6.HideTitle();
p7.HideTitle();
p8.HideTitle();
p9.HideTitle();
p10.HideTitle();