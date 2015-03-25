# Plots the Swing-Low
# Stephen Romano, 2010
#

declare upper;

input strength = 2;

def condition1 = fold i = 0 to strength with c1 = yes do c1 and getValue(Low, i) >= getValue(Low, i+1);
def condition2 = fold j = strength to strength*2 with c2 = yes do c2 and getValue(Low, j) <= getValue(Low, j+1);

rec val = if(condition1 and condition2) then low[2] else val[1];

plot SwingLow = val;
SwingLow.SetPaintingStrategy(PaintingStrategy.POINTS);
SwingLow.SetDefaultColor(color.RED);

