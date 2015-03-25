# Plots the Swing-High
# Stephen Romano, 2010
#

declare upper;

input strength = 2;

def condition1 = fold i = 0 to strength with c1 = yes do c1 and getValue(High, i) <= getValue(High, i+1);
def condition2 = fold j = strength to strength*2 with c2 = yes do c2 and getValue(High, j) >= getValue(High, j+1);

rec val = if(condition1 and condition2) then high[2] else val[1];

plot SwingHigh = val;
SwingHigh.SetPaintingStrategy(PaintingStrategy.POINTS);
SwingHigh.SetDefaultColor(color.GREEN);

