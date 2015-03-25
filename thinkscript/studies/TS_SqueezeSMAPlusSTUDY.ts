# TS_SqueezeSMAPlus
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 13 SEP 2009

input period = 14;
input BollingerDeviations = 2.0;
input BollingerLength = 20.0;
input KeltnerFactor = 1.5;
input KeltnerLength = 20;
input price = close;


def BolKelDelta = reference BollingerBandsSMA("num_dev_up" = BollingerDeviations, "length" = BollingerLength )."upperband" - reference KeltnerChannels("factor" = KeltnerFactor, "length" = KeltnerLength)."Upper_Band"; 

plot squeeze = average(price,period);
def slope = squeeze-squeeze[1];
squeeze.defineColor("Squeeze", color.yellow);
squeeze.defineColor("NoSqueezeUp",color.gray);
squeeze.defineColor("NoSqueezeDown",color.green);
squeeze.AssignValueColor(if bolKelDelta < 0 then squeeze.Color("Squeeze") else if slope >=0 then  squeeze.Color("NoSqueezeUp") else squeeze.Color("NoSqueezeDown"));
squeeze.setLineWeight(2);