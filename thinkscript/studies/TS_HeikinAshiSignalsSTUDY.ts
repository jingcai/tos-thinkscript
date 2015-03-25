# HEIKINASHISIGNALS
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 28 FEB 2009

def haclose = (open + high + low + close) / 4;
rec haopen = CompoundValue(1, (haopen[1] + haclose[1]) / 2, (open[1] + close[1]) / 2);
def diff = haclose - haopen;

plot HASignal = if diff>0 and diff[1]<=0 then low*0.999 else if diff<0 and diff[1]>=0 then high*1.001 else double.nan;
HASignal.setStyle(curve.POINTS);
HASignal.setPaintingStrategy(paintingStrategy.LINE_VS_TRIANGLES);
HASignal.setLineWeight(1);
HASignal.assignValueColor(if diff>0 then color.green else color.red);
