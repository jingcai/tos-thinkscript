# DOUBLE-ELLIOT-OSCILLATOR
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 19 FEB 2009

declare lower;

input OSC1_shortLength = 5;
input OSC1_longLength = 50;

input OSC2_shortLength = 5;
input OSC2_longLength = 12;

def price1 = (high + low) / 2;
def price2 = (high + low) / 2;

plot Osc2 = Average(price2, OSC2_shortLength) - Average(price2, OSC2_longLength);
plot Osc1 = Average(price1, OSC1_shortLength) - Average(price1, OSC1_longLength);

Osc1.setPaintingStrategy(PaintingStrategy.HISTOGRAM);
Osc1.AssignValueColor(if Osc1 > 0 then Color.DARK_GREEN else Color.DARK_RED);
Osc1.setLineWeight(2);

Osc2.setLineWeight(4);
Osc2.setPaintingStrategy(PaintingStrategy.HISTOGRAM);
Osc2.AssignValueColor(if Osc2 > 0 then Color.GREEN else Color.RED);

plot Osc1Line = Osc1;
Osc1Line.AssignValueColor(if Osc1 > 0 then Color.DARK_GREEN else Color.DARK_RED);

plot Osc2Line = Osc2;
Osc2Line.AssignValueColor(if Osc2 > 0 then Color.GREEN else Color.RED);
Osc2Line.setLineWeight(2);

plot ZeroLine = 0;
ZeroLine.setDefaultColor(getColor(8));